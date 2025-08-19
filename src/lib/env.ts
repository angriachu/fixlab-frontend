export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
  MOCK_AUTH: (import.meta.env.VITE_MOCK_AUTH ?? "1") === "1",
};
