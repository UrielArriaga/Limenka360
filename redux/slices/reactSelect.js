export const FormatOptionLabel = ({ name, email, lastname }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <p style={{ textTransform: "capitalize", fontSize: 15 }}>
        {name} {lastname}
      </p>
      {email && <p style={{ marginLeft: "5px", color: "grey", fontSize: 13 }}>{`(${email})`}</p>}
    </div>
  );
};

//no options executive
export const NoOptionsMessage = () => {
  return (
    <div style={{ padding: "15px", width: "100%", display: "flex", justifyContent: "center" }}>
      <p style={{ color: "grey", fontSize: 15 }}>No se Encontró Ejecutivo</p>
    </div>
  );
};

export const CustomFilter = (option, inputValue) => {
  if (
    option.data.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    option.data.lastname.toLowerCase().includes(inputValue.toLowerCase() || option.data.email === inputValue)
  ) {
    return true;
  } else {
    return false;
  }
};
