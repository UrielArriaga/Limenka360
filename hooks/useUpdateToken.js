import React, { useEffect, useState } from "react";
import { userSelector } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { api } from "../services/api";
import { getToken, messaging } from "../firebase-config";

const useFCMToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && messaging) {
      const fetchToken = async () => {
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: "BGx6BzPoNzgLEeTBjE9Oj8q2hAgKyXd-QezQ16M7G4F9uf9XIM7u2bRQbFSXIcedr42o6SWwLbSIpp4Ec6rrFW8",
          });
          if (currentToken) {
            setToken(currentToken);
          }
        } catch (error) {
          console.error("Error obteniendo el token FCM:", error);
        }
      };

      fetchToken();
    }
  }, []);

  return token;
};

export default function useUpdateToken() {
  const { userData, isFetching, id_user, isSuccess, groupId, isError, errorMessage, isLogged_User, roleId, company } =
    useSelector(userSelector);

  const token = useFCMToken();

  useEffect(() => {
    if (id_user) {
      if (isLogged_User && token) {
        addToken();
      }
    }
  }, [id_user, token]);

  async function addToken() {
    try {
      let responseToken = await api.put(`ejecutives/notificationtoken/${id_user}`, {
        notificationtoken: token,
      });

      console.log(responseToken);
    } catch (error) {
      console.log(error);
    }
  }

  return {};
}
