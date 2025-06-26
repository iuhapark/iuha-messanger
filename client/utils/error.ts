import axios, { AxiosError } from "axios";

export interface APIError {
  code: number;
  type: string;
  message: string;
}

export const parseAPIError = (err: unknown): APIError => {
  if (axios.isAxiosError(err)) {
    // 서버가 꺼졌거나 연결 자체가 실패했을 때
    if (!err.response) {
      if (err.code === 'ECONNABORTED') {
        return {
          code: 408,
          type: "TIMEOUT",
          message: "The request timed out. Please try again later.",
        };
      }

      return {
        code: 503,
        type: "NO_SERVER",
        message: "Cannot connect to the server. Please try again later.",
      };
    }

    const { code, type, message } = err.response.data || {};
    const status = err.response.status;
    // 세션 만료 (예: 401, 403)
    // if (status === 401 || status === 403) {
    //   return {
    //     code: status,
    //     type: "UNAUTHORIZED",
    //     message: "Session expired. Please sign in again.",
    //   };
    // }

    return {
      code: code ?? status ?? 500,
      type: type ?? "UNKNOWN",
      message: message ?? "An unknown server error occurred.",
    };
  }

  return {
    code: 500,
    type: "UNKNOWN",
    message: "A network error occurred.",
  };
};