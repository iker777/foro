import { useNavigate } from "react-router-dom";
import InputTextComponent from "../components/InputTextComponent";
import { useEffect, useState } from "react";
import axios from "axios";

export const Register = () => {
  const [data, setData] = useState({
    mail: null,
    username: null,
    passwordA: null,
    passwordB: null, 
  })
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
      return;
    }
  });
  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const registerUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/register", data)
    .then((res) => {

      if (!res || !res.data) {
        alert("Error general");
        return;
      }
      if (!res.data.newUserRegisted) {
        alert(res.data.text);
        // window.location.reload();
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(
        `${res.data.user.mail} has sido registrado con éxito, estás dentro de la aplicación`
      );
      window.location.href = "/";
      return;
    }
  )
  };
  return (
    <div className="absolute w-full h-screen bg-zinc-900 pt-32 flex justify-start flex-col items-center">
      <h1 className="text-lg font-bold tracking-wide uppercase m-5 text-white">
        Register
      </h1>
      <form className="flex flex-col justify-center items-center p-5 bg-white bg-opacity-30 rounded md:w-96">
        <InputTextComponent
          type="text"
          placeholder="Email..."
          name="mail"
          handleOnChange={handleOnChange}
        />
        <InputTextComponent
          type="text"
          placeholder="Your Username..."
          name="username"
          handleOnChange={handleOnChange}
        />
        <InputTextComponent
          type="password"
          placeholder="Password..."
          name="passwordA"
          handleOnChange={handleOnChange}
        />
        <InputTextComponent
          type="password"
          placeholder="Repeat the password..."
          name="passwordB"
          handleOnChange={handleOnChange}
        />
        <input
          onClick={registerUser}
          type="button"
          value="Send"
          className="bg-cyan-500 rounded w-full text-white p-2 m-2 hover:bg-cyan-600 active:underline"
        />
      </form>
      <span
        onClick={() => navigate("/login")}
        className="text-white hover:underline m-5"
      >
        Have you already had an account?
      </span>
    </div>
  );
};
