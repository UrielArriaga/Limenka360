import React, { useEffect, useState } from 'react'
import ApiRequest from '../services'

function useGetProducts() {
  const request = new ApiRequest();
  const [dataProducts, setDataProducts] = useState({
    data:[],
    isFetching:false,
    total:0
  });

  useEffect(()=>{
    getProducts();
  },[])

  const getProducts = async() => {
    try {
        setDataProducts(prevState => ({...prevState, isFetching:true}));
        let data = await request.getDataProducts();
        if(data.status === 200 || data.status === 201){
            setDataProducts({isFetching:false, data:data.data.results, total:data.data.count})
        }
    } catch (error) {
        console.log(error);
        setDataProducts(prevState => ({...prevState, isFetching:false}))
    }
  }

  return {
    dataProducts
  }
}

export default useGetProducts
