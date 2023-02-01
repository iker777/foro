import xIcon from '../assets/icons/xIcon.svg';
import userIcon from '../assets/icons/userIcon.svg';
import cameraIcon from '../assets/icons/camera.svg';
import plusIcon from '../assets/icons/plus-white.svg';
import InputTextComponent from '../components/InputTextComponent';
import { useState } from 'react';
import axios from 'axios';

export const UserConfigPage = ({setUserConfig}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [deleteActivation, setDeleteActivation] = useState(false)
  const [data, setData] = useState({
      mail: user.mail,
      username: user.username,
      passwordA: user.password,
      passwordB: user.password,
      name: user.name || null,
      bio: user.bio || null
    });
    const handleOnChange = e => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };

    const uploadUser = (e) => {
      e.preventDefault();
      axios.post("http://localhost:3030/uploadUser", data)
        .then(res => {
          if (!res || !res.data) {
            alert("Error general");
            return;
          }
          if(res.data.error){
            alert(res.data.text);
            return;
          }
          alert(res.data.text);
          localStorage.setItem("user", JSON.stringify(res.data.userUpdated));
        })
    }

    const deleteAccount = () => {
      axios.post("http://localhost:3030/deleteAccount", data)
        .then(res => {
          if (!res || !res.data) {
            alert("Error general");
            return;
          }
          alert(res.data.text);
          if(!res.data.error){
            localStorage.removeItem("user");
            window.location.href = "/register";
          }
        })
    };

  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur z-10 flex justify-center items-center">
      <div className="w-full md:mx-28 md:py-6  border border-white bg-zinc-900 flex flex-col items-center justify-start relative">
        <div
          className="absolute top-4 right-0  md:right-4 rounded hover:bg-cyan-500 m-2"
          onClick={() => setUserConfig(false)}
        >
          <img src={xIcon} alt="x icon" className="w-10" />
        </div>
        <h1 className="text-white text-lg m-6 uppercase">User settings</h1>
        <div className="m-10 relative w-fit hover:bg-white hover:bg-opacity-10 rounded">
          <img src={userIcon} className="w-28" />
          <div className="w-fit p-3  absolute top-4 left-4">
            <img src={cameraIcon} className="w-14" />
            <img
              src={plusIcon}
              className="w-6  rounded-lg absolute top-0 right-0"
            />
          </div>
        </div>
        <div className="w-4/5 justify-self-center">
          <h2 className="text-white">Change your visible data</h2>
          {user.name ? (
            <InputTextComponent
              name="name"
              type="text"
              placeholder={user.name}
              handleOnChange={handleOnChange}
            />
          ) : (
            <InputTextComponent
              name="name"
              type="text"
              placeholder="Your name here..."
              handleOnChange={handleOnChange}
            />
          )}
        </div>
        <div className="w-4/5 justify-self-center">
          {user.bio ? (
            <InputTextComponent
              name="bio"
              type="text"
              placeholder={user.bio}
              handleOnChange={handleOnChange}
            />
          ) : (
            <InputTextComponent
              name="bio"
              type="text"
              placeholder="Your bio here..."
              handleOnChange={handleOnChange}
            />
          )}
        </div>
        <div className="w-4/5 justify-self-center mt-5">
          <h2 className="text-white">Restart password</h2>
          <InputTextComponent
            placeholder="Restart your password"
            name="passwordA"
            type="password"
            handleOnChange={handleOnChange}
          />
          <InputTextComponent
            placeholder="Repeat your new password"
            name="passwordB"
            type="password"
            handleOnChange={handleOnChange}
          />
        </div>
        <input
          onClick={uploadUser}
          type="button"
          value="Save"
          className="bg-cyan-500 w-4/5 rounded text-white p-2 mx-2 mt-6 hover:bg-cyan-600 active:underline"
        />
        <input
          onClick={() => setDeleteActivation(true)}
          type="button"
          value="Delete account"
          className="border-2 border-red-700 w-4/5 rounded text-red-500 p-2 mx-2 my-2 active:underline hover:text-white hover:bg-red-700"
        />
        {deleteActivation && (
          <div className="absolute top-1/3 left-0 w-full md:left-1/4 md:w-3/6 h-72 bg-zinc-900 border border-white rounded flex flex-col justify-center items-center">
            <p className="text-white text-center p-2">
              Are you sure you want to delete your account {data.username}? This action is not
              reversible
            </p>
            <div className='flex justify-center items-center'>
              <button 
                className="border-2 border-red-700 m-5 w-24 rounded text-red-500 py-2 px-4 active:underline hover:text-white hover:bg-red-700"
                onClick={deleteAccount}
              >
                Yes
              </button>
              <button 
                className="bg-cyan-500 m-5 rounded w-24 text-white py-2 px-4 hover:bg-cyan-600 active:underline" 
                onClick={() => setDeleteActivation(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
