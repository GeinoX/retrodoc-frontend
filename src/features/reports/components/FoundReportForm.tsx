import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFound } from "../hooks/useCreateFound";
import { useDocumentCategories } from "../hooks/useDocumentCategories";
import { useRegions } from "../../stations/hooks/useStations";
import StationPicker from "../../stations/components/StationPicker";

export default function FoundReportForm() {
  const navigate = useNavigate();
  const mutation = useCreateFound();
  const { data: categories = [] } = useDocumentCategories();
  const { data: regions = [] } = useRegions();

  const [form, setForm] = useState({
    station: "",
    category: "",
    title: "",
    name_on_document: "",
    document_number: "",
    date_of_birth: "",
    issue_date: "",
    issuing_organisation: "",
    region: "",
    place_detail: "",
    date_found: new Date().toISOString().slice(0, 10),
  });

  function update(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();

    mutation.mutate(
      {
        station: Number(form.station),
        category: Number(form.category),
        title: form.title,
        name_on_document: form.name_on_document,
        document_number: form.document_number,
        date_of_birth: form.date_of_birth || null,
        issue_date: form.issue_date || null,
        issuing_organisation: form.issuing_organisation,
        region: form.region ? Number(form.region) : null,
        place_detail: form.place_detail,
        date_found: form.date_found,
      },
      {
        onSuccess: () => navigate("/dashboard/reports"),
      },
    );
  }

  return (
    <form className="card form-stack" onSubmit={submit}>
      <div>
        <h1>Report a found document</h1>
        <p className="muted">
          Tell us about the document and select the station where you will drop
          it off.
        </p>
      </div>

      <StationPicker
        value={form.station}
        onChange={(value) => update("station", value)}
      />

      <div className="form-group">
        <label>Document category</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories
            .filter((category) => category.is_active)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_en}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Document title</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. National ID card"
          required
        />
      </div>

      <div className="form-group">
        <label>Name on document</label>
        <input
          value={form.name_on_document}
          onChange={(e) => update("name_on_document", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Document number</label>
        <input
          value={form.document_number}
          onChange={(e) => update("document_number", e.target.value)}
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Date of birth</label>
          <input
            type="date"
            value={form.date_of_birth}
            onChange={(e) => update("date_of_birth", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Issue date</label>
          <input
            type="date"
            value={form.issue_date}
            onChange={(e) => update("issue_date", e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Issuing organisation</label>
        <input
          value={form.issuing_organisation}
          onChange={(e) => update("issuing_organisation", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Region</label>
        <select
          value={form.region}
          onChange={(e) => update("region", e.target.value)}
        >
          <option value="">Select region</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name_en}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Where was it found?</label>
        <input
          value={form.place_detail}
          onChange={(e) => update("place_detail", e.target.value)}
          placeholder="Optional details"
        />
      </div>

      <div className="form-group">
        <label>Date found</label>
        <input
          type="date"
          value={form.date_found}
          onChange={(e) => update("date_found", e.target.value)}
          required
        />
      </div>

      {mutation.isError && (
        <p className="form-error">
          Unable to submit the report. Please check your information.
        </p>
      )}

      <button
        className="button primary"
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Submitting..." : "Submit found report"}
      </button>
    </form>
  );
}
