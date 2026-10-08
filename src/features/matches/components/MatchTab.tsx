import { useMyLostReports } from "../../reports/hooks/useMyReports";
import MatchDetails from "./MatchDetails";
import ConfirmMatchButton from "./ConfirmMatchButton";
import DeclineMatchButton from "./DeclineMatchButton";

export default function MatchTab() {
  const { data: reports = [], isLoading } = useMyLostReports();

  const matches = reports.filter(
    (report) =>
      report.status === "possible_match" && report.matched_found_report,
  );

  if (isLoading) {
    return <p>Loading possible matches...</p>;
  }

  if (matches.length === 0) {
    return (
      <div className="card">
        <h2>No possible matches</h2>
        <p className="muted">
          We will show a possible match here when a document matching your lost
          report is received at a station.
        </p>
      </div>
    );
  }

  return (
    <div className="card-list">
      {matches.map((report) => (
        <div key={report.reference}>
          <MatchDetails report={report} />

          <div className="actions">
            <ConfirmMatchButton reference={report.reference} />
            <DeclineMatchButton reference={report.reference} />
          </div>
        </div>
      ))}
    </div>
  );
}
