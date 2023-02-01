import userIcon from "./../assets/icons/userIcon.svg";
import { useNavigate } from "react-router-dom";
import { LikeIcon } from "../assets/icons/like";
import { ChatIcon } from "../assets/icons/chat";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { howLongItWas } from "../helpers/howLongItWas";

export const Posts = () => {
  const iconContainer = useRef(null);
  const postContainer = useRef(null);
  const navigate = useNavigate();

  // useSelector
  const posts = useSelector(state => state.posts)

  return (
    <>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            ref={postContainer}
            onClick={(e) =>
              e.target.id !== "icon" && navigate(`/post/${post.id}`)
            }
            className="border border-1 border-white w-full p-7 flex flex-col bg-white bg-opacity-0 hover:bg-opacity-5"
          >
            <div className="flex mb-5 items-center">
              <img className="w-10 mr-3" src={userIcon} />
              <p className="text-white">{post.username}</p>
              <p className="text-xs self-end text-gray-200 italic">
                {howLongItWas("2023-01-29T13:05:52.000Z")}h ago
              </p>
            </div>
            <p className="text-white m-5">{post.content}</p>
            <div className="flex w-fit">
              <LikeIcon />
              <ChatIcon />
            </div>
          </div>
        );
      })}
    </>
  );
};
