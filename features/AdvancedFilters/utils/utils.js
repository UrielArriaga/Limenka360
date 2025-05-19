export const customFilterSelect = (option, searchText) => {
  if (!searchText) return true;

  const name = option?.data?.name?.toLowerCase() || '';
  const code = option?.data?.code?.toLowerCase() || '';
  const category = option?.data?.category?.name?.toLowerCase() || '';
  const query = searchText.toLowerCase();

  return (
    name.includes(query) || code.includes(query) || category.includes(query)
  );
};

export const buildWhereFromFilters = (filtersArray) => {
  const logicOperatorMap = {
    igual: 'eq',
    mayor_que: 'gte',
    menor_que: 'lte',
    entre: 'between',
    contiene: 'like',
  };

  const where = {};
  const orClauses = [];

  filtersArray.forEach((filter) => {
    const key = filter.typeFilter;
    const op = logicOperatorMap[filter.logicOperator] || 'eq';

    // // 1. SUBFILTERS → se agrupan con OR
    // if (Array.isArray(filter.subfilters) && filter.subfilters.length > 0) {
    //   const orGroup = filter.subfilters
    //     .map((sub) => {
    //       const subOp = logicOperatorMap[sub.logicOperator] || 'eq';
    //       const val = sub.valueSelected;
    //       if (val !== '' && val !== null && val !== undefined) {
    //         return { [sub.typeFilter]: { [subOp]: val } };
    //       }
    //       return null;
    //     })
    //     .filter(Boolean);

    //   if (orGroup.length > 0) {
    //     orClauses.push(...orGroup);
    //   }

    //   return;
    // }

    // // // 2. MIXFILTERS → se agrupan con AND
    // if (Array.isArray(filter.mixFilters) && filter.mixFilters.length > 0) {
    //   filter.mixFilters.forEach((mix) => {
    //     const mixKey = mix.typeFilter;
    //     const mixOp = logicOperatorMap[mix.logicOperator] || 'eq';
    //     const mixVal = mix.valueSelected;

    //     if (mixVal !== '' && mixVal !== null && mixVal !== undefined) {
    //       if (!where[mixKey]) where[mixKey] = {};
    //       where[mixKey][mixOp] = mixVal;
    //     }
    //   });

    //   return;
    // }

    // // 3. NORMAL FILTER → valor simple
    const val = filter.valueSelected;
    if (val !== '' && val !== null && val !== undefined) {
      if (!where[key]) where[key] = {};
      where[key][op] = val;
    }
  });

  // // Agregar cláusula OR si existe
  if (orClauses.length > 0) {
    where.or = orClauses;
  }

  return where;
};
