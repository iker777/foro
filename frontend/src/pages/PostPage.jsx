import { useParams } from "react-router-dom";

export const PostPage = () => {
  const { postId } = useParams();
  return (
    <div>
      <p className="text-white">{postId}</p>
    </div>
  );
};
