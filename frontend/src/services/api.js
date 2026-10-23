
const API_BASE_URL = "http://127.0.0.1:5000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json();
}

export async function getRiskData() {
  const response = await fetch(`${API_BASE_URL}/api/risk`);

  if (!response.ok) {
    throw new Error("Failed to fetch risk data");
  }

  return response.json();
}
