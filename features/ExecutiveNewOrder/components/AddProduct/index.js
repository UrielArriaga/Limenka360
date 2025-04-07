import React, { useCallback, useEffect, useState } from "react";
import { AddProductStyle, AddStyle } from "./style";
import { headersTableAddProducts } from "../../utils/normalizeOrder";
import { ProductService } from "../../services/products";
import { Tooltip } from "@material-ui/core";

const useProductsFind = () => {
  const productsService = new ProductService();
  const [inputValue, setInputValue] = useState("");

  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    console.log("xxxx");
    try {
      let respProducts = await productsService.getProducts(inputValue);
      console.log(respProducts);
      setProducts(respProducts.data.results);
    } catch (error) {
      console.log(error);
      alert("Error al cargar los productos", error);
    }
  }, [inputValue]);

  useEffect(() => {
    console.log(inputValue);
    const wordCount = inputValue.trim().length;

    console.log(wordCount);
    if (wordCount >= 3) {
      fetchProducts();
    }
  }, [inputValue, fetchProducts]);

  return {
    setInputValue,
    inputValue,
    products,
  };
};

export default function AddProduct({ open, toggleDrawer, productsControl }) {
  const { inputValue, setInputValue, products } = useProductsFind();

  const { handleProductSelected } = productsControl;

  return (
    <AddProductStyle open={open} onClose={toggleDrawer} anchor="right">
      <div className="header">
        <p className="title_head">Productos</p>
      </div>

      <div className="content">
        <input
          type="text"
          className="search_box"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
          }}
          placeholder="Escribe aquí al menos 3 palabras"
        />

        <div className="table_content">
          <table className="table" cellSpacing={0}>
            <thead className="thead">
              <tr className="tr_head">
                {headersTableAddProducts.map((item, index) => (
                  <th className={`th ${item === "Producto" && "active"}`} key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tbody">
              {products.map((item, index) => (
                <Tooltip key={index} title="Agregar Producto" arrow>
                  <tr className="body_tr" onClick={() => handleProductSelected(item)}>
                    <td className="td">{item.code}</td>
                    <td className="td">{item.name}</td>
                    <td className="td">{item.brand?.name}</td>
                    <td className="td">{item.stock}</td>
                    <td className="td">{item.category?.name}</td>
                  </tr>
                </Tooltip>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <Add /> */}
    </AddProductStyle>
  );
}

// import React from "react";
// import { AddProductStyle, AddStyle, RequiredMessageStyle, selectStyle } from "./style";
// import { Button, Checkbox, Chip, Collapse, Grid, IconButton, Input, LinearProgress, Tooltip } from "@material-ui/core";
// import useTableProducts from "../../hooks/useTableProducts";
// import { FilterList, Search, Cached } from "@material-ui/icons";
// import Select from "react-select";
// import { headersTableAddProducts } from "../../utils/normalizeOrder";
// import useAddProducts from "../../hooks/useAddProducts";
// import { formatNumber, toUpperCaseChart } from "../../../../utils";
// import { Pagination } from "@material-ui/lab";
// import NumberFormat from "react-number-format";
// import { Controller } from "react-hook-form";
// import useSingleProduct from "../../hooks/useSingleProduct";
// import { commonSelector } from "../../../../redux/slices/commonSlice";
// import { useSelector } from "react-redux";
// import useGlobalCommons from "../../../../hooks/useGlobalCommons";
// export default function AddProduct(props) {
//   const heads = headersTableAddProducts;
//   const { categories, typeProducts, brands } = useSelector(commonSelector);
//   const { getCatalogBy } = useGlobalCommons();

//   const { open, close, functionsProducts, packageSelected } = props;
//   const { states, functions } = useAddProducts();
//   const {
//     showFilters,
//     products,
//     totalPages,
//     totalProducts,
//     todosPerPage,
//     limit,
//     page,
//     todosData,
//     selectCategory,
//     selectBrand,
//     selectTypeProduct,
//     openAdd,
//     productSelected,
//     searchTerm,
//   } = states;
//   const {
//     handleShowFilter,
//     handleReloadProducts,
//     handlePage,
//     handleOpenAdd,
//     handleCloseAdd,
//     handleProductSelected,
//     removeCategory,
//     removeBrand,
//     removeTypeProduct,
//     removeProduct,
//     handleCategory,
//     handleBrand,
//     handleTypeProduct,
//     handleSearch,
//   } = functions;
//   return (
//     <AddProductStyle open={open} onClose={close} anchor="right" showfilters={showFilters.toString()}>
//       <div className="header">
//         <p className="title_head" onClick={() => console.log("products", todosData)}>
//           Productos
//         </p>
//         <IconButton className="reload_bt" size="small" onClick={() => handleReloadProducts()}>
//           <Cached />
//         </IconButton>
//       </div>
//       <Input
//         className="search_box"
//         fullWidth
//         startAdornment={<Search className="search_icon" />}
//         value={searchTerm}
//         onChange={e => handleSearch(e)}
//         disableUnderline
//       />
//       <div className="filters">
//         <Select
//           onMenuOpen={() => getCatalogBy("typeProducts")}
//           loadingMessage={() => "Cargando Opciones..."}
//           isLoading={typeProducts.isFetching}
//           isClearable={true}
//           value={selectTypeProduct}
//           onChange={handleTypeProduct}
//           options={typeProducts.results}
//           className="select_filter"
//           styles={selectStyle}
//           placeholder="Tipo Producto"
//           getOptionValue={option => `${option["id"]}`}
//           getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
//         />
//         <Select
//           onMenuOpen={() => getCatalogBy("categories")}
//           loadingMessage={() => "Cargando Opciones..."}
//           options={categories.results}
//           isLoading={categories.isFetching}
//           isClearable={true}
//           value={selectCategory}
//           onChange={handleCategory}
//           className="select_filter"
//           styles={selectStyle}
//           placeholder="Elige Categoria"
//           getOptionValue={option => `${option["id"]}`}
//           getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
//         />
//         <Select
//           onMenuOpen={() => getCatalogBy("brands")}
//           loadingMessage={() => "Cargando Opciones..."}
//           isLoading={brands.isFetching}
//           isClearable={true}
//           value={selectBrand}
//           onChange={handleBrand}
//           options={brands.results}
//           className="select_filter"
//           styles={selectStyle}
//           placeholder="Elige Marca"
//           getOptionValue={option => `${option["id"]}`}
//           getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
//         />
//       </div>
//       <div className="chips">
//         {searchTerm !== "" && (
//           <Chip
//             color="primary"
//             size="small"
//             onDelete={removeProduct}
//             label={`${"Producto"}: ${searchTerm.toLocaleLowerCase()}`}
//             className="chip"
//           />
//         )}
//         {selectCategory !== "" && (
//           <Chip
//             color="primary"
//             size="small"
//             onDelete={removeCategory}
//             label={`${"Categoría"}: ${selectCategory.name.toLocaleLowerCase()}`}
//             className="chip"
//           />
//         )}
//         {selectBrand !== "" && (
//           <Chip
//             color="primary"
//             size="small"
//             onDelete={removeBrand}
//             label={`${"Marca"}: ${selectBrand.name.toLocaleLowerCase()}`}
//             className="chip"
//           />
//         )}
//         {selectTypeProduct !== "" && (
//           <Chip
//             color="primary"
//             size="small"
//             onDelete={removeTypeProduct}
//             label={`${"Tipo producto"}: ${selectTypeProduct.name.toLocaleLowerCase()}`}
//             className="chip"
//           />
//         )}
//       </div>

//       <div className="table_container">
//         {products.isFetching ? (
//           <div className="ctr_load">
//             <div className="ctr_load__img">
//               <img src="/load.png" />
//             </div>
//             <div className="ctr_load__load">
//               <p>Cargando Productos</p>
//               <LinearProgress color="primary" />
//             </div>
//           </div>
//         ) : (
//           <>
//             {totalProducts !== 0 ? (
//               <>
//                 <div className="table_content">
//                   <table className="table" cellSpacing={0}>
//                     <thead className="thead">
//                       <tr className="tr_head">
//                         {heads.map((item, index) => (
//                           <th className={`th ${item === "Producto" && "active"}`} key={index}>
//                             {item}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="tbody">
//                       {todosData.map((item, index) => (
//                         <Tooltip key={index} title="Agregar Producto" arrow>
//                           <tr className="body_tr" onClick={() => handleProductSelected(item)}>
//                             <td className="td">{item.code}</td>
//                             <td className="td">{item.name}</td>
//                             <td className="td">{item.brand?.name}</td>
//                             <td className="td">{item.stock}</td>
//                             <td className="td">{item.category?.name}</td>
//                           </tr>
//                         </Tooltip>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="pagination">
//                   <Pagination
//                     shape="rounded"
//                     style={{ display: "flex", justifyContent: "center" }}
//                     page={page}
//                     defaultPage={1}
//                     onChange={handlePage}
//                     count={totalPages}
//                     color="primary"
//                   />
//                   <p className="title_pagination">
//                     {`Total de Productos: ${totalProducts} Página: ${page} - ${Math.ceil(totalProducts / limit)}`}{" "}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <div className="body_empty">
//                 <img src="/empty_table.svg" />
//                 <p className="titleNotFound">Aun no hay datos</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <Add
//         open={openAdd}
//         close={handleCloseAdd}
//         data={productSelected}
//         functionsProducts={functionsProducts}
//         packageSelected={packageSelected}
//       />
//     </AddProductStyle>
//   );
// }

// const Add = props => {
//   const { open, close, data, isControlled, functionsProducts, packageSelected } = props;
//   const { hooksTools, states, functions } = useSingleProduct({ data, functionsProducts, packageSelected, close });
//   const { setValue, handleSubmit, register, control, clearErrors, errors } = hooksTools;
//   const { deliverytimes, total } = states;
//   const { handleFormProduct } = functions;
//   return (
//     <AddStyle open={open} onClose={close}>
//       <div className="header">
//         <p className="title_header" onClick={() => console.log("paquete", packageSelected)}>
//           Confirmación de Producto
//         </p>
//       </div>
//       <Grid className="form_product" container spacing={1}>
//         <Grid md={12} item>
//           <p className="title">Producto </p>
//           <input
//             className="input_data"
//             {...register("name_product", {
//               required: "*Requerido",
//             })}
//             disabled
//           />
//         </Grid>
//         <Grid md={6} item>
//           <p className="title">Código</p>
//           <input
//             className="input_data"
//             {...register("code", {
//               required: "*Requerido",
//             })}
//             disabled
//           />
//         </Grid>
//         <Grid md={6} item>
//           <p className="title">Clasificación</p>
//           <input
//             className="input_data"
//             {...register("import", {
//               required: "*Requerido",
//             })}
//             disabled
//           />
//         </Grid>
//         <Grid md={6} item>
//           <p className="title">Precio unitario</p>
//           <input
//             className="input_data"
//             {...register("callamount", {
//               required: "*Requerido",
//             })}
//             disabled
//           />
//         </Grid>

//         {/* <Grid md={6} item>
//           <p className="title">
//             Precio Unitario <RequiredMessage message={errors.callamount?.message} />
//           </p>
//           <Controller
//             name="callamount"
//             control={control}
//             rules={{ required: "*Requerido" }}
//             render={({ field }) => <NumberFormat
//             {...field} className="input_data" thousandSeparator />}
//           />
//         </Grid> */}
//         <Grid md={6} item>
//           <p className="title">Marca</p>
//           <input
//             className="input_data"
//             {...register("brand", {
//               required: "*Requerido",
//             })}
//             disabled
//           />
//         </Grid>
//         <Grid md={6} item>
//           <p className="title">
//             Cantidad <RequiredMessage message={errors.quantity?.message} />
//           </p>
//           <Controller
//             name="quantity"
//             control={control}
//             rules={{ required: "*Requerido" }}
//             render={({ field }) => <NumberFormat {...field} className="input_data" thousandSeparator />}
//           />
//         </Grid>

//         <Grid md={6} item>
//           <p className="title">
//             Tipo de Entrega <RequiredMessage message={errors.type_file?.message} />
//           </p>
//           <Controller
//             name="type_file"
//             control={control}
//             rules={{ required: "*Requerido" }}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 styles={selectStyle}
//                 options={deliverytimes}
//                 className="select_data"
//                 placeholder="Elige una Opción"
//                 getOptionLabel={e => e.deliverytimes}
//                 getOptionValue={e => e.id}
//                 maxMenuHeight={130}
//                 noOptionsMessage={() => "Sin Opciones"}
//               />
//             )}
//           />
//         </Grid>
//         <Grid md={12} item>
//           <p className="title">Observaciones del Producto</p>
//           <textarea
//             className="textarea_data"
//             {...register("observations", {
//               required: false,
//             })}
//           />
//         </Grid>

//         <Grid className="totals" md={12} item>
//           <p>
//             Total: <span>{formatNumber(total)}</span>
//           </p>
//         </Grid>
//       </Grid>
//       <div className="buttons">
//         <Button className="bt_add" onClick={handleSubmit(handleFormProduct)}>
//           Agrear Producto
//         </Button>
//       </div>
//     </AddStyle>
//   );
// };

// const RequiredMessage = ({ message }) => {
//   return <RequiredMessageStyle>{message ? message : "*"}</RequiredMessageStyle>;
// };
