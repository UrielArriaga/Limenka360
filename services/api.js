import axios from "axios";
export const ISPRODUCTION = process.env.ISPRODUCTION;
export const REDIRECT_URL = process.env.REDIRECT_URL;

export const URL = ISPRODUCTION === "true" ? "https://serviceapi.limenka360.com/" : "https://apidev.limenka360.com/";

export const URLSOCKET = ISPRODUCTION === "true" ? "https://crmt.limenka360.com" : "https://apidev.limenka360.com/";

export const PRODUCTIONMODE = ISPRODUCTION === "true" ? true : false;
export const URL_SPACE = ISPRODUCTION
  ? "https://limenka.sfo3.digitaloceanspaces.com/"
  : "https://crm-desarrollo.sfo3.digitaloceanspaces.com/";
const url_files = ISPRODUCTION
  ? "https://limenka.sfo3.digitaloceanspaces.com/"
  : "https://crm-desarrollo.sfo3.digitaloceanspaces.com/";
const url_filesCompanies = ISPRODUCTION
  ? "https://limenka.sfo3.digitaloceanspaces.com/"
  : "https://crm-desarrollo.sfo3.digitaloceanspaces.com/";

const api = axios.create({
  baseURL: URL,
  // Uso de ngrok
  // headers: {
  //   "ngrok-skip-browser-warning": "any",
  // },
});

export const api2 = axios.create({
  baseURL: URL,
  headers: {
    "X-CVJOBS-Application-Id": "IELmvcRSsnrUS9ern9DUR",
    "X-CVJOBS-REST-API-Key": "IELARcRSsnrUS9ernRRUR",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgzYjRlM2E1MjRmZDRkZDA2MWVhNTQiLCJyb2xlIjp7IlVzdWFyaW8iOiI2MjZhYWE3ZmVkZjIxMDFkNjQ3YWFkNDkifSwiaWF0IjoxNjYzMTAxMDExLCJleHAiOjE2NjMxMDE0MzF9.NxzV6m7i6up_guz-wsSPucq3b1x-TXwfXgOW7zUEpqI",
  },
});

const PHASEIDPRODUCTIONMODE = ISPRODUCTION ? "X0ubhJNnK273s1yfx5WnmBaX" : "qJzenUoCQ3amgoRZihcsHWus";
const ACTIONIDPRODUCTIONMODE = ISPRODUCTION ? "62hHzqoSCj0452fT1sUAEzba" : "62hHzqoSCj0452fT1sUAEzba";

export { api, url_files, url_filesCompanies, PHASEIDPRODUCTIONMODE, ACTIONIDPRODUCTIONMODE };
