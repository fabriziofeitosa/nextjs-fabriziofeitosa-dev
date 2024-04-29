"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="inline-block font-black text-4xl">
        Ops! Alguma coisa deu errado.
      </h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="inline-block border border-muted-foreground mt-8 p-4 rounded w-full"
      >
        Tentar novamente.
      </button>
    </div>
  );
}
