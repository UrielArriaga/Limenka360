import styled from 'styled-components';
import FilterListIcon from '@material-ui/icons/FilterList';

const AdvancedFiltersButton = styled.button`
  position: relative;
  border-radius: 50%;
  padding: 8px;
  border: none;
  background-color: #f3f0ff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 200ms ease-in;

  &:hover {
    background-color: #e5dbff;
  }

  & svg {
    color: #862e9c;
  }
`;

const NumFiltersApply = styled.span`
  color: #862e9c;
  font-size: 12px;
  font-weight: 700;
  border: none;

  position: absolute;
  top: 0;
  right: 2px;
`;

function ButtonFilter({ onClick, numFilters }) {
  return (
    <AdvancedFiltersButton onClick={onClick}>
      {numFilters !== 0 && <NumFiltersApply>{numFilters}</NumFiltersApply>}
      <FilterListIcon />
    </AdvancedFiltersButton>
  );
}

export default ButtonFilter;
