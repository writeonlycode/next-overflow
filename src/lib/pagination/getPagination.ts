export const getPagination = (page: number, size: number) => {
  const limit = size ? size : 3;
  const from = page > 0 ? (page - 1) * limit : 0;
  const to = page > 0 ? from + (size - 1) : (size - 1);

  return { from, to };
};
