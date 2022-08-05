import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";
import WebHeader from "./web/header";
import axios from "axios";
import BasicButton from "../components/buttons/basic-button";
import StripeForm from "../payment/pay-button";
import { API_BASE } from "../Utils/helpers";

export default function Register({ type, action, book }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [emailConfirmationMode, setEmailConfirmationMode] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const naviagte = useNavigate();

  const register = () => {
    setIsAuthenticating(true);
    const url = API_BASE + "/api/register";
    axios
      .post(url, {
        name: firstName + " " + lastName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
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
                toast("Registration Successful", { type: "success" });
                // handleEmailConfirmation();
                setRegisterSuccess(true);
                // action();
              } else {
                toast("Error", { type: "error" });
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

  const handleFirstNameChange = (e) => {
    setFirstName(e);
  };

  const handleLastNameChange = (e) => {
    setLastName(e);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirm(e);
  };

  const handleEmailConfirmation = () => {
    setEmailConfirmationMode((prev) => !prev);
  };

  const handleRegistration = () => {
    register();
  };

  return (
    <>
      {!emailConfirmationMode && (
        <div class="container px-6 mx-auto">
          <br />
          <div class="flex flex-col text-center md:text-left justify-evenly items-center">
            <div class="flex flex-col w-full items-center">
              <h1 class="text-2xl text-gray-800 font-bold my-2">Register</h1>
              <p class="mx-auto md:mx-0 text-gray-500">
                Please fill out the form
              </p>
            </div>
            <div
              className={`w-full ${
                type !== "modal" ? "md:w-6/12 " : "md:w-10/12 "
              }${
                type !== "modal" ? "lg:w-5/12" : "lg:w-10/12"
              } mx-auto md:mx-0`}
            >
              <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                {/* <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
                Sigin
              </h2> */}
                <form action="" class="w-full">
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="username" class="text-gray-500 mb-2">
                      First Name
                    </label>
                    <input
                      onChange={(e) => handleFirstNameChange(e.target.value)}
                      type="text"
                      id="username"
                      value={firstName}
                      placeholder="Please insert your First Name"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="username" class="text-gray-500 mb-2">
                      Last Name
                    </label>
                    <input
                      onChange={(e) => handleLastNameChange(e.target.value)}
                      type="text"
                      id="username"
                      value={lastName}
                      placeholder="Please insert your Last Name"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="username" class="text-gray-500 mb-2">
                      Email
                    </label>
                    <input
                      onChange={(e) => handleEmailChange(e.target.value)}
                      type="text"
                      id="username"
                      value={email}
                      placeholder="Please insert your email"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
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
                      value={password}
                      placeholder="Please insert your password"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="password" class="text-gray-500 mb-2">
                      Confirm Password
                    </label>
                    <input
                      onChange={(e) =>
                        handlePasswordConfirmationChange(e.target.value)
                      }
                      type="password"
                      id="password"
                      value={passwordConfirm}
                      placeholder="Please insert your password"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="button" class="flex flex-col w-full my-5">
                    <button
                      disabled={
                        isAuthenticating ||
                        (!firstName && !lastName && !email && !password)
                      }
                      onClick={() => handleEmailConfirmation()}
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
                          <div class="font-bold">Next</div>
                        </div>
                      ) : (
                        "Creating Account..."
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
      )}

      {emailConfirmationMode && !registerSuccess && (
        <div class="container px-6">
          <br />
          <div class="flex flex-col text-center md:text-left justify-evenly items-center">
            <div class="w-full text-center">
              <p class="text-lg text-gray-800 font-bold my-2">
                Make sure the email{" "}
                <span className="text-green-500">{email}</span> is spelt
                correctly?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <BasicButton
                disabled={isAuthenticating}
                title={`Go Back`}
                classes="w-full"
                handleClick={handleEmailConfirmation}
              />
              <BasicButton
                disabled={isAuthenticating}
                title={`${isAuthenticating ? "Registering..." : "Register"}`}
                classes="w-full"
                handleClick={handleRegistration}
              />
            </div>
          </div>
        </div>
      )}

      {registerSuccess && (
        <div class="container px-6">
          <br />
          <div class="flex flex-col text-center md:text-left justify-evenly items-center">
            <div class="w-full text-center">
              <h1 class="text-3xl text-gray-800 font-bold my-2 mb-4">
                Payment
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* <BasicButton
                title={`Go Back`}
                classes="w-full"
                handleClick={handleEmailConfirmation}
              /> */}
              <StripeForm book={book} action={action} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
