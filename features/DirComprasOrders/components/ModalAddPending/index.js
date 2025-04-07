import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  Container,
  Label,
  Input,
  SelectWrapper,
  ButtonContainer,
  StyledButton,
} from "./styles"; 


export default function ModalAddPending({ open, handleClose, type, postPending}) {
  const { control, reset, handleSubmit, formState: { errors} } = useForm({ mode: "onChange" });


  const onSubmit = async (data) => {
    postPending(data);
    handleClose();
    reset();

  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Crear nuevo evento"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <div>
                <Label>Nombre del evento:</Label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => <Input  {...field} type="text" />}
                />
                 {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div>
                <Label>Tipo:</Label>
                <Controller
                  name="typePendding"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Debes seleccionar una opción" }}
                  render={({ field }) => (
                    <SelectWrapper>
                      <Select
                        {...field}
                        options={type}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        onChange={(val) => field.onChange(val)}
                        classNamePrefix="react-select"
                        placeholder="Elige una opción"
                      />
                    </SelectWrapper>
                  )}
                />
              {errors.typePendding && <p>{errors.typePendding.message}</p>}

              </div>

              <div>
                <Label>Fecha de Inicio:</Label>
                <Controller
                  name="dateStart"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Selecciona una fecha" }}
                  render={({ field }) => <Input {...field} type="datetime-local" />}
                />
              {errors.dateStart && <p>{errors.dateStart.message}</p>}

              </div>

              <div>
                <Label>Fecha de Término:</Label>
                <Controller
                  name="dateEnd"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Selecciona una fecha"}}
                  render={({ field }) => <Input {...field} type="datetime-local" />}
                />
            {errors.dateEnd && <p>{errors.dateEnd.message}</p>}

              </div>

              <div>
                <Label>Comentario:</Label>
                <Controller
                  name="comment"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Agrega un comentario" }}
                  render={({ field }) => <Input {...field} type="text" />}
                />
                {errors.comment && <p>{errors.comment.message}</p>}

              </div>

              <ButtonContainer>
                <StyledButton type="button" onClick={handleClose}>
                  Cancelar
                </StyledButton>
                <StyledButton type="submit" primary> 
                  Agregar
                </StyledButton>

              </ButtonContainer>
            </Container>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
