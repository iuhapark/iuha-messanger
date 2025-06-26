import { addToast } from "@heroui/react";
import { parseAPIError } from "../utils/error";
export const handleAPIError = (err: unknown) => {
  const error = parseAPIError(err);

  // 세션 만료 또는 인증 오류
  // if (error.type === 'UNAUTHORIZED') {
  //   addToast({
  //     title: 'Session expired.',
  //     description: 'Please sign in again.',
  //     icon: 'warning',
  //   });
  //   return;
  // }

  // 서버 꺼짐 등 네트워크 연결 불가
  if (error.type === 'NO_SERVER') {
    addToast({
      title: 'No Server.',
      description: 'Cannot connect to the server. Please try again later.',
      icon: 'warning',
    });
    return;
  }

  // 일반 에러
  addToast({
    title: 'Error occurred.',
    description: error.message,
    icon: 'error',
  });
};