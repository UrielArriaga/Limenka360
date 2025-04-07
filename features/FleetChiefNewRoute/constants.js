import EquipamientoHospitalarioTemplate from "../../components/TemplatesAlmacen/EquipamientoHospitalarioTemplate";
import MeisonNewTemplate from "../../components/TemplatesAlmacen/MeisonNewTemplate";
import MexreiNewTemplate from "../../components/TemplatesAlmacen/MexreiNewTemplate";
import GarantiaChiso from "../../components/TemplatesAlmacen/GarantiaChisoTemplate";
import Garantia2022ProTemplate from "../../components/TemplatesAlmacen/Garantia2022ProTemplate";
import GarantiaAYMOJUL5002Template from "../../components/TemplatesAlmacen/GarantiaAYMOJUL5002Template";
import LifeMedicWheelchairWarrantyTemplate from "../../components/TemplatesAlmacen/LifeMedicWheelchairWarrantyTemplate";
import HelsemedicalWarrantyTemplate from "../../components/TemplatesAlmacen/HelsemedicalWarrantyTemplate";


export const totalIVA = 14;

export const preOptions = [{ value: "option1", label: "Opción 1" }];

export const templatesData = {
  folio: "123"
};

export const myTemplates = [
  {
    img: "/pruebaTemplate.png",
    name: "Equipamiento hospitalario",
    index: 1,
    component: EquipamientoHospitalarioTemplate,
  },
  { img: "/pruebaTemplate.png", name: "Meison new template", index: 2, component: MeisonNewTemplate },
  { img: "/pruebaTemplate.png", name: "Mexrei new template", index: 3, component: MexreiNewTemplate },
  { img: "/TemplatewarrantyChison.png", name: "Warranty Chison", index: 4, component: GarantiaChiso },
  { img: "/Templatewarranty2022Pro.png", name: "Warranty 2022Pro", index: 5, component: Garantia2022ProTemplate },
  { img: "/TemplatewarrantyAymo.png", name: "Warranty Aymo", index: 6,component: GarantiaAYMOJUL5002Template },
  { img: "/LifeMedicWheelchairWarrantyTemplate.png", name:"LifeMedicWheelchair Warranty", index: 7, component: LifeMedicWheelchairWarrantyTemplate },
  { img: "/HelsemedicalWarrantyTemplate.png", name: "Helsemedical Warranty", index: 8, component: HelsemedicalWarrantyTemplate },
];

export const testProducts = [
  {
    id: "GocgzPZECuNWJT5fRcHRNgRo",
    serialnumber: "FuetJWuY",
    statusrepair: 0,
    createdAt: "2024-07-15T21:54:42.143Z",
    updatedAt: "2024-07-29T14:44:24.426Z",
    inventoryexitId: "8hI2nPkJC5UbhxqdB2z8MTex",
    productId: "SVwXBAppgen8H9ZczTV1TJYl",
    warehouseId: "QIszsqsY124SYHz90qHE83nK",
    inventoryentryId: "SSjsxslBlq9BNzmV6Amj8mR8",
    product: {
      id: "SVwXBAppgen8H9ZczTV1TJYl",
      name: "ABATELENGUA",
      amount: 1,
      storeamount: 1,
      callamount: 1,
      code: "PICA",
      import: true,
      isactive: true,
      system: false,
      description: "pica fresa",
      physicalstock: 0,
      stock: -3,
      createdAt: "2023-07-10T19:30:25.312Z",
      updatedAt: "2024-07-29T14:44:24.478Z",
      brandId: "62d09Tuuhp22mowzna3pO051",
      categoryId: "62d09Tuuhp22mowzna3pH143",
      producttypeId: "62d09Tuuhp22mowzna3pR006",
      providerId: "62d09Tuuhp22mowzna3pG001",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
  },
  {
    id: "3VTjse7sOLl3ZY0aieO8BU2k",
    serialnumber: "GWns1KBp",
    statusrepair: 0,
    createdAt: "2024-07-15T21:55:31.239Z",
    updatedAt: "2024-07-15T21:55:31.239Z",
    inventoryexitId: null,
    productId: "4APgyjqNSUt7CC1oTgGBeFgm",
    warehouseId: "QIszsqsY124SYHz90qHE83nK",
    inventoryentryId: "US3iCOLUZMLXHCdeil03vIVm",
    product: {
      id: "4APgyjqNSUt7CC1oTgGBeFgm",
      name: "CAMILLA DE TRASLADO FABRICADA EN ALUMINIO ABATIBLE AL GOLPE CON SISTEMA DE ARTICULACION POR GRAVEDAD EQUIPADA CON 6 RUEDAS GIRATORIAS ACABADO PINTURA EN POLVO, CON GANCHO, JUEGO DE CINTURON Y COLCHONETA",
      amount: 0,
      storeamount: 0,
      callamount: 43947,
      code: "MC-2214",
      import: false,
      isactive: true,
      system: false,
      description: "",
      physicalstock: 0,
      stock: 1,
      createdAt: "2022-12-06T17:09:49.680Z",
      updatedAt: "2024-07-15T17:39:26.099Z",
      brandId: "62d09Tuuhp22mowzna3pO011",
      categoryId: "62d09Tuuhp22mowzna3pH167",
      producttypeId: "62d09Tuuhp22mowzna3pR008",
      providerId: "62d09Tuuhp22mowzna3pG055",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
  },
];
