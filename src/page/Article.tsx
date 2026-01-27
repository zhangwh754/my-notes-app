import { useParams } from "react-router";
import Tiptap from "../components/RichEditor/Tiptap";

export default function Detail() {
  const { articleId } = useParams<{ categoryId?: string; articleId?: string }>();

  return <div className="p-5">{articleId && <Tiptap id={articleId} />}</div>;
}
