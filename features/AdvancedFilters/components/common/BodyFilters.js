import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 20px !important;
  background-color: #fff;
  border-radius: 8px;
  height: 400px;
  overflow-y: scroll;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.02);

  &::after {
    content: '';
    flex-shrink: 0;
    height: 40px;
  }
`;

function BodyFilters({ children }) {
  return <FiltersContainer>{children}</FiltersContainer>;
}

export default BodyFilters;
