export const normalizeHeads = (heads, id) => {
  return heads.map((headName, index) => ({
    headText: headName,
    showColumn: headName === "id" ? false : true,
    position: index,
    headTextData: headName,
  }));
};
