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
