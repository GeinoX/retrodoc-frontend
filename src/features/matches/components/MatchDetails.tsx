import type { Report } from "../../reports/types";

interface Props {
  report: Report;
}

export default function MatchDetails({ report }: Props) {
  const found = report.matched_found_report;

  if (!found) {
    return null;
  }

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2>Possible match</h2>
          <p className="muted">
            A document with matching information has been found.
          </p>
        </div>

        <span className="status-badge">Possible match</span>
      </div>

      <div className="details-grid">
        <div>
          <strong>Document</strong>
          <p>{found.title}</p>
        </div>

        <div>
          <strong>Name</strong>
          <p>{found.name_on_document || "—"}</p>
        </div>

        <div>
          <strong>Document number</strong>
          <p>{found.document_number || "—"}</p>
        </div>

        <div>
          <strong>Found at</strong>
          <p>
            {typeof found.station === "object"
              ? found.station.name
              : "Selected station"}
          </p>
        </div>

        <div>
          <strong>Found on</strong>
          <p>{found.date_found || "—"}</p>
        </div>
      </div>

      <p className="muted">
        A possible match is not proof of ownership. The station officer will
        verify the document and your proof before release.
      </p>
    </section>
  );
}
