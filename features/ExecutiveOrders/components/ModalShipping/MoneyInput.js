import React, { useState } from "react";

function InputMoney({ currency = "MXN", locale = "es-MX", onChange, value: propValue }) {
  const [value, setValue] = useState(propValue || "");

  const handleChange = e => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Eliminar todo excepto números
    const formattedValue = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(rawValue / 100); // Convertir a formato de moneda

    setValue(formattedValue);

    // Si se proporciona onChange, lo llamamos
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return <input type="text" value={value} onChange={handleChange} placeholder={`0.00 ${currency}`} />;
}

export default InputMoney;
