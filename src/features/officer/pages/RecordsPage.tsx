import PageContainer from "../../../components/layout/PageContainer";
import RecordsTable from "../components/RecordsTable";

export default function RecordsPage() {
  return (
    <PageContainer>
      <div className="page-header">
        <div>
          <h1>Records</h1>
          <p className="muted">Review station handover attempts.</p>
        </div>
      </div>

      <RecordsTable />
    </PageContainer>
  );
}
