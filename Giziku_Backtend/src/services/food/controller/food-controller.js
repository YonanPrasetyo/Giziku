import fs from 'fs/promises';
import XLSX from 'xlsx';
import FoodRepository from '../repositories/food-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createFood = async (req, res, next) => {
  const { name, category, portionSize, calories, protein, sugar, carbohydrates, fat } = req.validated;

  const food = await FoodRepository.createFood({ name, category, portionSize, calories, protein, sugar, carbohydrates, fat });

  if (!food) return next(new InvariantError('Food gagal ditambahkan'));

  return response(res, 201, 'Food berhasil ditambahkan', food);
};

export const importFoods = async (req, res, next) => {
  if (!req.file) return next(new InvariantError('File Excel tidak ditemukan'));

  const normalize = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const findValue = (row, keys) => {
    const foundKey = Object.keys(row).find((key) => keys.includes(normalize(key)));
    return foundKey ? row[foundKey] : undefined;
  };

  const mapRow = (row) => ({
    name: findValue(row, ['name']),
    category: findValue(row, ['category']),
    portionSize: findValue(row, ['portionsize', 'portion_size', 'portion size']),
    calories: findValue(row, ['calories']),
    protein: findValue(row, ['protein']),
    sugar: findValue(row, ['sugar']),
    carbohydrates: findValue(row, ['carbohydrates', 'carbohydrate']),
    fat: findValue(row, ['fat']),
  });

  try {
    const ext = req.file.originalname.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(ext)) {
      return next(new InvariantError('Ekstensi file harus .xlsx atau .xls'));
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return next(new InvariantError('Sheet Excel tidak ditemukan'));
    }

    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    if (!rawRows.length) {
      return next(new InvariantError('File Excel kosong'));
    }

    const rows = rawRows.map(mapRow);
    const invalidRows = [];
    const foodRows = [];

    rows.forEach((row, index) => {
      const numericRow = {
        ...row,
        calories: row.calories === null || row.calories === undefined ? null : Number(row.calories),
        protein: row.protein === null || row.protein === undefined ? null : Number(row.protein),
        sugar: row.sugar === null || row.sugar === undefined ? null : Number(row.sugar),
        carbohydrates: row.carbohydrates === null || row.carbohydrates === undefined ? null : Number(row.carbohydrates),
        fat: row.fat === null || row.fat === undefined ? null : Number(row.fat),
      };

      if (
        !numericRow.name ||
        !numericRow.category ||
        !numericRow.portionSize ||
        Number.isNaN(numericRow.calories) ||
        Number.isNaN(numericRow.protein) ||
        Number.isNaN(numericRow.sugar) ||
        Number.isNaN(numericRow.carbohydrates) ||
        Number.isNaN(numericRow.fat)
      ) {
        invalidRows.push(index + 2);
      } else {
        foodRows.push(numericRow);
      }
    });

    if (invalidRows.length) {
      return next(new InvariantError(`Format file Excel tidak valid pada baris: ${invalidRows.join(', ')}`));
    }

    const foods = await FoodRepository.createFoodsBulk(foodRows);

    return response(res, 201, 'Foods berhasil diimpor dari Excel', {
      imported: foods.length,
      foods,
    });
  } catch (error) {
    console.error('Excel import error:', error);
    return next(new InvariantError(`Gagal memproses file Excel: ${error.message}`));
  } finally {
    await fs.unlink(req.file.path).catch(() => {});
  }
};

export const getFoods = async (req, res) => {
  const foods = await FoodRepository.getAllFoods();
  return response(res, 200, 'Foods berhasil ditampilkan', foods);
};

export const getFoodsByName = async (req, res) => {
  const { name } = req.query;
  const foods = name === undefined
    ? await FoodRepository.getAllFoods()
    : name.trim() === ''
      ? []
      : await FoodRepository.getFoodByName(name);

  return response(res, 200, 'Foods berhasil ditampilkan', foods);
};

export const getFoodById = async (req, res, next) => {
  const { id } = req.params;
  const food = await FoodRepository.getFoodById(id);

  if (!food) return next(new NotFoundError('Food tidak ditemukan'));

  return response(res, 200, 'Food berhasil ditampilkan', food);
};

export const updateFoodById = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, portionSize, calories, protein, sugar, carbohydrates, fat } = req.validated;

  const food = await FoodRepository.updateFoodById(id, { name, category, portionSize, calories, protein, sugar, carbohydrates, fat });

  if (!food) return next(new NotFoundError('Food tidak ditemukan'));

  return response(res, 200, 'Food berhasil diperbarui', food);
};

export const deleteFoodById = async (req, res, next) => {
  const { id } = req.params;
  const food = await FoodRepository.deleteFoodById(id);

  if (!food) return next(new NotFoundError('Food tidak ditemukan'));

  return response(res, 200, 'Food berhasil dihapus', food);
};