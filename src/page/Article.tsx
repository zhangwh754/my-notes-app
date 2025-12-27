import { useParams } from "react-router";
import Tiptap from "../components/RichEditor/Tiptap";

export default function Detail() {
  const params = useParams<{ id: string }>();

  return (
    <div className="p-5">
      <Tiptap id={params.id} />
    </div>
  );
}
