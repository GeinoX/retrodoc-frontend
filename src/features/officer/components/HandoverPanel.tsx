import { useState } from "react";
import { useRelease } from "../hooks/useRelease";
import { useRefuse } from "../hooks/useRefuse";

export default function HandoverPanel() {
  const [collectionCode, setCollectionCode] = useState("");
  const [proofShown, setProofShown] = useState("");
  const [note, setNote] = useState("");

  const release = useRelease();
  const refuse = useRefuse();

  function releaseDocument(event: React.FormEvent) {
    event.preventDefault();

    release.mutate({
      collection_code: collectionCode.trim().toUpperCase(),
      proof_shown: proofShown,
    });
  }

  function refuseDocument(event: React.FormEvent) {
    event.preventDefault();

    refuse.mutate({
      collection_code: collectionCode.trim().toUpperCase(),
      proof_shown: proofShown,
      note,
    });
  }

  return (
    <section className="card form-stack">
      <div>
        <h2>Collection / handover</h2>
        <p className="muted">
          Verify the claimant's identity and supporting proof before releasing a
          document.
        </p>
      </div>

      <div className="form-group">
        <label>Collection code</label>
        <input
          value={collectionCode}
          onChange={(event) =>
            setCollectionCode(event.target.value.toUpperCase())
          }
          placeholder="Enter collection code"
        />
      </div>

      <div className="form-group">
        <label>Proof shown</label>
        <textarea
          value={proofShown}
          onChange={(event) => setProofShown(event.target.value)}
          placeholder="Describe the proof presented"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Note</label>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Optional note"
          rows={3}
        />
      </div>

      {(release.isSuccess || refuse.isSuccess) && (
        <p className="success-message">
          {release.data?.detail || refuse.data?.detail}
        </p>
      )}

      {(release.isError || refuse.isError) && (
        <p className="form-error">
          The operation could not be completed. Check the code and try again.
        </p>
      )}

      <div className="actions">
        <button
          type="button"
          className="button primary"
          disabled={release.isPending || !collectionCode || !proofShown}
          onClick={() => {
            release.mutate({
              collection_code: collectionCode.trim().toUpperCase(),
              proof_shown: proofShown,
            });
          }}
        >
          {release.isPending ? "Releasing..." : "Verify and release"}
        </button>

        <button
          type="button"
          className="button secondary"
          disabled={refuse.isPending || !collectionCode}
          onClick={refuseDocument}
        >
          {refuse.isPending ? "Refusing..." : "Refuse handover"}
        </button>
      </div>
    </section>
  );
}
