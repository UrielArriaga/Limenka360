import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ced4da;
  font-size: 22px;
  font-weight: 700;
  color: #212529;
`;

const Title = styled.h2`
  flex-grow: 1;
  font-size: 16px;
  font-weight: 700;
  color: #343a40;
  letter-spacing: 0.7px;

  text-transform: uppercase;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #212529;
`;

function HeaderFilters({ children, onClose }) {
  return (
    <HeaderContainer>
      <Title>{children}</Title>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
    </HeaderContainer>
  );
}

export default HeaderFilters;
