import React, { useState } from "react";

function useOptionsArticles(handleOnChangeStatusIsApart,handleOnDeleteArticle,handleOnChangeStatusIsNotApart) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleArticle = (e, productOportunity, article) => {
    handleOnChangeStatusIsApart(productOportunity, article);
    handleMenuClose();
  };
  const handleDeleteArticle = (e, productOportunity, article) => {
    handleOnDeleteArticle(productOportunity, article)
    handleMenuClose();
  };
  const handleIsNotApart = (e, productOportunity, article) => {
    handleOnChangeStatusIsNotApart(productOportunity, article);
    handleMenuClose();
  }

  return {
    anchorEl,
    handleMenuClose,
    handleMenuOpen,
    handleArticle,
    handleDeleteArticle,
    handleIsNotApart
  };
}

export default useOptionsArticles;
