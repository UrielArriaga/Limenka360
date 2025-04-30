// import { Grid } from "@material-ui/core";
// import React, { useState } from "react";
// import FormOportunity from "./FormOportunity";
// import { NewOportunityStyled } from "./styles";
// import TableProducts from "./TableProducts";

// export default function NewOportunity({ open, toggleModal, prospectSelected }) {
//   const [showAction, setShowAction] = useState(null);

//   const handleOnCancel = () => {
//     setShowAction(null);
//   };

//   return (
//     <NewOportunityStyled
//       anchor={"right"}
//       open={open}
//       onClose={() => toggleModal()}
//     >
//       <div className="row">
//         <div className="modalcontainer">
//           <div className="headerPreview">
//             <div className="headerPreview__title">
//               Nueva oportunidad y Cotización
//             </div>

//             <div className="actionmodal"></div>
//           </div>

//           {/* <FormOportunity prospectSelected={prospectSelected} />

//           <TableProducts /> */}
//         </div>
//       </div>
//     </NewOportunityStyled>
//   );
// }


import { Grid, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import FormOportunity from "./FormOportunity";
import { NewOportunityStyled } from "./styles";
import TableProducts from "./TableProducts";
import CloseIcon from '@material-ui/icons/Close';

export default function NewOportunity({ open, toggleModal, prospectSelected }) {
  const [showAction, setShowAction] = useState(null);

  const handleOnCancel = () => {
    setShowAction(null);
  };

  return (
    <NewOportunityStyled
      anchor={"right"}
      open={open}
      onClose={() => toggleModal()}
    >
      <div className="row">
        <div className="modalcontainer">
          <div className="headerPreview">
            <div className="headerPreview__title">
              <span>Nueva Oportunidad y Cotización</span>
            </div>

            <IconButton
              className="closeButton"
              onClick={() => toggleModal()}
              style={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: '#757575'
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <FormOportunity prospectSelected={prospectSelected} />
          {/*
          <TableProducts /> 
          */}
        </div>
      </div>
    </NewOportunityStyled>
  );
}