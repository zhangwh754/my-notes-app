import type { ReactNode } from "react";
import { useParams } from "react-router";
import Tiptap from "../components/Tiptap";

export default function Detail({ children }: { children: ReactNode }) {
  const params = useParams<{ id: string }>();

  return (
    <>
      <Tiptap />
    </>
  );
}
