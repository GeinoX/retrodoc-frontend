import { Link } from "react-router-dom";
import PageContainer from "../../../components/layout/PageContainer";
import EmptyState from "../../../components/feedback/EmptyState";
import Spinner from "../../../components/ui/Spinner";
import { useMyReports } from "../hooks/useMyReports";
import { FOUND_STATUS_LABELS, LOST_STATUS_LABELS } from "../statuses";

export default function MyReportsPage() {
  const { data: reports = [], isLoading, isError } = useMyReports();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="reports-loading">
          <Spinner />
          <p>Loading your reports...</p>
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <div className="reports-error">
          <div className="reports-error-icon">!</div>

          <div>
            <h3>Unable to load reports</h3>
            <p>
              We could not retrieve your reports right now. Please try again.
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="reports-page">
        <header className="reports-header">
          <div className="reports-heading">
            <div className="reports-kicker">
              <span className="reports-kicker-line" />
              DOCUMENT ACTIVITY
            </div>

            <h1>My reports</h1>

            <p>
              Manage and track every document you have reported as lost or
              found.
            </p>
          </div>

          <div className="reports-actions">
            <Link to="/lost" className="report-action report-action-secondary">
              <span className="report-action-symbol">−</span>

              <span>
                <small>Document</small>
                Report lost
              </span>
            </Link>

            <Link to="/found" className="report-action report-action-primary">
              <span className="report-action-symbol">+</span>

              <span>
                <small>Document</small>
                Report found
              </span>
            </Link>
          </div>
        </header>

        {reports.length > 0 && (
          <div className="reports-summary">
            <div className="reports-summary-card">
              <div className="reports-summary-icon">
                <span>◎</span>
              </div>

              <div>
                <strong>{reports.length}</strong>

                <span>
                  {reports.length === 1 ? "Total report" : "Total reports"}
                </span>
              </div>
            </div>

            <div className="reports-summary-divider" />

            <div className="reports-summary-text">
              <span className="reports-summary-label">ACTIVITY</span>

              <span className="reports-summary-description">
                Your latest lost and found document activity
              </span>
            </div>
          </div>
        )}

        {reports.length === 0 ? (
          <div className="reports-empty-wrapper">
            <div className="reports-empty-icon">
              <div className="reports-empty-document">
                <span />
                <span />
                <span />
              </div>
            </div>

            <EmptyState
              title="No reports yet"
              description="When you report a lost or found document, it will appear here."
            />

            <div className="reports-empty-actions">
              <Link to="/lost" className="report-action report-action-primary">
                Report a lost document
              </Link>

              <Link
                to="/found"
                className="report-action report-action-secondary"
              >
                Report a found document
              </Link>
            </div>
          </div>
        ) : (
          <section className="reports-section">
            <div className="reports-section-heading">
              <div>
                <h2>Your documents</h2>

                <p>Select a report to view its details and progress.</p>
              </div>
            </div>

            <div className="reports-grid">
              {reports.map((report) => {
                const isFound = report.status in FOUND_STATUS_LABELS;

                const label = isFound
                  ? FOUND_STATUS_LABELS[report.status]
                  : LOST_STATUS_LABELS[report.status];

                /*
                 * The backend returns drop_off_code for
                 * found reports. We only show it when the
                 * report is a found document and a code exists.
                 */
                const dropOffCode =
                  isFound && "drop_off_code" in report
                    ? report.drop_off_code
                    : null;

                return (
                  <Link
                    key={report.reference}
                    to={`/dashboard/reports/${report.reference}`}
                    className="report-card"
                  >
                    <div className="report-card-top">
                      <div
                        className={`report-type ${
                          isFound ? "report-type-found" : "report-type-lost"
                        }`}
                      >
                        <span className="report-type-icon">
                          {isFound ? "↗" : "↘"}
                        </span>

                        <span>
                          {isFound ? "Found document" : "Lost document"}
                        </span>
                      </div>

                      <span className="report-card-arrow">→</span>
                    </div>

                    <div className="report-card-content">
                      <span className="report-card-label">DOCUMENT</span>

                      <h3>{report.title}</h3>

                      <div className="report-reference">
                        <span className="report-reference-dot" />
                        {report.reference}
                      </div>

                      {/* DROP-OFF CODE */}
                      {dropOffCode && (
                        <div className="drop-off-code-box">
                          <div className="drop-off-code-heading">
                            <span>DROP-OFF CODE</span>

                            <span className="drop-off-code-lock">●</span>
                          </div>

                          <div className="drop-off-code-value">
                            {dropOffCode}
                          </div>

                          <p>
                            Give this code to the station officer when handing
                            over the document.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="report-card-footer">
                      <span className="report-status-title">
                        Current status
                      </span>

                      <span
                        className={`report-status ${
                          isFound ? "report-status-found" : "report-status-lost"
                        }`}
                      >
                        <span className="report-status-dot" />
                        {label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </PageContainer>
  );
}
