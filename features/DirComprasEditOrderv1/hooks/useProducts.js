import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { api } from "../../../services/api";
import { generateTemporalId } from "../../../utils";

export default function useProducts({ viewControl }) {
  const [products, setProducts] = useState([]);

  const [textSerialsNumbers, seTextSerialsNumbers] = useState("");

  const [serialNumbersbyProduct, setserialNumbersbyProduct] = useState([]);

  const [productSelected, setProductSelected] = useState(null);

  const { open: isOpenSerialNumbers, toggleModal: toggleModalNumers } = useModal();

  const [flagToChange, setFlagToChange] = useState(false);

  useEffect(() => {
    if (productSelected) {
      // console.log("cambio");
      // console.log(productSelected);
      // let currentSerialNumbers = productSelected?.serialnumbers.map(item => item.serialnumber).join(",");
      // seTextSerialsNumbers(currentSerialNumbers);
      let currentSerialNumber = productSelected?.serialnumbers.map(item => {
        return {
          serialnumber: item.serialnumber,
          isnew: false,
        };
      });
      setserialNumbersbyProduct(currentSerialNumber);
    }
  }, [productSelected]);

  useEffect(() => {}, [flagToChange]);

  useEffect(() => {
    if (!productSelected?.isnew) {
    }
  }, [productSelected]);

  const addSerialNumers = () => {
    let serialNumbers = textSerialsNumbers.split(",").map(item => {
      return {
        serialnumber: item.trim(),
        isnew: true,
        id: "NEW" + generateTemporalId(10),
      };
    });

    let newproducts = products.map(item => {
      if (item.id === productSelected?.id) {
        return {
          ...item,
          serialnumbers: serialNumbers,
          isedited: true,
        };
      }
      return item;
    });

    setProducts(newproducts);

    console.log(serialNumbers);

    setserialNumbersbyProduct([...serialNumbersbyProduct, ...serialNumbers]);

    seTextSerialsNumbers("");
    return;

    setProducts(newproducts);

    setFlagToChange(!flagToChange);

    console.log(serialNumbers);
  };

  const deleteSerialNumber = itemSerial => {
    console.log(itemSerial);

    let serialNumbers = [];

    if (!itemSerial.isnew) {
      serialNumbers = serialNumbersbyProduct.map(item => {
        if (item.id === itemSerial.id) {
          return {
            ...item,
            isdeleted: true,
          };
        }
        return item;
      });
    } else {
      serialNumbers = serialNumbersbyProduct.filter(item => item.id !== itemSerial.id);
    }

    let newProducts = products.map(item => {
      if (item.id === productSelected?.id) {
        return {
          ...item,
          serialnumbers: serialNumbers,
          isedited: serialNumbers.length > 0 ? serialNumbers.some(item => item.isnew || item.isdeleted) : false,
        };
      }
      return item;
    });

    setProducts(newProducts);
    setserialNumbersbyProduct(serialNumbers);
  };

  const closeModalNumbers = () => {
    toggleModalNumers();
    setProductSelected(null);
    seTextSerialsNumbers("");
    setserialNumbersbyProduct([]);
  };

  const handleOnClickAddProduct = product => {
    let normalizeProduct = {
      ...product,
      id: "NEW" + generateTemporalId(10),
      isnew: true,
      isedited: false,
      isdeleted: false,
      serialnumbers: [],
    };

    setProducts([...products, normalizeProduct]);
  };

  const handleOnChangeProperty = (item, property, value) => {
    let productToEdit = products.find(product => product.id === item.id);

    if (productToEdit.isnew) {
      setProducts(prev => {
        return prev.map(product => {
          if (product.id === item.id) {
            if (property === "hasiva") {
              return {
                ...product,
                [property]: value,
                isedited: true,
                unitprice: (value ? product.unitprice * 1.16 : product.unitprice / 1.16).toFixed(2),
              };
            }

            return {
              ...product,
              [property]: value,
            };
          }
          return product;
        });
      });
    } else {
      setProducts(prev => {
        return prev.map(product => {
          if (product.id === item.id) {
            if (property === "hasiva") {
              return {
                ...product,
                [property]: value,
                isedited: true,
                unitprice: (value ? product.unitprice * 1.16 : product.unitprice / 1.16).toFixed(2),
              };
            }

            return {
              ...product,
              [property]: value,
              isedited: true,
            };
          }
          return product;
        });
      });
    }
  };

  const handleOnClickDeleteProduct = item => {
    let productToDelete = products.find(product => product.id === item.id);

    if (productToDelete.isnew) {
      setProducts(prev => {
        return prev.filter(product => product.id !== item.id);
      });
      return;
    } else {
      setProducts(prev => {
        return prev.map(product => {
          if (product.id === item.id) {
            return {
              ...product,
              isdeleted: true,
            };
          }
          return product;
        });
      });
    }
  };

  const handleOnClickOpenAddSerials = product => {
    setProductSelected(product);
    toggleModalNumers();
  };

  useEffect(() => {
    if (productSelected) {
      fetchSuppliesWhp(productSelected.id);
    }
  }, [productSelected]);

  async function fetchSuppliesWhp(id) {
    try {
      let params = {
        all:1,
        where: {
          suppliesId: id,
        },
      };

      let response = await api.get("supplieswarehouseproducts", {
        params,
      });

      let normalizeWh = response.data?.results.map(item => {
        return {
          id: item.id,
          serialnumber: item.serialnumber,
          isnew: false,
        };
      });

      setserialNumbersbyProduct([...serialNumbersbyProduct, ...normalizeWh]);

      // setserialNumbersbyProduct(response.data?.results);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    productControl: {
      serialNumbersbyProduct,
      products,
      isOpenSerialNumbers,
      handleOnClickAddProduct,
      handleOnChangeProperty,
      handleOnClickDeleteProduct,
      handleOnClickOpenAddSerials,
      setProducts,
      toggleModalNumers,
      seTextSerialsNumbers,
      textSerialsNumbers,
      productSelected,
      closeModalNumbers,
      addSerialNumers,
      deleteSerialNumber,
    },
  };
}
