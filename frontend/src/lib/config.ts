const fetchHeaders = new Headers();

fetchHeaders.append("Content-Type", "application/json");

const fetchBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export { fetchHeaders, fetchBackendUrl };
