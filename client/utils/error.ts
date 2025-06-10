import axios, { AxiosError } from "axios";

export interface APIError {
  code: number;
  type: string;
  message: string;
}

export const parseAPIError = (err: unknown): APIError => {
  if (axios.isAxiosError(err) && err.response) {
    const { code, type, message } = err.response.data || {};
    return {
      code: code ?? 500,
      type: type ?? "UNKNOWN",
      message: message ?? "An unknown error occurred.",
    };
  }
  return {
    code: 500,
    type: "UNKNOWN",
    message: "A network error occurred.",
  };
};