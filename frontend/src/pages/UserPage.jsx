import { useParams } from "react-router-dom";

export const UserPage = () => {
  const {username} = useParams();
  return (
    <div>
      <p>UserPage</p>
    </div>
  );
};
