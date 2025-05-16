import styled, { css } from 'styled-components';

const sizeStyles = {
  small: css`
    padding: 4px 8px;
    font-size: 12px;

    & svg {
      width: 16px;
    }
  `,
  medium: css`
    padding: 6px 10px;
    font-size: 14px;

    & svg {
      width: 18px;
    }
  `,
  large: css`
    padding: 8px 12px;
    font-size: 18px;

    & svg {
      width: 20px;
    }
  `,
};

const typeStyles = {
  addFilter: css`
    background-color: transparent;
    border: none;
    color: #1864ab;
    letter-spacing: 1px;
  `,
  primary: css`
    background-color: #1864ab;
    border: none;
    color: white;
  `,
  outline: css`
    background-color: transparent;
    border: 1px solid #1864ab;
    color: #1864ab;
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;

  ${(props) => sizeStyles[props.size || 'medium']};
  ${(props) => typeStyles[props.variant || 'primary']};
`;

function AppButton({
  children,
  icon,
  onClick,
  size = 'medium',
  variant = 'primary',
  ...rest
}) {
  return (
    <StyledButton onClick={onClick} size={size} variant={variant} {...rest}>
      {icon}
      {children && <span>{children}</span>}
    </StyledButton>
  );
}

export default AppButton;
