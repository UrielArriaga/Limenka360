import React from "react";
import { api } from "../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice";
import { generateTemporalId } from "../utils";

export default function useSaveError() {
  const { id_user } = useSelector(userSelector);

  const generateIdError = () => {
    return "ERROR-" + generateTemporalId(5);
  };

  function formatError(error) {
    return {
      message: error.message || "Unknown error",
      stack: error.stack || null,
      name: error.name || "Error",
      timestamp: new Date().toISOString(),
      additionalInfo: typeof error === "object" ? JSON.stringify(error, null, 2) : String(error),
    };
  }

  const saveError = async (error, idError, where) => {
    let finalId = idError;
    if (idError == null) {
      finalId = "ERROR-" + generateTemporalId(5);
    }
    try {
      let bodyLog = {
        level: "error",
        source: "frontend",
        url_or_endpoint: where,
        status_code: 404,
        message: {
          message: "data",
        },
        request_payload: formatError(error),
        response_payload: {
          response: 1231,
        },
        error_code: finalId,
        createdbyId: id_user,
      };

      console.log(bodyLog);

      await api.post("logslimenka", bodyLog);
    } catch (error) {
      console.log("Error saving error", error);
    }
  };

  return {
    saveError,
    generateIdError,
  };
}
