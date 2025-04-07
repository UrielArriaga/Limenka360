import { useEffect, useState } from "react";
import ApiRuequestFormation from "../services/service";
import useModal from "../../../hooks/useModal";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useAlertToast from "../../../hooks/useAlertToast";

function useFormationEdit(selectedTraining) {
  const request = new ApiRuequestFormation();
  const { getCatalogBy } = useGlobalCommons();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const { users } = useSelector(commonSelector);
  const [selectedResponsible, setSelectedResponsible] = useState("");
  const { open: isAssignBioOpen, toggleModal: toggleAssignBioModal } = useModal();
  const [trainingProducts, setTrainingProducts] = useState({
    data: [],
    isFetching: false,
    total: 0,
  });

  useEffect(() => {
    fetchTraining();
  }, [selectedTraining]);

  const fetchTraining = async () => {
    try {
      setTrainingProducts(prevState => ({ ...prevState, isFetching: true }));
      let query = {
        trainingId: selectedTraining?.id,
      };
      let response = await request.getTrainingSelected(query);
      if (response.status == 200 || response.status == 201) {
        setTrainingProducts({ data: response?.data?.results, total: response?.data?.count, isFetching: false });
      }
    } catch (error) {
      console.log(error, "error");
      setTrainingProducts(prevState => ({ ...prevState, isFetching: false }));
    }
  };

  const handleResponsibleChange = event => (event == null ? setSelectedResponsible("") : setSelectedResponsible(event));

  const assignResponsible = async () => {
    if (selectedResponsible == "") {
      showAlertWarning("Asigne al biomedico");
      return;
    }

    try {
      let body = {
        responsibleId: selectedResponsible?.id,
      };
      const response = await request.putTraining(body, selectedTraining?.id);
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Se asigno correctamente");
        setSelectedResponsible("");
        toggleAssignBioModal();
      }
    } catch (error) {
      console.log("error:", error);
      showAlertError("Error al agregar biomedico");
    }
  };

  return {
    trainingProducts,
    modalAssignBiome: {
      isAssignBioOpen,
      toggleAssignBioModal,
    },
    optionSct: {
      getCatalogBy,
      users,
      handleResponsibleChange,
      selectedResponsible,
    },
    assignResponsible,
  };
}

export default useFormationEdit;
