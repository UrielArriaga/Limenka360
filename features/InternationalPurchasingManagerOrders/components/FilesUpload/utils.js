import { AttachFile } from "@material-ui/icons";

export const renderTypeFile = type => {
  switch (type) {
    case "application/pdf":
      return <img className="iconpng" src="/pdficon.png" alt="pdf" />;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <img className="iconpng" src="/docicon.png" alt="word" />;
    case "image/jpeg":
    case "image/png":
    case "image/webp":
      return <img className="iconpng" src="/imageicon.png" alt="image" />;
    default:
      return <AttachFile style={{ color: "#034D6F" }} />;
  }
};

export const replaceSpacesWithHyphens = str => {
  return str.replace(/\s+/g, "_");
};
