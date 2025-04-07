import React from "react";
import { FormContainer } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import InputField from "../../common/InputField";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import SelectField from "../../common/SelectField";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import NewOrderTemplate from "./NewOrderTemplate";
import NationalTemplate from "./NationalTemplate";

export default function Resume({ formControls, productControl, type = "", previewData }) {
  console.log(type);
  const { control, errors, register, options, handleOnChangeSelect } = formControls;
  const { paymentsacount, shippingtype, cities, taxinformations } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  // const orderData = {
  //   provider: {
  //     companyname: "Tech Supplies Inc.",
  //     name: "John Doe",
  //     fullname: "Johnathan Doe",
  //     phone: "+123456789",
  //     email: "johndoe@techsupplies.com"
  //   },
  //   products: [
  //     {
  //       model: "TS-1000",
  //       name: "Thermal Scanner",
  //       quantity: 10,
  //       unitprice: 50,
  //       amount: 500
  //     },
  //     {
  //       model: "MD-200",
  //       name: "Medical Device",
  //       quantity: 5,
  //       unitprice: 100,
  //       amount: 500
  //     }
  //   ],
  //   folio: "ORD-20240217",
  //   buyer: {
  //     name: "Jane Smith",
  //     tax: "XYZ-123456",
  //     contact: "jane.smith@healthcare.com",
  //     address: "123 Main St, Suite 400, New York, NY 10001",
  //     phone: "+1987654321",
  //     email: "janesmith@company.com"
  //   },
  //   address: {
  //     street: "Main St",
  //     int_number: "400",
  //     ext_number: "123",
  //     postal: { postal_code: "10001" },
  //     city: { name: "New York" },
  //     entity: { name: "New York" }
  //   }
  // };

  return (
    <FormContainer>
      <div className="sectionheader">
        <h1 className="title">Resumen de orden de compra</h1>
        <Assignment className="icon_primary" />
      </div>

      {/* <pre>{JSON.stringify(previewData, null, 2)}</pre> */}

      {type === "INTERNACIONAL" && <NewOrderTemplate data={previewData} zoom={0} emailUpdate={""} totalIVA={0} />}

      {type === "NACIONAL" && <NationalTemplate data={previewData} zoom={0} emailUpdate={""} totalIVA={0} />}
    </FormContainer>
  );
}
