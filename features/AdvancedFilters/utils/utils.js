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

import {
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

const DATE_FIELDS = ['createdAt', 'lastTrackingcreatedAt', 'updatedAt'];

export const buildWhereFromFilters = (filtersArray) => {
  const logicOperatorMap = {
    igual: 'eq',
    diferente: 'ne',
    mayor_que: 'gte',
    menor_que: 'lte',
    entre: 'between',
    contiene: 'like',
  };

  const where = {};
  const orClauses = [];

  const handleSingleFilter = (filter) => {
    const key = filter.valueOutput || filter.typeFilter;
    const op = logicOperatorMap[filter.logicOperator] || 'eq';
    const val = filter.valueSelected;
    const extra = filter.extraValueSelected;

    if (!val && val !== 0) return;

    if (DATE_FIELDS.includes(key)) {
      const now = new Date();
      let from, to;

      switch (val) {
        case 'Hoy':
          from = startOfToday();
          to = endOfToday();
          break;
        case 'Semana':
          from = startOfWeek(now, { weekStartsOn: 1 });
          to = endOfWeek(now, { weekStartsOn: 1 });
          break;
        case 'Mes':
          from = startOfMonth(now);
          to = endOfMonth(now);
          break;
        case 'range':
          if (extra?.from && extra?.to) {
            from = new Date(extra.from);
            to = new Date(extra.to);
          }
          break;
      }

      if (!from || !to) return;

      if (op === 'eq' || val === 'range') {
        return {
          [key]: {
            between: [from.toISOString(), to.toISOString()],
          },
        };
      } else if (op === 'gte') {
        return {
          [key]: { gte: from.toISOString() },
        };
      } else if (op === 'lte') {
        return {
          [key]: { lte: to.toISOString() },
        };
      }
    }

    if (op === 'eq' || op === 'like') {
      return { [key]: val };
    }

    return {
      [key]: { [op]: val },
    };
  };

  const applyVirtualFilter = (filter) => {
    const key = filter.valueOutputVirtual;
    const val = filter.virtualSelected;
    const op = logicOperatorMap[filter.logicOperatorVirtual] || 'eq';

    if (!key || val == null) return null;

    if (op === 'eq' || op === 'like') {
      return { [key]: val };
    }

    return { [key]: { [op]: val } };
  };

  filtersArray.forEach((filter) => {
    if (filter.mixFilters && filter.mixFilters.length > 1) {
      filter.mixFilters.forEach((subFilter) => {
        const clause = handleSingleFilter(subFilter);
        if (clause) {
          orClauses.push(clause);
        }

        const virtualClause = applyVirtualFilter(subFilter);
        if (virtualClause) {
          orClauses.push(virtualClause);
        }
      });
    } else if (filter.mixFilters && filter.mixFilters.length === 1) {
      const subFilter = filter.mixFilters[0];
      const clause = handleSingleFilter(subFilter);
      if (clause) Object.assign(where, clause);

      const virtualClause = applyVirtualFilter(subFilter);
      if (virtualClause) Object.assign(where, virtualClause);
    } else {
      const clause = handleSingleFilter(filter);
      if (clause) Object.assign(where, clause);

      const virtualClause = applyVirtualFilter(filter);
      if (virtualClause) Object.assign(where, virtualClause);
    }
  });

  if (orClauses.length > 0) {
    where.or = orClauses;
  }

  return where;
};
