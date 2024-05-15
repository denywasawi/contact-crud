export function getPagination (page: number) {
  const limit = 20;
  const offset = (limit * page) - limit;

  return { limit, offset };
}

export function getPage (totalData: number, page: number) {
  const totalPage = Math.ceil(totalData / 20);

  return { isFirstPage: page === 1, isLastPage: page === totalPage };
}