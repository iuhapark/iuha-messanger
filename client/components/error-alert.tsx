import { Alert } from "@heroui/react";

interface ErrorAlertProps {
  error: { code: number; type: string; message: string } | null;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;
  const color =
    error.code === 401 ? "warning" : error.code >= 500 ? "danger" : "primary";

  return (
    <Alert color={color} title={error.message} className="my-3" />
  );
}