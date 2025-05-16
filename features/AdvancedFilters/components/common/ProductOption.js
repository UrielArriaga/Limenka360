import styled from 'styled-components';

const ProductStyle = styled.div`
  .product {
    margin: 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: -10px;
      text-transform: capitalize;
    }
    .subtitle {
      color: grey;
      font-size: 11px;
    }
    .code {
      font-weight: 600;
      color: #1864ab;
    }
  }
`;

export const formatProduct = ({ name, code }) => (
  <ProductStyle>
    <div className="product">
      <p className="title">{name}</p>
      <p className="subtitle">
        código: <span className="code">{code}</span>
      </p>
    </div>
  </ProductStyle>
);
