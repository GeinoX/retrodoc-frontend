import { useDeclineMatch } from "../hooks/useDeclineMatch";

interface Props {
  reference: string;
  onSuccess?: () => void;
}

export default function DeclineMatchButton({ reference, onSuccess }: Props) {
  const mutation = useDeclineMatch();

  function handleDecline() {
    mutation.mutate(reference, {
      onSuccess,
    });
  }

  return (
    <button
      type="button"
      className="button secondary"
      disabled={mutation.isPending}
      onClick={handleDecline}
    >
      {mutation.isPending ? "Declining..." : "No, this isn't mine"}
    </button>
  );
}
