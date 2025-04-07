import React, { useState } from "react";
import styled from "styled-components";

export default function ShowMoreProducts({ productsoportunities }) {
  return (
    <Theme>
      <p className="bold">Productos ({productsoportunities?.length}):</p>
      <div className="containerProducts">
        {productsoportunities &&
          productsoportunities.map(
            (pro, i) =>
              i < productsoportunities.length && (
                <p className="products" key={i}>
                  {i + 1 + ") "} {pro.product.name}
                </p>
              )
          )}
      </div>
    </Theme>
  );
}

const Theme = styled.div`
  width: 300px;
  .containerProducts {
    height: 45px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 4px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  p {
    letter-spacing: 0.03em;
    font-size: 11px;
  }
  .products {
    margin-bottom: 2px;
  }
  .bold {
    font-weight: bold;
  }

  .icon {
    background-color: #3f51b5;
    color: #fff;
    border-radius: 8px;
  }
`;
