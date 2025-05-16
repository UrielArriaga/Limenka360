import styled from 'styled-components';
import { useFilter } from '../../context/contextFilter';
import RowFilter from '../RowFilter/RowFilter';
import ExtensionIcon from '@material-ui/icons/Extension';

const TableFiltersStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  /* padding: 40px 20px; */
`;

const Message = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: #dee2e6;
  width: 100%;
  margin: auto auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 150px;
    color: #e9ecef;
  }
`;

function TableFilters() {
  const { filters, handleDeleteFilter, optionsFilterType } = useFilter();

  return (
    <TableFiltersStyled>
      {filters.map((filter) => (
        <RowFilter
          key={filter.id}
          onDelete={() => handleDeleteFilter(filter.id)}
          filters={optionsFilterType}
          filter={filter}
        />
      ))}

      {filters?.length <= 0 && (
        <Message>
          <ExtensionIcon />
          <span>Crea un filtro</span>
        </Message>
      )}
    </TableFiltersStyled>
  );
}

export default TableFilters;
