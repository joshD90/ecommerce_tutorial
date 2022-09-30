import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjg1ZDlkZDNiM2FhOTEwNTRmOWExNCIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjQ1Mzc2MTMsImV4cCI6MTY2NDc5NjgxM30.4akr2edjn1w-yt5Dt-9MVwljOvk25GlJeJtc7rql_4E";
const ADMIN_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjg1ZDlkZDNiM2FhOTEwNTRmOWExNCIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjQ0NzE3MTEsImV4cCI6MTY2NDczMDkxMX0.pSBOuS1GvhIPuzKbuRH0_sfI3EBNNq9lh-JISQVOw1w";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${ADMIN_TOKEN}` },
});
