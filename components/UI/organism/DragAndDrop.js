import React, { useState } from "react";

export default function DragAndDrop(props) {
  const [activeClass, setActiveClass] = useState(false);
  const suppress = (e) => {
    setActiveClass(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) props.handleFile(files[0]);
  };
  return (
    <div
      className={activeClass ? props.styleClass + "active" : props.styleClass}
      onDragLeave={() => setActiveClass(false)}
      onDrop={onDrop}
      onDragEnter={(e) => suppress(e)}
      onDragOver={(e) => suppress(e)}
    >
      {props.children}
    </div>
  );
}
