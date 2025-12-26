import type { ReactNode } from "react";
import { useParams } from "react-router";

export default function Detail({ children }: { children: ReactNode }) {
  const params = useParams<{ id: string }>();

  return (
    <>
      {children}:{params.id}
    </>
  );
}
