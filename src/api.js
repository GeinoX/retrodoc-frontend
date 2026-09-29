const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(chemin, options = {}) {
  const reponse = await fetch(`${BASE_URL}${chemin}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!reponse.ok) {
    throw new ApiError(`Erreur API : ${reponse.status}`, reponse.status);
  }

  return reponse.json();
}