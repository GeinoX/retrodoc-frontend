import PageContainer from "../../../components/layout/PageContainer";
import HowItWorks from "../components/HowItWorks";
import SafetyTips from "../components/SafetyTips";

export default function HelpPage() {
  return (
    <PageContainer>
      <div className="page-header">
        <div>
          <h1>Help</h1>
          <p className="muted">
            Learn how RetroDoc handles lost and found documents.
          </p>
        </div>
      </div>

      <div className="page-stack">
        <HowItWorks />
        <SafetyTips />
      </div>
    </PageContainer>
  );
}
