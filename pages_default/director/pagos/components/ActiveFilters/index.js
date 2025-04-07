import { Chip } from "@material-ui/core";

export default function ActiveFilters({ filters = [], onClickDelete }) {
    if (filters.length <= 0) return <div />;
  
    return (
      <div className="activefilterssection">
        {filters.map((item, index) => {
          return (
            <Chip
              key={index}
              color="primary"
              size="small"
              onDelete={() => onClickDelete(index, item)}
              label={`${item.label} : ${item.name}`}
              className="chip"
              style={{ marginRight: 10 }}
            />
          );
        })}
      </div>
    );
  }