import { handleOpenGlobalAlert } from "../redux/slices/alertSlice";
export const handleGlobalAlert = (severity, message, type, dispatch, time = 3000) => {
    dispatch(
      handleOpenGlobalAlert({
        show: true,
        severity,
        message,
        type,
      })
    );
    setTimeout(() => {
      dispatch(
        handleOpenGlobalAlert({
          show: false,
          severity: null,
          message: null,
          type: null,
        })
      );
    }, time);
  };
  
  export const handleAlert = (severity, message, type, setState) => {
    setState({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setState({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };