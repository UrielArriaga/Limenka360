import ReportsManager from "../../components/UI/templates/ReportsManager";
import ReportsExecutives from "../../features/ReportsExecutives";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import MainLayout from "../../components/MainLayout";
import ReportExecutivesLayout from '../../features/EjecutiveReports'

export default function reportOportunities() {
  const { roleId } = useSelector(userSelector);

  return (
    <MainLayout>
      <ReportExecutivesLayout>
        {roleId === "ejecutivo" ? <ReportsExecutives /> : <ReportsManager />}
      </ReportExecutivesLayout>
    </MainLayout>
  );
}

