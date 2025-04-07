
export const getColor = statusrepair => {
    switch (statusrepair) {
      case "En reparación":
        return {
          bgColor: "#ff0101",
          color: "#fff",
        };
  
      case "En buen estado":
        return {
          bgColor: "#017E03", 
          color: "#fff",
        };

      default:
        return {
          bgColor: "#FFF4E5",
          color: "orange",
        };
    }
  };
  export const getSemaforo = indicator => {
    switch (indicator) {
      case "Rojo":
        return {
          bgColor: "#ff0101", 
          color: "#fff",
        };
        case "Amarillo":
        return {
          bgColor: "yellow", 
          color: "#fff",
        };
        case "Verde":
        return {
          bgColor: "#33CC33", 
          color: "#fff",
        };
        case "Azul":
          return {
            bgColor: "#0033FF", 
            color: "#fff",
          };
      default:
        return {
      
        };
    }
  };

  export const getStatusIcon = reviewed => {
    switch (reviewed) {
      case "Revisado":
        return {
          bgColor: "#017E03",
          color: "#fff",
        };
  
      case "No revisado":
        return {
          bgColor: "#ff0101",
          color: "#fff",
        };
  
      default:
        return {
          bgColor: "#FFF4E5",
          color: "fff",
        };
    }
  };
  
  export const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };

  export const renderIcon = (extension) => {
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img className="iconpng" src="/imageicon.png" alt="image" />;
      case 'pdf':
        return <img className="iconpng" src="/pdficon.png" alt="pdf" />;
      default:
        return ;
    }
  };

  export const renderPreview = (type, fileUrl) => {
    switch (type) {
      case "pdf":
        return <iframe src={fileUrl} width="100%" height="780px"></iframe>;
      case "docx":
      case "xlsx":
        return <p>No hay vista previa</p>;
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
        return <img style={{ width: "100%", height: "100%" }} src={fileUrl} alt={fileUrl} />;
      default:
        return <p>No hay vista previa</p>;
    }
};
  