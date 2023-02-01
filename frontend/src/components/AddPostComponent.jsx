import { useState } from "react";
import plusIcon from "../assets/icons/plus-solid.svg";
import xIcon from "../assets/icons/xIcon.svg"
import { useDispatch } from "react-redux";
import { addPost } from "../features/post/postSlice";

export const AddPostComponent = () => {
  const [editingPost, setEditingPost] = useState(false);
  const [ post, setPost ] = useState({
    content: "",
    visibility: "everyone",
    can_be_commented: "false"
  })
  const dispatch = useDispatch();

  const handleOnChange = (e) =>{
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
    console.log(post)
  };
  const handleOnCheck = (e) =>{
    setPost({
      ...post,
      [e.target.name]: `${e.target.checked}`
    });
  };
  
  const postPost = () => {
    dispatch(addPost(post));
    setPost({
      content: "",
      visibility: "everyone",
      can_be_commented: "false",
    });
    setEditingPost(false);
  }

  return (
    <>
      {editingPost ? (
        <div
          id="outsideContainer"
          onClick={(e) =>
            e.target.id == "outsideContainer" && setEditingPost(false)
          }
          className="fixed w-full h-full top-0 flex justify-center items-center z-20 backdrop-blur"
        >
          <form className="bg-zinc-900 h-4/5 border-white border-2 w-full md:w-5/6 md:h-fit md:px-48 md:py-28 rounded relative md:mt-20 flex flex-col justify-center items-center ">
            <h1 className="text-white uppercase text-center p-2 text-lg">
              What are you thinking about?
            </h1>
            <textarea
              className="w-4/5 mb-8 p-2 border-0 rounded bg-white bg-opacity-50 text-black placeholder:italic placeholder:text-slate-700 text-sm outline-0"
              rows="3"
              placeholder="Post content here..."
              name="content"
              onChange={handleOnChange}
            />
            <label className="text-white p-2 text-base">Post Visibility:</label>
            <div className="w-9/12">
              <input
                type="radio"
                name="visibility"
                value="onlyMembers"
                className="accent-cyan-500"
                onClick={handleOnChange}
              />
              <label className="text-white p-2 text-sm">Only members</label>
            </div>
            <div className="w-9/12 mb-2">
              <input
                type="radio"
                name="visibility"
                value="everyone"
                defaultChecked
                className="accent-cyan-500"
                onClick={handleOnChange}
              />
              <label className="text-white p-2 text-sm">Everyone</label>
            </div>
            <div className="w-9/12 mb-2">
              <input
                type="checkbox"
                name="can_be_commented"
                className="accent-cyan-500"
                value="true"
                onChange={handleOnCheck}
              />
              <label className="text-white p-2 text-sm">
                Can be commented?
              </label>
            </div>
            <input
              onClick={postPost}
              type="button"
              value="Send"
              className="bg-cyan-500 rounded w-4/5 text-white p-2 md:m-2 hover:bg-cyan-600 active:underline"
            />
            <div
              className="absolute top-0 right-0 rounded hover:bg-cyan-500 m-2"
              onClick={() => setEditingPost(false)}
            >
              <img src={xIcon} alt="x icon" className="w-10" />
            </div>
          </form>
        </div>
      ) : (
        <div
          onClick={() => setEditingPost(true)}
          className="fixed bottom-5 right-5 bg-white rounded-full p-4 hover:bg-cyan-500 active:bg-cyan-600"
        >
          <img src={plusIcon} alt="plus" className="w-5" />
        </div>
      )}
    </>
  );
};
