import { useStations } from "../../stations/hooks/useStations";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StationSearch({ value, onChange }: Props) {
  const { data: stations = [], isLoading } = useStations();

  return (
    <div className="form-group">
      <label htmlFor="station-search">Station</label>

      <input
        id="station-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search station..."
      />

      {!isLoading && value && (
        <div className="search-results">
          {stations
            .filter((station) =>
              station.name.toLowerCase().includes(value.toLowerCase()),
            )
            .map((station) => (
              <div key={station.id} className="search-result">
                <strong>{station.name}</strong>
                <span>{station.address}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
