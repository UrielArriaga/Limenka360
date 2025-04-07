import React, { useState, useEffect, useRef } from "react";
import NewGoals from "../../../components/UI/templates/DirectorNewGoals";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import DirectorLayout from "../../../layouts/DirectorLayout";
import MainLayout from "../../../components/MainLayout";

export default function NewProspect() {
  const { roleId } = useSelector(userSelector);
  return (
    <>
      {roleId === "director" || roleId === "Admin_compania" ? (
        <DirectorLayout>
          <NewGoals />
        </DirectorLayout>
      ) : (
        <MainLayout>
          <NewGoals />
        </MainLayout>
      )}
    </>
  );
}
