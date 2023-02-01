import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainWall } from "./pages/MainWall";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserPage } from "./pages/UserPage";
import { PostPage } from "./pages/PostPage";
import { Navbar } from "./components/Navbar";

function App() {

  return (
    <div 
    className="App bg-zinc-900 flex flex-col min-h-screen" 
    >
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<MainWall />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            {/* Aquí va el nombre del usuario :/username */}
            <Route exact path="/userpage/:username" element={<UserPage />} />
            {/* Aquí va el Post ID */}
            <Route exact path="/post/:postId" element={<PostPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
