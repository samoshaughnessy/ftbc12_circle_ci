/*
 * Store BACKEND_URL as a constant so we can define it in 1 place.
 * We will need to dynamically set BACKEND_URL based on the value
 * of process.env.NODE_ENV when we wish to deploy to production.
 */

export const BACKEND_URL =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_API
    : "http://localhost:3000";
