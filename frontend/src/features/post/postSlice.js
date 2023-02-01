import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a neque felis. Donec ac mauris ac leo venenatis faucibus quis ac velit. Cras pretium, orci vel malesuada efficitur, orci est vestibulum elit, ac ultricies diam dolor id quam. Aliquam erat volutpat. Maecenas efficitur augue felis, sed cursus quam tempor sit amet. Proin sagittis, nunc nec tincidunt lacinia, metus justo convallis justo, eget congue odio sem sit amet orci. Suspendisse nec ex nec dolor rhoncus aliquam ac a nisi. Praesent ut nibh quam.",
    userId: 1,
    username: "Obama",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a neque felis. Donec ac mauris ac leo venenatis faucibus quis ac velit. Cras pretium, orci vel malesuada efficitur, orci est vestibulum elit, ac ultricies diam dolor id quam. Aliquam erat volutpat. Maecenas efficitur augue felis, sed cursus quam tempor sit amet. Proin sagittis, nunc nec tincidunt lacinia, metus justo convallis justo, eget congue odio sem sit amet orci. Suspendisse nec ex nec dolor rhoncus aliquam ac a nisi. Praesent ut nibh quam.",
    userId: 2,
    username: "Howard",
  },
  {
    id: 3,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a neque felis. Donec ac mauris ac leo venenatis faucibus quis ac velit. Cras pretium, orci vel malesuada efficitur, orci est vestibulum elit, ac ultricies diam dolor id quam. Aliquam erat volutpat. Maecenas efficitur augue felis, sed cursus quam tempor sit amet. Proin sagittis, nunc nec tincidunt lacinia, metus justo convallis justo, eget congue odio sem sit amet orci. Suspendisse nec ex nec dolor rhoncus aliquam ac a nisi. Praesent ut nibh quam.",
    userId: 3,
    username: "Nathy",
  },
];

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare(post) {
        const userid = JSON.parse(localStorage.getItem("user")).id;
        return {
          payload: {
            content: post.content,
            userid: userid,
            visibility: post.visibility,
            can_be_commented: post.can_be_commented,
            id: nanoid(),
          },
        };
      },
    },
  },
});

export default postSlice.reducer;
export const { addPost } = postSlice.actions;