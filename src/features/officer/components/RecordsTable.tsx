import { useRecords } from "../hooks/useRecords";

export default function RecordsTable() {
  const { data: records = [], isLoading, isError } = useRecords();

  if (isLoading) {
    return <p>Loading records...</p>;
  }

  if (isError) {
    return <p className="form-error">Unable to load handover records.</p>;
  }

  if (records.length === 0) {
    return (
      <div className="card">
        <h2>No handover records</h2>
        <p className="muted">
          Completed and refused handover attempts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="card table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Result</th>
            <th>Proof</th>
            <th>Note</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.created_at).toLocaleString()}</td>

              <td>
                <span className="status-badge">{record.result}</span>
              </td>

              <td>{record.proof_shown || "—"}</td>

              <td>{record.note || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
