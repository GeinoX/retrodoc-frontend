import { Link, useParams } from "react-router-dom";
import PageContainer from "../../../components/layout/PageContainer";
import Spinner from "../../../components/ui/Spinner";
import { useMyReports } from "../hooks/useMyReports";
import { FOUND_STATUS_LABELS, LOST_STATUS_LABELS } from "../statuses";

export default function ReportFullPage() {
  const { reference } = useParams();
  const { data: reports = [], isLoading } = useMyReports();

  if (isLoading) {
    return (
      <PageContainer>
        <Spinner />
      </PageContainer>
    );
  }

  const report = reports.find((item) => item.reference === reference);

  if (!report) {
    return (
      <PageContainer>
        <div className="card">
          <h1>Report not found</h1>
          <Link to="/dashboard/reports">Back to reports</Link>
        </div>
      </PageContainer>
    );
  }

  const isFound = report.status in FOUND_STATUS_LABELS;

  const status = isFound
    ? FOUND_STATUS_LABELS[report.status]
    : LOST_STATUS_LABELS[report.status];

  return (
    <PageContainer>
      <div className="page-header">
        <div>
          <h1>{report.title}</h1>
          <p className="muted">Reference: {report.reference}</p>
        </div>

        <span className="status-badge">{status}</span>
      </div>

      <section className="card">
        <h2>Document information</h2>

        <div className="details-grid">
          <div>
            <strong>Name</strong>
            <p>{report.name_on_document || "—"}</p>
          </div>

          <div>
            <strong>Document number</strong>
            <p>{report.document_number || "—"}</p>
          </div>

          <div>
            <strong>Date of birth</strong>
            <p>{report.date_of_birth || "—"}</p>
          </div>

          <div>
            <strong>Issue date</strong>
            <p>{report.issue_date || "—"}</p>
          </div>

          <div>
            <strong>Issuing organisation</strong>
            <p>{report.issuing_organisation || "—"}</p>
          </div>

          <div>
            <strong>Location</strong>
            <p>{report.place_detail || "—"}</p>
          </div>
        </div>
      </section>

      {report.drop_off_code && (
        <section className="card">
          <h2>Drop-off code</h2>
          <p>
            Give this code to the station officer when you drop off the
            document.
          </p>

          <code className="code-display">{report.drop_off_code}</code>
        </section>
      )}

      {report.collection_code && (
        <section className="card">
          <h2>Collection code</h2>
          <p>Keep this code safe. It is used during the collection process.</p>

          <code className="code-display">{report.collection_code}</code>
        </section>
      )}
    </PageContainer>
  );
}
