import PageContainer from "../../../components/layout/PageContainer";
import ConfirmDropOffForm from "../components/ConfirmDropOffForm";

export default function DepositsPage() {
  return (
    <PageContainer>
      <div className="page-header">
        <div>
          <h1>Deposits</h1>
          <p className="muted">Confirm documents delivered to the station.</p>
        </div>
      </div>

      <ConfirmDropOffForm />
    </PageContainer>
  );
}
