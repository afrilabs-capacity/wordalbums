import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import WebHeader from "./web/header";
import { isAdmin } from "../Utils/helpers";
import { isAuthUser, API_BASE } from "../Utils/helpers";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const naviagte = useNavigate();

  const login = () => {
    setIsAuthenticating(true);
    const url = API_BASE + "/api/login";
    axios
      .post(url, { email: email, password: password })
      .then((response) => {
        if (response.status == 200) {
          if (!response.data) {
            //   alertMe.show(result.message, { type: "error" });
          } else {
            if (response.data) {
              let user = response.data.data;
              if (user.roles && user.roles.length > 0) {
                localStorage.setItem("user", JSON.stringify(user));
                // localStorage.setItem("user_email", user.email);
                localStorage.setItem("token", response.data.access_token);
                // localStorage.setItem("roles", JSON.stringify(user.roles));
                toast("Welcome Back " + user.name, { type: "success" });
                if (isAdmin()) {
                  naviagte("/publishers");
                } else {
                  naviagte("/");
                }
              } else {
                toast("Unauthorized Access", { type: "error" });
                // alertMe.show("Unauthorized Access", { type: "error" });
              }
            }
          }
        }
        setIsAuthenticating(false);
      })
      .catch((error) => {
        toast(error.message, { type: "error" });
        setIsAuthenticating(false);
        console.error("There was an error!", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const handleLogin = () => {
    login();
  };

  useEffect(() => {
    if (isAuthUser()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      {" "}
      <WebHeader />
      <div class="container px-6 mx-auto">
        <br />
        <div class="flex flex-col text-center md:text-left justify-evenly items-center">
          <div class="flex flex-col w-full items-center">
            <div></div>
            <h1 class="text-2xl text-gray-800 font-bold my-2">Members Area</h1>
            <p class="w-5/12 mx-auto md:mx-0 text-gray-500"></p>
          </div>
          <div class="w-full md:w-6/12 lg:w-5/12 mx-auto md:mx-0">
            <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
                Sigin
              </h2>
              <form action="" class="w-full">
                <div id="input" class="flex flex-col w-full my-5">
                  <label for="username" class="text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    onChange={(e) => handleEmailChange(e.target.value)}
                    type="text"
                    id="username"
                    placeholder="Please insert your username"
                    class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" class="flex flex-col w-full my-5">
                  <label for="password" class="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Please insert your password"
                    class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="button" class="flex flex-col w-full my-5">
                  <button
                    disabled={isAuthenticating}
                    onClick={() => handleLogin()}
                    type="button"
                    class="w-full py-4 bg-blue-600 rounded-lg text-green-100"
                  >
                    {!isAuthenticating ? (
                      <div class="flex flex-row items-center justify-center">
                        <div class="mr-2">
                          <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                          </svg>
                        </div>
                        <div class="font-bold">Sigin</div>
                      </div>
                    ) : (
                      "Authenticating..."
                    )}
                  </button>
                  {/* <div class="flex justify-evenly mt-5">
                  <a
                    href="#"
                    class="w-full text-center font-medium text-gray-500"
                  >
                    Recover password!
                  </a>
                  <a
                    href="#"
                    class="w-full text-center font-medium text-gray-500"
                  >
                    Singup!
                  </a>
                </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
