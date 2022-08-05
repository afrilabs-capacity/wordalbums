import TextField from "../components/inputs/text-input";
import BasicButton from "../components/buttons/basic-button";
import TermsAccordion from "../accordions/terms-accordion";
import { useBookStore } from "../stores/book-store";
import { forwardRef, useState, useEffect } from "react";
import { isAuthUser, authUserData, API_BASE } from "../Utils/helpers";
import { toast } from "react-toastify";
import axios from "axios";

export default function PlatformUpdateModal({ modalOpen, hideModal, type }) {
  const { pageAdvertId } = useBookStore((state) => state);
  const [termsConsent, setTermsConsent] = useState(false);
  const [email, setEmail] = useState("");

  const subscribe = () => {
    const url = API_BASE + "/api/subscription/create";
    axios
      .post(url, {
        email: email,
        user_id: isAuthUser() && authUserData().id,
        channel: type,
      })
      .then((response) => {
        if (response.status == 200) {
          toast("Success! We'll keep you informed on latest updates", {
            type: "success",
          });
          hideModal();
          setEmail("");
        }
      })
      .catch((error) => {
        toast("Something went wrong", { type: "error" });
        console.error("There was an error!", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  return (
    <div
      className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${
        modalOpen ? "" : "hidden"
      } id="modal"`}
    >
      <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          class="inline-block align-center bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle md:w-6/12 h-4/12 "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* modal body */}
            <div className="p-2">
              <h1 className="text-2xl font-bold text-center">
                {/* {getActiveWidgetTitle(currentEditingWidget, widgets)} */}
                Signup for Updates
              </h1>
            </div>

            <div className="p-2 flex justify-center">
              <TextField
                placeholder={"Email..."}
                classes="w-8/12"
                handleChange={handleEmailChange}
                value={email}
              />
            </div>

            <div className="flex justify-center">
              <p className="w-8/12"> Sign up to receive the latest updates:</p>
            </div>

            <div className="flex justify-center my-2">
              <div className="w-8/12">
                <TermsAccordion />

                <div class="flex items-center mb-4">
                  <input
                    checked={termsConsent}
                    onChange={(e) => {
                      setTermsConsent((prev) => !prev);
                    }}
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 my-2"
                  >
                    I have read the Terms and Conditions, and I accept updates.
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-8/12  grid md:grid-cols-2 gap-4">
                <BasicButton
                  disabled={false}
                  title={"Agree & Signup"}
                  classes="px-8"
                  handleClick={() => subscribe()}
                />

                <BasicButton
                  title={"Cancel"}
                  classes="px-8"
                  handleClick={() => hideModal()}
                />
              </div>
            </div>

            {/* modal body */}
          </div>
          <div class="bg-gray-200 px-4 py-3 flex justify-end">
            <button
              type="button"
              class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={() => hideModal()}
            >
              <i class="fas fa-times"></i> Close
            </button>
            {/* <button
                type="button"
                class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
              >
                <i class="fas fa-plus"></i> Create
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
