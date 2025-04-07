import React, { useState } from "react";
import { textOptionsFiltes, discard, certeza, EquipMent, Industries, Corporative, Money, Etiquetas, Phase, Group, Origines, Entities, Gender } from "../../BD/databd";
import { FilterList } from "@material-ui/icons";
import { FormControl, Grid, Chip, Fade, TextField } from "@material-ui/core";
export default function AlertComplete() {
  const [openFilter, setOpenFilter] = useState(false);
  //Select 1
  const [selected, setSelected] = useState("");
  //select 2
  const [selectedTwo, setSelectedTwo] = useState("");
  const [selectDiscard, setSelectDiscard] = useState(undefined);
  const [selectCerteza, setSelectCerteza] = useState(undefined);
  const [selectDateClose, setSelectDateClose] = useState(undefined);
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [selectEquiptmentLine, setSelectEquiptmentLine] = useState(undefined);
  const [selectMoney, setSelectMoney] = useState(undefined);
  const [selectEtiquetas, setSelectEtiquetas] = useState(undefined);
  const [selectPhase, setSelectPhase] = useState(undefined);
  const [selectGroup, setSelectGroup] = useState(undefined);
  const [selectOrigin, setSelectOrigin] = useState(undefined);
  const [selectEntities, setSelectEntities] = useState(undefined);
  const [selectGender, setSelectGender] = useState(undefined);
  const [selectEquiptment, setSelectEquiptment] = useState(undefined);
  const [selectTexto, setSelectedTexto] = useState(undefined);
  const [selectTextoJob, setSelectedTextoJob] = useState(undefined);
  const [selectDateCreated, setSelectDateCreated] = useState(undefined);
  const [selectDateLatest, setSelectDateLatest] = useState(undefined);

  const RenderFilter = () => (
    <Grid item xs={12} md={12} className="ContainerChips">
      {selectDiscard && <Chip className="chips" color="primary" size="small" label={`${"Descartado por"}: ${selectDiscard.name}`} onDelete={() => setSelectDiscard(undefined)} />}
      {selectCerteza && <Chip className="chips" color="primary" size="small" label={`${"Certeza"} : ${selectCerteza.name}`} onDelete={() => setSelectCerteza(undefined)} />}
      {selectDateClose !== undefined && selectDateClose !== "Especificar Periodo" && (
        <Chip className="chips" color="primary" size="small" label={`${"Fecha de Cierre"} : ${selectDateClose}`} onDelete={() => setSelectDateClose(undefined)} />
      )}
      {selectDateClose == "Especificar Periodo" && finish !== "" && (
        <Chip
          className="chips"
          color="primary"
          size="small"
          label={`${"Fecha de Cierre"} : ${start}-${finish}`}
          onDelete={() => {
            setSelectDateClose(undefined);
            setFinish("");
            setStart("");
          }}
        />
      )}
      {selectEquiptmentLine && (
        <Chip className="chips" color="primary" size="small" label={`${"Linea"} : ${selectEquiptmentLine.name}`} onDelete={() => setSelectEquiptmentLine(undefined)} />
      )}
      {selectMoney && <Chip className="chips" color="primary" size="small" label={`${"Moneda"} : ${selectMoney.name}`} onDelete={() => setSelectMoney(undefined)} />}

      {selectEtiquetas && <Chip className="chips" color="primary" size="small" label={`${" Etiquetas"} : ${selectEtiquetas.name}`} onDelete={() => setSelectEtiquetas(undefined)} />}

      {selectPhase && <Chip className="chips" color="primary" size="small" label={`${"Fase"} : ${selectPhase.name}`} onDelete={() => setSelectPhase(undefined)} />}

      {selectDateCreated !== undefined && selectDateCreated !== "Especificar Periodo" && (
        <Chip className="chips" color="primary" size="small" label={`${"Fecha de Creación"} : ${selectDateCreated}`} onDelete={() => setSelectDateCreated(undefined)} />
      )}
      {selectDateCreated == "Especificar Periodo" && finish !== "" && (
        <Chip
          className="chips"
          color="primary"
          size="small"
          label={`${"Fecha de Creacion"} : ${start}-${finish}`}
          onDelete={() => {
            setSelectDateCreated(undefined);
            setFinish("");
            setStart("");
          }}
        />
      )}
      {selectGroup && <Chip className="chips" color="primary" size="small" label={`${"Grupo"} : ${selectGroup.name}`} onDelete={() => setSelectGroup(undefined)} />}
      {selectOrigin && <Chip className="chips" color="primary" size="small" label={`${"Origen"} : ${selectOrigin.name}`} onDelete={() => setSelectOrigin(undefined)} />}
      {selectEntities && <Chip className="chips" color="primary" size="small" label={`${"Pais"} : ${selectEntities.name}`} onDelete={() => setSelectEntities(undefined)} />}
      {selectTextoJob && <Chip className="chips" color="primary" size="small" label={`${"Puesto"} : ${selectTextoJob}`} onDelete={() => setSelectedTextoJob(undefined)} />}
      {selectGender && <Chip className="chips" color="primary" size="small" label={`${"Genero"} : ${selectGender.name}`} onDelete={() => setSelectGender(undefined)} />}

      {selectDateLatest !== undefined && selectDateLatest !== "Especificar Periodo" && (
        <Chip className="chips" color="primary" size="small" label={`${"Ultimo Seguimiento"} : ${selectDateLatest}`} onDelete={() => setSelectDateLatest(undefined)} />
      )}
      {selectDateLatest == "Especificar Periodo" && finish !== "" && (
        <Chip
          className="chips"
          color="primary"
          size="small"
          label={`${"Ultimo Seguimiento"} : ${start}-${finish}`}
          onDelete={() => {
            setSelectDateLatest(undefined);
            setFinish("");
            setStart("");
          }}
        />
      )}
      {selectTexto && <Chip className="chips" color="primary" size="small" label={`${"Texto"} : ${selectTexto}`} onDelete={() => setSelectedTexto(undefined)} />}
      {selectEquiptment && <Chip className="chips" color="primary" size="small" label={`${"Puesto"} : ${selectEquiptment.name}`} onDelete={() => setSelectEquiptment(undefined)} />}
    </Grid>
  );

  return (
    <div className="contentFilters">
      <div className="titlesandFilters">
        {!openFilter ? (
          <div className={"filterNone "} onClick={() => setOpenFilter(!openFilter)}>
            <div className="filterNone__filters">
              <FilterList></FilterList>
              <p className="filterNone__titleFilter">Filtros</p>
            </div>
          </div>
        ) : (
          <div className="filter">
            <div className="filter__filters" onClick={() => setOpenFilter(!openFilter)}>
              <FilterList></FilterList>
              <p className="filter__titleFilter">Filtros</p>
            </div>

            <div className="divFilter">
              <Fade in={openFilter}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <select
                    className="input"
                    onChange={(event) => {
                      setSelected(event.target.value);
                    }}
                  >
                    <option hidden value="">
                      Selecciona Filtro
                    </option>
                    <optgroup label="Oportunidad">
                      {textOptionsFiltes.map((item, indes) => {
                        if (item.type == "oportunidad") {
                          return <option key={item._id}>{item.nombre}</option>;
                        }
                      })}
                    </optgroup>
                    <optgroup label="Contacto">
                      {textOptionsFiltes.map((item, indes) => {
                        if (item.type == "Contacto") {
                          return <option key={item._id}>{item.nombre}</option>;
                        }
                      })}
                    </optgroup>
                    <optgroup label="Empresa">
                      {textOptionsFiltes.map((item, indes) => {
                        if (item.type == "Empresa") {
                          return <option key={item._id}>{item.nombre}</option>;
                        }
                      })}
                    </optgroup>
                    <optgroup label="Otros">
                      {textOptionsFiltes.map((item, index) => {
                        if (item.type == "Otros") {
                          return <option key={item._id}>{item.nombre}</option>;
                        }
                      })}
                    </optgroup>
                  </select>

                  {selected === "Descartado por" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = discard.filter((item, index) => item._id === e.target.value);
                        setSelectDiscard({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="">
                        Selecciona una opcion
                      </option>
                      {discard.map((item, index) => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Certeza" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = certeza.filter((item, index) => item._id === e.target.value);
                        setSelectCerteza({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {certeza.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}

                  {selected === "Linea" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = EquipMent.filter((item, index) => item._id === e.target.value);
                        setSelectEquiptmentLine({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {EquipMent.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Moneda" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Money.filter((item, index) => item._id === e.target.value);
                        setSelectMoney({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {Money.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}

                  {selected === "Etiquetas" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Etiquetas.filter((item, index) => item._id === e.target.value);
                        setSelectEtiquetas({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {Etiquetas.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Fase" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Phase.filter((item, index) => item._id === e.target.value);
                        setSelectPhase({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {Phase.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Grupo" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Group.filter((item, index) => item._id === e.target.value);
                        setSelectGroup({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {Group.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Origen" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Origines.filter((item, index) => item._id === e.target.value);
                        setSelectOrigin({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {Origines.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Pais" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Entities.filter((item, index) => item._id === e.target.value);
                        setSelectEntities({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opción
                      </option>
                      {Entities.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Genero" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = Gender.filter((item, index) => item._id === e.target.value);
                        setSelectGender({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opción
                      </option>
                      {Gender.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Industria" && (
                    <select
                      className="input"
                      value={selectedTwo}
                      onChange={(event) => {
                        setSelectedTwo(event.target.value);
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opción
                      </option>
                      {Industries.map((item, index) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Corporativo" && (
                    <select
                      className="input"
                      value={selectedTwo}
                      onChange={(event) => {
                        setSelectedTwo(event.target.value);
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {Corporative.map((item, index) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  {selected === "Equipo de Interes" && (
                    <select
                      className="input"
                      onChange={(e) => {
                        let value = EquipMent.filter((item, index) => item._id === e.target.value);
                        setSelectEquiptment({
                          _id: value[0]._id,
                          name: value[0].name,
                        });
                      }}
                    >
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      {EquipMent.map((item, index) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  )}

                  {selected === "Texto" && <input placeholder="Ingresa Texto " className="input" onChange={(e) => setSelectedTexto(e.target.value)} />}
                  {selected === "Puesto" && <input placeholder="Ingresa Texto " className="input" onChange={(e) => setSelectedTextoJob(e.target.value)} />}

                  {selected === "Fecha de Cierre" && selectedTwo !== "Especificar Periodo" && (
                    <select className="input" onChange={(e) => setSelectDateClose(e.target.value)}>
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      <option value={"Especificar Periodo"}>Especificar Periodo</option>
                      <option value={"Hoy"}>Hoy</option>
                      <option value={"Ayer"}>Ayer</option>
                      <option value={"Mes Actual"}>Mes Actual</option>
                    </select>
                  )}

                  {selected === "Fecha de Creacion" && (
                    <select className="input" onChange={(e) => setSelectDateCreated(e.target.value)}>
                      <option hidden value="def">
                        Selecciona una opcion
                      </option>
                      <option value={"Especificar Periodo"}>Especificar Periodo</option>
                      <option value={"Hoy"}>Hoy</option>
                      <option value={"Ayer"}>Ayer</option>
                      <option value={"Mes Actual"}>Mes Actual</option>
                    </select>
                  )}
                  {selected === "Ultimo Seguimiento" && (
                    <select className="input" onChange={(e) => setSelectDateLatest(e.target.value)}>
                      <option value={"Especificar Periodo"}>Especificar Periodo</option>
                      <option value={"Hoy"}>Hoy</option>
                      <option value={"Ayer"}>Ayer</option>
                      <option value={"Mes Actual"}>Mes Actual</option>
                    </select>
                  )}
                  {selectDateCreated === "Especificar Periodo" || selectDateClose === "Especificar Periodo" || selectDateLatest === "Especificar Periodo" ? (
                    <div className="dates">
                      <TextField
                        id="date"
                        className="inputDate"
                        type="date"
                        defaultValue="2017-05-24"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        id="date"
                        className="inputDate"
                        type="date"
                        value={finish}
                        onChange={(e) => setFinish(e.target.value)}
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </FormControl>
              </Fade>
            </div>
          </div>
        )}
      </div>
      <RenderFilter />
    </div>
  );
}
