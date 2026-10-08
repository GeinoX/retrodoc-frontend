import type { Station } from "../types";

interface Props {
  station: Station;
  regionName?: string;
}

export default function StationInfoCard({ station, regionName }: Props) {
  return (
    <article className="card">
      <div className="card-header">
        <div>
          <h3>{station.name}</h3>
          {regionName && <p className="muted">{regionName}</p>}
        </div>

        <span className={`status-badge ${station.is_active ? "success" : ""}`}>
          {station.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="card-body">
        <p>
          <strong>Address:</strong> {station.address}
        </p>

        {station.phone && (
          <p>
            <strong>Phone:</strong> {station.phone}
          </p>
        )}

        {station.opening_hours && (
          <p>
            <strong>Opening hours:</strong> {station.opening_hours}
          </p>
        )}
      </div>
    </article>
  );
}
