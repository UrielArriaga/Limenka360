import { Dialog } from "@material-ui/core";
import { ModalContainer } from "./styles";
import { Button, Grid } from "@material-ui/core";
import Select from "react-select";
export default function PreviewBioEdit({ open, handleToggle, optionSct, assignResponsible }) {
  const { fetchTraining, users, handleResponsibleChange, selectedResponsible } = optionSct;
  return (
    <Dialog
      open={open}
      onClose={handleToggle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <ModalContainer>
        <div className="headerDialog">
          <div className="title">Cambio de Biomédico</div>
        </div>
        <div className="formDialog">
          <form>
            <Grid spacing={1} container className="ctr_inputs">
              <Grid item xs={12} md={12} className="resons">
                <label className="ctr_inputs__label">Selecciona un biomedico*</label>
                <Select
                  onMenuOpen={() => getCatalogBy("users")}
                  loadingMessage={() => "caragando opciones..."}
                  isLoading={users?.isFetching}
                  isClearable={true}
                  value={selectedResponsible}
                  onChange={handleResponsibleChange}
                  options={users?.results}
                  placeholder="Biomedicos"
                  getOptionValue={option => `${option.id}`}
                  getOptionLabel={option => `${option.fullname}`}
                />
              </Grid>
              <div className="btn">
                <Button variant="contained" className="btn_cancel" onClick={() => handleToggle()}>
                  Cancelar
                </Button>
                <Button onClick={()=> addResponsible() } variant="contained" className="btn_save">
                  Guardar
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </ModalContainer>
    </Dialog>
  );
}
