import { Badge, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

export const SearchBudget = ({ keySearch, setKeySearch, paginationData }) => {
  return (
    <div className="ctr_filter">
      <div className="ctr_filter__ctr_input">
        <TextField
          variant="outlined"
          type="search"
          value={keySearch}
          onChange={e => setKeySearch(e.target.value)}
          label={keySearch !== "" && "Buscar por folio"}
          placeholder="Ingresa el folio"
          size="small"
          className="inputText"
          onKeyDown={e => {
            if (e.key === "Enter" && e.target.value.length >= 2) {
              setKeySearch(e.target.value);
              // setFlag(!flag);
              // setShowChips(true);
              paginationData?.setPage(1);
            }
          }}
        />
        <SearchOutlined className="search" />
      </div>
    </div>
  );
};

export const HeaderBudget = () => {
  return (
    <div className="head">
      <div className="head__title">
        <Badge
          overlap="rectangular"
          color="primary"
          size="small"
          max={99}
          showZero={false}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <h1>Presupuestos</h1>
        </Badge>
      </div>

    </div>
  );
};
