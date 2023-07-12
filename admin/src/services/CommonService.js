const normalizeQueryParams = (params) => {
  const { filterParams, sortParams } = params;

  const normalizedFilterParams = filterParams?.reduce(
    (acc, { filterBy, values }) => {
      acc[filterBy] = values.join(",");

      return acc;
    },
    {}
  );

  const normalizedSortParams = sortParams?.reduce((acc, { id, desc }) => {
    acc.sort = desc ? `-${id}` : id;

    return acc;
  }, {});

  return {
    page: params.pageIndex,
    limit: params.pageSize,
    // orderBy: params.orderBy ?? 'id',
    // orderDirection: params.orderDirection ?? OrderDirectionEnum.DESC,
    ...normalizedFilterParams,
    ...normalizedSortParams,
    ...omit(params, ["pageIndex", "pageSize", "filterParams", "sort"]),
  };
};

export { normalizeQueryParams };
