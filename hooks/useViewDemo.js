import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useRouter } from 'next/router';
import useDemos from './useDemos';
import useValidateLogin from './useValidateLogin';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/slices/userSlice';

export default function useViewDemo(){

  useEffect(() => {
    getDemos(demo);
    if (oportunityId) {
      handleGetProductsOportunity();
    }
  }, [ isLogged_User, demoItem, userData, demo, routerOportunityId, oportunityId, products]);

    const { isLoadingPage} = useValidateLogin([
      "gerente",
      "ejecutivo",
      "Admin_compañia",
      "admin",
      "administrador_de_ventas",
    ])
    const router = useRouter();
    const {demoItem} = useDemos();
    const {isLogged_User, roleId, userData}=useSelector(userSelector);
    const {demo} = router.query;
    const [demos, setDemos] = useState({ isFeching: false, data: [], });
    const routerOportunityId = router.query.op;
    const [products, setProducts] = useState([]);
    const oportunityId = demos?.data?.oportunityId;

  const getDemos = async id => {
    if (!isLogged_User) return;
    try {
      let include = "address,address.entity.city.postal,orderstatus,oportunity,oportunity.phase.prospect.productsoportunities";
      let params = {showproducts : 1, include: include };
      setDemos(prevState => ({ ...prevState, isFeching: true }));
      let response = await api.get(`demosales/${id}`, { params });
      let demo = response.data;
      console.log('demosID:', demo);
      
      const oportunityId = demo.oportunityId;
      if (oportunityId) {
        handleGetProductsOportunity(oportunityId);  // Cargar productos después de que la demo esté cargada
      }
      setDemos(prevState => ({ ...prevState, data: demo, isFeching: false }));
    } catch (error) {
      setDemos(prevState => ({ ...prevState, isFeching: false }));
    }
  };

  const handleGetProductsOportunity = async (oportunityId) => {
    try {
      let query = { oportunityId : oportunityId };
      let params = {
        where: JSON.stringify(query),
        include: "product,product.brand",
      };
      let response = await api.get("productsoportunities", { params });
      // let products = normalizeProducts(response.data.results) || [];
      let filteredProducts = normalizeProducts(response.data.results) || [] ;
      console.log('products en Demo:', filteredProducts);
      // setProducts(products);
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const normalizeProducts = products => {
    let normalize = products.map(item => ({
      id: generateTemporalId(5),
      model: item.product.code,
      description: item.product.name,
      quantity: item.quantity,
      serial: "",
    }));
    return normalize;
  };

  const generateTemporalId = length => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return { 
    demo,
    demos,
    demoItem,
    isLogged_User,
    roleId,
    isLoadingPage,
    userData,
    oportunityId,
    products, 
    getDemos,
    handleGetProductsOportunity,
  };
};