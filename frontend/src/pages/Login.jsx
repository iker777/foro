import { useNavigate } from "react-router-dom";
import InputTextComponent from "../components/InputTextComponent";
import { useEffect, useState } from "react";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    mail: null,
    username: null,
    password: null,
  });
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
      return;
    }
  });
  const handleOnChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const loginUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/login", data)
      .then((res) => {
        if(!res.data || !res){
          console.log("The request is not done...");
          return;
        }
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(`Welcome back ${res.data.user.username}!`)
        window.location.href = "/";
      })
  };
  return (
    <div className="absolute w-full h-screen bg-zinc-900 pt-32 flex justify-start flex-col items-center">
      <h1 className="text-lg font-bold tracking-wide uppercase m-5 text-white">
        Login
      </h1>
      <form className="flex flex-col justify-center items-center p-5 bg-white bg-opacity-30 rounded md:w-96">
        <InputTextComponent
          type="text"
          placeholder="Email..."
          name="mail"
          handleOnChange={handleOnChange}
        />
        <InputTextComponent
          type="password"
          placeholder="Password..."
          name="password"
          handleOnChange={handleOnChange}
        />
        <input
          onClick={loginUser}
          type="button"
          value="Send"
          className="bg-cyan-500 rounded w-full text-white p-2 m-2 hover:bg-cyan-600 active:underline"
        />
      </form>
      <span
        onClick={() => navigate("/register")}
        className="text-white hover:underline m-5"
      >
        Don't you have account?
      </span>
    </div>
  );
};
