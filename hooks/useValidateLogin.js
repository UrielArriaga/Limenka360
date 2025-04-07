import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyById } from "../redux/slices/companySlice";
import {
  getCountClientes,
  getCountCustomers,
  getCountOportunities,
  getCountProspect,
  getPayments,
} from "../redux/slices/dashboardSlice";
import { fillExecutives } from "../redux/slices/ejecutivosSlice";
import { fetchUserBytoken, userSelector } from "../redux/slices/userSlice";
import { RedirectPage } from "../utils";

export default function useValidateLogin(roleAccepted) {
  const dispatch = useDispatch();
  const { isFetching, id_user, isSuccess, groupId, isError, errorMessage, isLogged_User, roleId, company } =
    useSelector(userSelector);
  const router = useRouter();

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    HandleLogin();
  }, []);

  const HandleLogin = () => {
    // dispatch(fetchUserBytoken({}));
  };

  useEffect(() => {
    // console.log("%c" + "en useeffec", "color:green");
    //console.log(roleAccepted);

    //console.log(roleId);
    //console.log(router);
    if (isLogged_User === false && isFetching === true) {
      setIsLoadingPage(true);
      return;
    }
    if (isLogged_User === false && isFetching === false) {
      router.push("/login");
      return;
    }

    if (isLogged_User === true && isFetching == false) {
      if (roleAccepted.includes(roleId)) {
        // fillCatalogos(roleId);
        setIsLoadingPage(false);
        return;
      } else {
        RedirectPage(roleId, router);
      }
    }
  }, [id_user, isFetching]);

  const fillCatalogos = role => {
    switch (role) {
      case "Admin_compania":
        dispatch(getCompanyById({ company }));
        let query = {
          groupId: groupId,
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        };
        dispatch(fillExecutives({ groupId, query }));

        dispatch(getCountProspect({ id: id_user }));
        break;

      case "gerente":
        dispatch(getCompanyById({ company }));
        let queryManager = {
          groupId: groupId,
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        };
        dispatch(fillExecutives({ groupId, query: queryManager }));
        dispatch(getCountProspect({ id: id_user }));
        dispatch(getCountOportunities({ id: id_user }));
        dispatch(getCountCustomers({ id: id_user }));
        dispatch(getCountClientes({ id: id_user }));
        dispatch(getPayments({ id: id_user }));

        break;

      case "ejecutivo":
        dispatch(getCompanyById({ company }));
        dispatch(getCountProspect({ id: id_user }));
        dispatch(getCountOportunities({ id: id_user }));
        dispatch(getCountCustomers({ id: id_user }));
        dispatch(getCountClientes({ id: id_user }));
        dispatch(getPayments({ id: id_user }));
        break;
      default:
        break;
    }
  };
  return { isLoadingPage, isSuccess };
}
