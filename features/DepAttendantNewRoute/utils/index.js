
export const processResponseResult = response => response.data.results[0];

export const processResponseArray = response => response.data.results;

export const normalizeDataDrivers = data => {
  return data.map(item => ({
    value: item.id,
    label: item.name,
  }));
};

export const normalizeDataTrasportunits = data => {
  return data.map(item => ({
    value: item.id,
    label: item.tuition,
  }));
};

export const orderParams = id => {
  return {
    where: {
      id: id,
    },
    include: "oportunity,createdbyid",
  };
};
