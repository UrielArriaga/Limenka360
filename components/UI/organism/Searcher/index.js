import { Avatar, Badge, TextField } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import {
  Business,
  Clear,
  CloudOff,
  ContactMail,
  Email,
  Group,
  NotInterested,
  Person,
  Phone,
  SearchOutlined,
  StarBorderOutlined,
} from "@material-ui/icons";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { URL_SPACE, api } from "../../../../services/api";
import { SearcherStyled } from "./styles";
import { useRouter } from "next/router";

export default function Searcher() {
  const router = useRouter();

  const [open, setOpen] = useState("");
  const [keyword, setKeyword] = useState("");
  // Se podría optimizar las peticiones, guardando 3 arreglos por cada seccion, y si no cambia key no hacer llamada a api
  const [results, setResults] = useState([]);
  const [dummy] = useState([1, 2, 3]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (open === "") return;

    const delayDebounceFn = setTimeout(() => {
      if (open === "groups") {
        handleRequestGroups();
      } else if (open === "executives") {
        handleRequestExecutives();
      } else if (open === "prospects") {
        handleRequestProspects();
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, open]);

  const handleClick = type => {
    setOpen(open === type ? "" : type);
    setIsLoading(true);
  };

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);
    if (keyword === "") {
      setOpen("");
      setResults([]);
    }
  };

  const handleRequestExecutives = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      let where = {
        or: [
          { email: { regexp: `${keyword.toLocaleLowerCase()}` } },
          { name: { regexp: `${keyword.toLocaleLowerCase()}` } },
        ],
      };

      let params = { where: where, keys: "id,email,fullname,photo", all: 1 };
      const responseEjecutives = await api.get("ejecutives", { params });
      setResults(responseEjecutives.data?.results);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const handleRequestProspects = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      let where = {
        or: [
          { email: { regexp: `${keyword.toLocaleLowerCase()}` } },
          { name: { regexp: `${keyword.toLocaleLowerCase()}` } },
        ],
      };

      let params = { where: where, keys: "id,email,fullname,phone,isclient,isoportunity", all: 1 }; //Optimized way

      const responseProspects = await api.get("prospects", { params });
      setResults(responseProspects.data?.results);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const handleRequestGroups = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      let where = {
        name: { regexp: `${keyword.toLocaleLowerCase()}` },
      };

      let params = { where: where, keys: "id,name,logo", all: 1 };
      const responseGroups = await api.get("groups", { params });
      setResults(responseGroups.data?.results);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const cleanSearch = () => {
    setKeyword("");
    setResults([]);
  };

  function getAvatarBadged(item) {
    let anchorOrigin = {
      vertical: "bottom",
      horizontal: "left",
    };
    let src = item?.photo ? URL_SPACE + item.photo : "";
    if (item.isclient) {
      return (
        <Badge
          overlap="circular"
          color="primary"
          anchorOrigin={anchorOrigin}
          badgeContent={<span style={{ fontSize: "10px" }}>Cliente</span>}
        >
          <Avatar src={src} />
        </Badge>
      );
    } else if (item.isoportunity) {
      return (
        <Badge
          overlap="circular"
          color="error"
          anchorOrigin={anchorOrigin}
          badgeContent={<span style={{ fontSize: "10px" }}>Oportunidad</span>}
        >
          <Avatar src={src} />
        </Badge>
      );
    } else {
      return (
        <Badge
          overlap="circular"
          color="secondary"
          anchorOrigin={anchorOrigin}
          badgeContent={<span style={{ fontSize: "10px" }}>Prospecto</span>}
        >
          <Avatar src={src} />
        </Badge>
      );
    }
  }

  function getImage(item) {
    switch (open) {
      case "executives":
        return <Avatar src={item?.photo ? URL_SPACE + item.photo : ""} />;

      case "groups":
        return <Avatar src={item?.logo ? URL_SPACE + item.logo : ""} />;

      case "prospects":
        return getAvatarBadged(item);
    }
  }

  const handleClickSearch = id => {
    switch (open) {
      case "executives":
        router.push({
          pathname: `/ejecutivos/[ejecutivo]`,
          query: { ejecutivo: id },
        });
        break;
      case "groups":
        router.push({
          pathname: `/director/grupos/[grupo]`,
          query: { grupo: id },
        });
        break;
      case "prospects":
        router.push({
          pathname: `/director/prospectos/[prospecto]`,
          query: { prospecto: id },
        });
        break;
    }
  };

  const getBody = () => {
    if (isLoading) {
      return dummy.map(item => (
        <div className="body body-dummy" key={item}>
          <div className="image">
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          </div>
          <div className="info">
            <Skeleton animation="wave" variant="text" width={210} />
            <Skeleton animation="wave" variant="text" width={210} />
            {open === "prospects" && <Skeleton animation="wave" variant="text" width={210} />}
          </div>
        </div>
      ));
    }

    if (isError) {
      return (
        <div className="body">
          <div className="image">
            <Avatar src="">
              <CloudOff />
            </Avatar>
          </div>
          <div className="info">
            <p>Lo sentimos, hubo un error de red.</p>
            {/* <p>Recarga </p> */}
          </div>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="body ">
          <div className="image">
            <Avatar src="">
              <NotInterested />
            </Avatar>
          </div>
          <div className="info">
            <p>
              "<i>{keyword}</i>" no dio resultados.
            </p>
            <p>
              Intenta en otra <b>sección</b> u otras <b>palabras clave</b>
            </p>
          </div>
        </div>
      );
    }

    return results.map(item => (
      <div className="body body-data" key={item.id} onClick={() => handleClickSearch(item.id)}>
        <div className="image">{getImage(item)}</div>
        <div className="info">
          {open === "groups" ? (
            <div className="info-detail">
              <Business className="info-icon" />
              <p> {item.name ? item.name : item.fullname}</p>
            </div>
          ) : (
            <div className="info-detail">
              <Person className="info-icon" />
              <p> {item.name ? item.name : item.fullname}</p>
            </div>
          )}

          {open !== "groups" && (
            <div className="info-detail">
              <Email className="info-icon" />
              <p>{item.email ? item.email : ""}</p>
            </div>
          )}

          {open === "prospects" && (
            <div className="info-detail">
              <Phone className="info-icon" />
              <p>{item.phone ? item.phone : "N/A"}</p>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <SearcherStyled>
      <div id="input">
        <TextField
          placeholder="Buscar en todo el sistema"
          value={keyword}
          onChange={handleChangeKeyword}
          className="text"
        />
        {keyword !== "" ? <Clear onClick={cleanSearch} className="icon close" /> : <SearchOutlined className="icon" />}
      </div>

      {keyword !== "" && (
        <>
          <div onClick={() => handleClick("groups")} className="header">
            <div className="title">
              <Avatar className="title-image-groups">
                <Group className="icon" />
              </Avatar>
              <p className="title-text">
                Buscar en <b>Grupos</b>: "{keyword}"
              </p>
            </div>
            {open === "groups" ? <ExpandLess /> : <ExpandMore />}
          </div>
          <Collapse in={open === "groups"} timeout="auto" unmountOnExit className="collapse">
            {getBody()}
          </Collapse>

          <div onClick={() => handleClick("executives")} className="header">
            <div className="title">
              <Avatar className="title-image-executives">
                <Person className="icon" />
              </Avatar>
              <p className="title-text">
                Buscar en <b>Ejecutivos</b>: "{keyword}"
              </p>
            </div>
            {open === "executives" ? <ExpandLess /> : <ExpandMore />}
          </div>
          <Collapse in={open === "executives"} timeout="auto" unmountOnExit className="collapse">
            {getBody()}
          </Collapse>

          <div onClick={() => handleClick("prospects")} className="header">
            <div className="title">
              <Avatar className="title-image-prospects">
                <ContactMail className="icon" />
              </Avatar>
              <p className="title-text">
                Buscar en <b>Prospectos</b>: "{keyword}"
              </p>
            </div>
            {open === "prospects" ? <ExpandLess /> : <ExpandMore />}
          </div>
          <Collapse in={open === "prospects"} timeout="auto" unmountOnExit className="collapse">
            {getBody()}
          </Collapse>
        </>
      )}
    </SearcherStyled>
  );
}
