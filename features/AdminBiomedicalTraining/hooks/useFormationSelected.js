import { useEffect, useState } from "react";
import ApiRuequestFormation from "../services/service";
import useModal from "../../../hooks/useModal";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useAlertToast from "../../../hooks/useAlertToast";

function useFormationSelected(selectedTraining) {
  const request = new ApiRuequestFormation();
  const { getCatalogBy } = useGlobalCommons();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const { users } = useSelector(commonSelector);
  const [responsible, setResponsible] = useState("");
  const { open: openAssignBio, toggleModal: handleToggleBio } = useModal();
  const [productsTraining, setProductsTraining] = useState({
    data: [],
    isFetching: false,
    total: 0,
  });

  useEffect(() => {
    getTraining();
  }, [selectedTraining]);

  const getTraining = async () => {
    try {
      setProductsTraining(prevState => ({ ...prevState, isFetching: true }));
      let query = {
        trainingId: selectedTraining?.id,
      };
      let response = await request.getTrainingSelected(query);
      if (response.status == 200 || response.status == 201) {
        setProductsTraining({ data: response?.data?.results, total: response?.data?.count, isFetching: false });
      }
    } catch (error) {
      console.log(error, "error");
      setProductsTraining(prevState => ({ ...prevState, isFetching: false }));
    }
  };

  const handleChangeOption = event => (event == null ? setResponsible("") : setResponsible(event));

  const addResponsible = async () => {
    if (responsible == "") {
      showAlertWarning("Asigne al biomedico");
      return;
    }

    try {
      let body = {
        responsibleId: responsible?.id,
      };
      const response = await request.putTraining(body, selectedTraining?.id);
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Se asigno correctamente");
        setResponsible("");
        handleToggleBio();
      }
    } catch (error) {
      console.log("error:", error);
      showAlertError("Error al agregar biomedico");
    }
  };

  return {
    productsTraining,
    modalBioEdit: {
      openAssignBio,
      handleToggleBio,
    },
    optionsSelect: {
      getCatalogBy,
      users,
      handleChangeOption,
      responsible,
    },
    addResponsible,
  };
}

export default useFormationSelected;
