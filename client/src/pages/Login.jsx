import React, { useContext, useEffect, useState, useRef } from "react";
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
  const [loginContact, setLoginContact] = useState(""); // for login only
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  

  useEffect(() => {
    if (
      currentState === "Sign Up" &&
      typeof window !== "undefined" &&
      !window.recaptchaVerifier &&
      document.getElementById("recaptcha-container") &&
      auth
    ) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {},
          },
          auth
        );
        window.recaptchaVerifier.render();
      } catch (err) {
        console.error("RecaptchaVerifier error:", err);
      }
    }
  }, [currentState, auth]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        if (!/^\d{10}$/.test(phone)) {
          toast.error("Enter a valid 10-digit phone number");
          return;
        }
        if (!otpVerified) {
          toast.error("Please verify your phone number with OTP.");
          return;
        }
        const payload = { name, email, phone, password };
        const response = await axios.post(backendUrl + "/api/user/register", payload);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Login: allow email or phone
        const isPhone = /^\d{10,}$/.test(loginContact);
        const isEmail = loginContact.includes("@") && loginContact.includes(".");
        const loginData = { password };
        if (isPhone) loginData.phone = loginContact;
        else if (isEmail) loginData.email = loginContact;
        else {
          toast.error("Enter a valid email or phone number");
          return;
        }
        const response = await axios.post(backendUrl + "/api/user/login", loginData);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Firebase OTP logic
  const sendOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    try {
      // Ensure recaptchaVerifier exists
      if (!window.recaptchaVerifier) {
        toast.error("reCAPTCHA not initialized. Please reload the page.");
        return;
      }
      const appVerifier = window.recaptchaVerifier;
      // Format phone number to E.164
      const formattedPhone = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success("OTP sent to your phone");
    } catch (err) {
      toast.error("Failed to send OTP: " + err.message);
      console.error(err);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || !confirmationResult) {
      toast.error("Enter the OTP sent to your phone");
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
      toast.success("Phone number verified!");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  useEffect(() => {
    if(token) {
      navigate("/")
    }
  }, [token]) 

  console.log('auth:', auth); // Should not be undefined

  return (
    <>
      {/* Place this outside your form or at the top-level of your component */}
      <div id="recaptcha-container"></div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Sign Up" ? (
          <>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-800"
                  placeholder="Phone Number"
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                  required
                  maxLength={10}
                />
                {/^\d{10}$/.test(phone) && (
                  <button
                    className="bg-gray-800 text-white px-4 py-2 text-sm"
                    onClick={sendOtp}
                    disabled={otpSent && !otpVerified}
                  >
                    {otpSent && !otpVerified ? "OTP Sent" : "Send OTP"}
                  </button>
                )}
              </div>
              {otpSent && !otpVerified && (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                  />
                  <button
                    className="bg-green-700 text-white px-4 py-2 text-sm"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Email or Phone Number"
              onChange={e => setLoginContact(e.target.value)}
              value={loginContact}
              required
            />
          </>
        )}
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password?</p>
          {currentState === "Login" ? (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create Account
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login Here
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default Login;
