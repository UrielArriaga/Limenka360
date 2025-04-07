export const showThePhoto = (e, setPhoto) => {
  if (e.target.files[0] === undefined) return;
  let typeFile = e.target.files[0].name.split(".").pop();
  let acceptFile = ["jpg", "png", "jpeg", "JPG", "PNG"];
  let validate = acceptFile.filter(item => item === typeFile);
  if (validate.length === 0) return alert("error", "Error al actualizar");
  const url = URL.createObjectURL(e.target.files[0]);
  setPhoto({ url: url, file: e.target.files[0] });
};

export const stringToSlug = str => {
  str = str.replace(/(<([^>]+)>)/gi, " ");
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return str;
};
