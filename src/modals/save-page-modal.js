import TextField from "../components/inputs/text-input";
import BasicButton from "../components/buttons/basic-button";
import TermsAccordion from "../accordions/terms-accordion";
import { useBookStore } from "../stores/book-store";
import { forwardRef, useState, useEffect } from "react";

export default function SavePageModal({
  modalOpen,
  hideModal,
  savePage,
  handleEmailChange,
  email,
  book,
}) {
  const { pageAdvertId } = useBookStore((state) => state);
  const [termsConsent, setTermsConsent] = useState(false);

  //   useEffect(() => {
  //     alert(email);
  //   }, [email]);
  return (
    <div
      className={`absolute z-10 overflow-y-auto top-0 w-full left-0 ${
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
                Save Page Position
              </h1>
            </div>

            <div className="p-2 flex justify-center">
              <TextField
                placeholder={"Email..."}
                classes="w-8/12"
                handleChange={handleEmailChange}
              />
            </div>

            <div className="flex justify-center">
              <p className="w-8/12">
                {" "}
                You will be emailed a link to this page so you can continue from
                it instead of starting over from page 1 again. You will only be
                able to access the saved page on this browser on this device. In
                addition to saving this page’s position, we will subsequently
                email you only updates on new app features and new releases in
                this book's series.
              </p>
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
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I have read the Terms and Conditions, and I accept cookies
                    which will help in saving this page’s position.
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-8/12  grid md:grid-cols-2 gap-4">
                <BasicButton
                  disabled={!termsConsent || !email}
                  title={"Agree"}
                  classes="px-8"
                  handleClick={() => savePage()}
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
          <div class="bg-gray-200 px-4 py-3 flex justify-between">
            <div className="flex justify-center">
              <BasicButton title={`Ad-Free $${book.price}`} />
            </div>
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
