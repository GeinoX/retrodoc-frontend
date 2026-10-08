import { useState } from "react";
import { useConfirmDropOff } from "../hooks/useConfirmDropOff";

export default function ConfirmDropOffForm() {
  const [code, setCode] = useState("");
  const mutation = useConfirmDropOff();

  function submit(event: React.FormEvent) {
    event.preventDefault();

    mutation.mutate(code.trim().toUpperCase(), {
      onSuccess: () => {
        setCode("");
      },
    });
  }

  return (
    <form className="card form-stack" onSubmit={submit}>
      <div>
        <h2>Confirm document drop-off</h2>
        <p className="muted">
          Enter the code provided by the person who reported the found document.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="drop-off-code">Drop-off code</label>

        <input
          id="drop-off-code"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="Enter drop-off code"
          required
        />
      </div>

      {mutation.isSuccess && (
        <p className="success-message">{mutation.data.detail}</p>
      )}

      {mutation.isError && (
        <p className="form-error">
          Unable to confirm this drop-off. Check the code and report status.
        </p>
      )}

      <button
        type="submit"
        className="button primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Confirming..." : "Confirm drop-off"}
      </button>
    </form>
  );
}
