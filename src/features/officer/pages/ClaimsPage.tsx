import PageContainer from "../../../components/layout/PageContainer";
import HandoverPanel from "../components/HandoverPanel";

export default function ClaimsPage() {
  return (
    <PageContainer>
      <div className="page-header">
        <div>
          <h1>Claims</h1>
          <p className="muted">
            Verify claimants and process document handovers.
          </p>
        </div>
      </div>

      <HandoverPanel />
    </PageContainer>
  );
}
