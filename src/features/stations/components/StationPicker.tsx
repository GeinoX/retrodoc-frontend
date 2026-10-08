import { useStations } from "../hooks/useStations";
import type { Station } from "../types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function StationPicker({ value, onChange, error }: Props) {
  const { data: stations = [], isLoading, isError } = useStations();

  return (
    <div className="form-group">
      <label htmlFor="station">Station</label>

      <select
        id="station"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={isLoading}
      >
        <option value="">
          {isLoading ? "Loading stations..." : "Select a station"}
        </option>

        {stations
          .filter((station: Station) => station.is_active)
          .map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
      </select>

      {isError && <p className="form-error">Unable to load stations.</p>}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
