import { useEffect, useState } from "react";

import { apiFetch } from "./api";

function App() {
  const [message, setMessage] = useState(null);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    apiFetch("/test/")
      .then((data) => setMessage(data.message))
      .catch((err) => setErreur(err.message));
  }, []);

  return (
    <div>
      <h1>RetroDoc</h1>
      {erreur && <p style={{ color: "red" }}>Erreur : {erreur}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {!message && !erreur && <p>Connexion au serveur...</p>}
    </div>
  );
}

export default App;