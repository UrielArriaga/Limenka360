import dayjs from "dayjs";
import { api } from "../../../services/api";

export default class ApiRequestFacilitiesBio {
  async getFacilities(page, limit, selectedFacility) {
    let { id } = selectedFacility?.item;
    let params = {
      count: 1,
      include: "warehouseproduct,warehouseproduct.product,installation,installation.responsible",
      join: "warehouseproduct,warehouseproduct.product,installation,installation.responsible",
      limit,
      page,
      where: JSON.stringify({installationId:id}),
    };
    return await api(`installationproducts`, { params });
  }

  async getInstallations(page, limit, query){
    let params = {
      count:1,
      include:"responsible,createdby",
      limit,
      skip:page,
      where: JSON.stringify(query)
    };
    return await api(`installations`, {params});
  }

  NormalizeInstallations(data){
    return {
      folio: data?.folio || "N/A",
      installationdate: dayjs(data?.installationdate).format("DD MMMM YYYY") || "N/A",
      createdAt: dayjs(data?.createdAt).format("DD MMMM YYYY") || "N/A",
      responsible: data?.responsible?.fullname || "N/A",
      createdby: data?.createdby?.fullname || "N/A",
      item:data
    }
  }

  Normalize(data) {
    return {
      createdAt: dayjs(data?.createdAt).format("DD MMMM YYYY") || "N/A",
      folio: data?.installation?.folio || "N/A",
      status: data?.status || "N/A",
      serial: data?.warehouseproduct?.serialnumber || "N/A",
      installationdate: dayjs(data?.installation?.installationdate).format("DD MMMM YYYY") || "N/A",
      responsible: data?.installation?.responsible?.name || "N/A",
      item:data
    };
  }

  async getOnlyOneFacility() {}
}
