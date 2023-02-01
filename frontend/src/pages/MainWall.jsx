
import { AddPostComponent } from "../components/AddPostComponent"
import { Posts } from "../components/Posts"

export const MainWall = () => {
  
  return (
    <div className="flex h-full justify-center relative">
      <div className=" border border-white border-1  w-full lg:w-6/12">
        <Posts />
      </div>
      <AddPostComponent />
    </div>
  );
}