import { useForm } from "react-hook-form";
import useModal from "../../../hooks/useModal";
import { useState } from "react";

const useDepAttendantOrders = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { open: isOpenModalOrders, toggleModal: handleToggleModalOrders } = useModal();

  const [ordersToAdd, setOrdersToAdd] = useState([]);

  const handleOnChangeAddOrder = (isChecked, order) => {
    console.log("ord", order);
    if (!isChecked) return setOrdersToAdd(ordersToAdd.filter(item => item.id !== order.id));

    setOrdersToAdd([...ordersToAdd, order]);
  };

  const handleDeleteOrder = order => {
    setOrdersToAdd([...ordersToAdd.filter(item => item.id !== order.id)]);
  };

  const handleOnSubmit = formData => {
    console.log(formData);
  };
  return {
    register,
    control,
    isOpenModalOrders,
    ordersToAdd,
    handleToggleModalOrders,
    handleOnChangeAddOrder,
    handleSubmit,
    handleOnSubmit,
    handleDeleteOrder,
  };
};

export default useDepAttendantOrders;
