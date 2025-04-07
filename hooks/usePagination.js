import { useEffect, useState } from "react";

export default function usePagination({ defaultLimit = 10, defaultPage = 1, count }) {
  const [limit, setLimit] = useState(defaultLimit);
  const [page, setPage] = useState(defaultPage);
  const [paginationCount, setPaginationCount] = useState(Math.ceil(count / limit));

  useEffect(() => {
    setPaginationCount(Math.ceil(count / limit));
  }, [count, limit]);

  const handleLimit = value => {
    setLimit(value);
  };

  const handlePage = value => {
    setPage(value);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  return {
    limit,
    page,
    paginationCount, //count of pagination material ui
    setPage,
    handleLimit,
    handlePage,
    handlePagination, //works with material ui pagination
  };
}
