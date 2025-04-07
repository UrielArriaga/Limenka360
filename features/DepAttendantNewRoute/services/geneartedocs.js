import dayjs from "dayjs";
import { LogoSelectById } from "../../../components/Group";

class GenerateDocs {
  totalsum(productRute) {
    const totales = productRute?.map(item => {
      return parseFloat(item?.import.replace(/[$,]/g, ""));
    });
    let sumaTotal = totales?.reduce((acc, curr) => acc + curr, 0);
    return sumaTotal;
  }

  normalizeData(driverSelect, dataOrder, productRute, ordersToAdd, newProducts) {
    const { name, lastname } = {
      name: "Sin nombre",
      lastname: "Sin apellido",
    };
    const { folio, phone, receive } = dataOrder?.data || {};
    const { city, entity } = ordersToAdd[0]?.order?.address || {};
    const { driver, trasportunit } = driverSelect || {};

    const fullName = `${name} ${lastname}` || "Sin nombre";
    const formattedDate = dayjs().format("DD/MM/YYYY ");
    const clientStreet = `${city?.name || ""} ${entity?.name || "sin direccion"}`;
    const totalSum = this.totalsum(newProducts);

    const transport = {
      nametrasport: driver?.label,
      paisorigen: "Cdmx",
      totaldistance: trasportunit?.mileage,
      tipetrasport: `${trasportunit?.brand}, ${trasportunit?.model}`,
      Numpermision: trasportunit?.engine_number,
      placa: trasportunit?.tuition,
      agetransport: dayjs(trasportunit?.createdAt).format("YYYY"),
      poliza: trasportunit?.insurance_policy,
      age: dayjs(trasportunit?.createdAt).format("YYYY"),
    };

    const client = {
      tax: "N/A",
      name: receive,
      rfc: "N/A",
      street: clientStreet,
    };

    const data = {
      id: "1",
      sphere: LogoSelectById(dataOrder?.data?.createdbyid?.groupId),
      EjecutiveName: fullName,
      Folio: folio || "Sin Folio",
      serialnumber: "0098W",
      createdAt: formattedDate,
      phone: phone || "Sin numero",
      metodpay: "Efectivo",
      sub: totalSum,
      descuento: "0",
      total: totalSum,
      client,
      transport,
      products: newProducts,
    };

    return data;
  }
}

export default GenerateDocs;
