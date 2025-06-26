'use client'; 

import { Button } from "@heroui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className='flex items-center justify-center h-full'>
      <div className='inline-block text-center justify-center'>
      <h1>Something went wrong!</h1>
      <Button
        className={'btn-primary mt-14 self-center'}
        onPress={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
    </section>
  );
}
