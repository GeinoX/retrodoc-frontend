import { useState } from "react";
import { useConfirmMatch } from "../hooks/useConfirmMatch";

interface Props {
  reference: string;
}

export default function ConfirmMatchButton({ reference }: Props) {
  const mutation = useConfirmMatch();
  const [collectionCode, setCollectionCode] = useState<string | null>(null);

  function handleConfirm() {
    mutation.mutate(reference, {
      onSuccess: (data) => {
        setCollectionCode(data.collection_code ?? null);
      },
    });
  }

  if (collectionCode) {
    return (
      <div className="card">
        <h3>Match confirmed</h3>

        <p>
          Take this code to the police station when collecting your document.
        </p>

        <div className="collection-code">{collectionCode}</div>

        <p className="muted">
          Keep this code private. The officer will use it to verify your
          collection.
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="button primary"
      disabled={mutation.isPending}
      onClick={handleConfirm}
    >
      {mutation.isPending ? "Confirming..." : "Yes, this is my document"}
    </button>
  );
}
