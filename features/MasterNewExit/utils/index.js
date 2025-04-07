import React from "react";

export const NormalizePostProductEntry = data => {
  let productToArticle = [];
  if (data.length > 0) {
    productToArticle = data?.map(item => {
      return {
        id: item.id,
        serialnumber: item.serial,
        warehouseId: item.warehouseId,
        comments: item.comments,
        productId: item.productId,
      };
    });
  }

  return productToArticle;
};
