import { ArrowBack, Cached, People } from "@material-ui/icons";
import { useRouter } from "next/router";
import BarChartPayments from "../BarCharPayments";

export default function HeadPayment({ count = 0, getPayments, title, back, recharge }) {
  const router = useRouter();
  return (
    <div className="head">
      <div className="title">
        <div className="totalrows" >
          {back && <ArrowBack className="icon" onClick={() => router.back()} />}
          <h1>{title}</h1>
        </div>
        <div className="totalrows">
          <People />
          <p>{count} Registros</p>
          <div onClick={() => getPayments()}>
            <Cached />
          </div>
        </div>
      </div>
      <BarChartPayments recharge={recharge} />
    </div>
  );
}
