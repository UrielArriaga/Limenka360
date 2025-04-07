import React from "react";

export default function ListSuggestions({ data, handleOnClickItem }) {
  return (
    <div className="items">
      {data.map((item, index) => (
        <input key={index} type="text" value={item.email} className="item" />
      ))}
    </div>
  );
}

{
  /* <div className="item" key={item.id} onClick={() => handleOnClickItem(item)}>
          {item.email}
        </div> */
}
