import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          username: email,
          phoneNumber: phone || null,
          password,
        });
      }

      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        username: email,
        password,
      });
      const accessToken = response.data.accessToken;
      if (!accessToken) throw new Error("The server did not return an access token");

      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      toast.success(currentState === "Sign Up" ? "Account created" : "Welcome back");
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message;
      toast.error(typeof message === "string" ? message : "Unable to complete your request");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Phone Number (optional)"
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
          />
        </>
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email address"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        required
      />
      <div className="w-full flex justify-end text-sm mt-[-8px]">
        <p
          className="cursor-pointer"
          onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")}
        >
          {currentState === "Login" ? "Create Account" : "Login Here"}
        </p>
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
