export const getMealType = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 17) return 'lunch';
  return 'dinner';
};