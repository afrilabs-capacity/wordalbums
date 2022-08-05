import { useParams, useNavigate, Link } from "react-router-dom";
import { isAuthUser, isAdmin } from "../../Utils/helpers";
import { useState } from "react";
export default function WebHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const naviagte = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("platform");
    naviagte("/login");
  };
  return (
    <div class="relative bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex flex-col md:flex-row justify-between items-center  py-6 md:justify-start md:space-x-10">
          <div class="justify-start lg:w-0 lg:flex-1 m-2 hidden md:flex">
            <a href="#">
              <span class="sr-only">Workflow</span>
              <span>LOGO</span>
              {/* <img
                class="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              /> */}
            </a>
          </div>
          <div class="flex md:hidden flex-row justify-between w-full">
            <button
              onClick={() => setShowMobileMenu((showMenu) => !showMenu)}
              type="button"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 border border-gray-500 shadow"
              aria-expanded="false"
            >
              <span class="sr-only">Open menu</span>
              {/* <!-- Heroicon name: outline/menu --> */}
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span>LOGO</span>
          </div>
          <nav
            className={`${
              !showMobileMenu
                ? "hidden md:flex flex-col md:flex-row gap-4 items-center"
                : "flex flex-col md:flex-row gap-4 items-center"
            }`}
          >
            <a
              href="/"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </a>

            <a
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Contact Us
            </a>
            <a
              href="#"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Start Publishing
            </a>
            <div className="flex flex-col md:hidden items-center">
              {" "}
              {isAdmin() && (
                <span
                  onClick={() => (window.location.href = "/publishers")}
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    color: "tomato",
                  }}
                  className=""
                >
                  Dashboard
                </span>
              )}
              {isAuthUser() && (
                <span
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    color: "tomato",
                  }}
                  className=""
                >
                  Logout
                </span>
              )}
              {!isAuthUser() && (
                <>
                  <a
                    href="/login"
                    class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    {" "}
                    Sign in{" "}
                  </a>
                  <span
                    href="/signup"
                    class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 my-2"
                  >
                    {" "}
                    Sign up{" "}
                  </span>
                </>
              )}
            </div>
          </nav>
          <div class="hidden md:flex flex-col md:flex-row items-center justify-end md:flex-1 lg:w-0">
            {isAdmin() && (
              <p
                onClick={() => (window.location.href = "/publishers")}
                style={{
                  cursor: "pointer",
                  textAlign: "right",
                  color: "tomato",
                }}
                className=""
              >
                Dashboard
              </p>
            )}
            {isAuthUser() && (
              <p
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  textAlign: "right",
                  color: "tomato",
                }}
                className=""
              >
                Logout
              </p>
            )}

            {!isAuthUser() && (
              <>
                <a
                  href="/login"
                  class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {" "}
                  Sign in{" "}
                </a>
                <a
                  href="/signup"
                  class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {" "}
                  Sign up{" "}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
