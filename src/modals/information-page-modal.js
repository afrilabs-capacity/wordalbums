import TextNumberField from "../components/inputs/text-number-input";
import BasicButton from "../components/buttons/basic-button";
import TermsAccordion from "../accordions/terms-accordion";
import { useBookStore } from "../stores/book-store";
import { forwardRef, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function InformationPageModal({ modalOpen, hideModal, book }) {
  const previewImageRef = useRef();
  const { pageAdvertId } = useBookStore((state) => state);
  const [termsConsent, setTermsConsent] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [fileSelected, setFileSelected] = useState("");
  const [email, setEmail] = useState("");
  const [releaseInformation, setReleaseInformation] = useState("");
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(1);
  const [position, setPosition] = useState(0);
  const [amount, setAmount] = useState(0);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [shouldDeleteCoverPhoto, setShouldDeleteCoverPhoto] = useState(0);

  const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
  // let { userId } = useParams();
  const addInformationPage = () => {
    const url = "/api/information-page/create-or-update";
    // alert(pageStart);
    let formData = new FormData();
    formData.append("release_information", releaseInformation);
    formData.append("page_start", pageStart);
    formData.append("page_end", pageEnd);
    formData.append("position", position);
    formData.append("donation_amount", amount);
    formData.append("cover_photo", coverPhoto);
    formData.append("book_id", book.id);
    formData.append("delete_cover_photo", shouldDeleteCoverPhoto);
    axios
      .post(url, formData)
      .then((response) => {
        if (response.status == 200) {
          toast("Updated!", { type: "success" });
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const uploadCover = (e) => {
    let [file] = e.target.files;
    if (file) {
      setFileSelected(URL.createObjectURL(file));
      previewImageRef.src = URL.createObjectURL(file);
      setCoverPhoto(file);
      console.log(file);
      //   previewImageRef.classList.remove("hidden");
      const image = getBase64(file);
      image.then((res) => {
        // console.log("My image", res);
      });
    }
  };

  const removeCover = () => {
    setFileSelected("");
    setCoverPhoto("");
    setShouldDeleteCoverPhoto(1);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAmountChange = (e) => {
    if (rx_live.test(e)) {
      setAmount(e);
    }
  };

  const handleReleaseInformation = (e) => {
    setReleaseInformation(e);
  };

  const handleInsertionChange = (e) => {
    const value = e.target.value;
    if (value == "page_start") {
      setPageStart(1);
      setPageEnd(0);
      setPosition(0);
      setShowPositionDropdown(false);
    }

    if (value == "page_end") {
      setPageStart(0);
      setPageEnd(1);
      setPosition(0);
      setShowPositionDropdown(false);
    }

    if (value == "position") {
      setPageStart(0);
      setPageEnd(0);
      setShowPositionDropdown(true);
    }
  };

  const handlePositionChange = (e) => {
    setPosition(e);
  };

  useEffect(() => {
    if (book && book.infopage) {
      setPageStart(book.infopage.page_start);
      setPageEnd(book.infopage.page_end);
      setAmount(book.infopage.donation_amount);
      setPosition(book.infopage.position);
      setReleaseInformation(book.infopage.release_information);
      if (book.infopage.cover_photo)
        setFileSelected(
          "/storage" + book.infopage.cover_photo.split("public")[1]
        );
      if (book.infopage.position !== 0) setShowPositionDropdown(true);
    }
  }, [book && book.infopage]);

  const signup = () => {};
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
                Information Page
              </h1>
            </div>

            <div className="p-2 text-center">
              <label className="text-black m-2">
                Background Image (Optional)
              </label>
              <div className="flex justify-center my-2">
                {!fileSelected && (
                  <div className="w-full bg-gray-100 p-2">
                    <div className="flex flex-col justify-center">
                      <i class="fa fa-plus cursor-pointer text-green-500"></i>
                      <p className="text-xs">Click to upload</p>
                      <p className="text-xs"> (jpeg, jpg, png)</p>
                      <div className="my-2 mx-4">
                        <input
                          type="file"
                          onChange={(e) => uploadCover(e)}
                          class=" 
                        pr-2   
                        z-10  
                        text-sm 
                        text-grey-500
                        file:mr-6
                        file:py-2
                        file:rounded-full
                        file:border-0
                        file:text-md
                        file:font-semibold
                        file:text-white
                        file:bg-gradient-to-r
                        file:from-blue-600
                        file:to-amber-600
                        hover:file:cursor-pointer
                        hover:file:opacity-80 w-full"
                        />
                      </div>
                      {/* <input type="file" onChange={(e) => uploadCover(e)} /> */}
                    </div>
                  </div>
                )}

                {fileSelected && (
                  <div className="w-full bg-gray-100 p-2 relative flex justify-center">
                    <img src={fileSelected} className="w-6/12" />
                    <div
                      className="bg-white rounded rounded-full bg-white p-0 top-0 right-0 absolute px-1 cursor-pointer"
                      onClick={() => removeCover()}
                    >
                      <i class="fa fa-times-circle text-red-500  z-50 text-2xl"></i>
                    </div>
                  </div>
                )}
              </div>
              {/* <TextField
              classes={"p-6"}
              placeholder={"Email.."}
              handleChange={handleEmailChange}
            /> */}
            </div>

            <div className="p-2 flex flex-col justify-center">
              <label className="font-bold">Next Release Information</label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your release information..."
                onChange={(e) => handleReleaseInformation(e.target.value)}
                value={releaseInformation}
              ></textarea>
            </div>

            <div className="p-2 grid md:grid-cols-2">
              <div>
                {" "}
                <label className="font-bold">Donation (Minimum $5)</label>
                {/* maxLength={9}
              pattern="[+-]?\d+(?:[.,]\d+)?" placeholder="Enter amount"
              onChange={this.handleDepositeAmountChange} */}
                <div className="flex items-between">
                  <TextNumberField
                    value={amount}
                    placeholder={"Amount..."}
                    classes="w-6/12 mr-2"
                    handleChange={handleAmountChange}
                  />{" "}
                  USD
                </div>
              </div>
              <div>
                <div className="p-2">
                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="radio"
                      value={"page_start"}
                      checked={pageStart == 1}
                      name="xxx"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleInsertionChange(e)}
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Insert at the begining of book
                    </label>
                  </div>

                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="radio"
                      value={"page_end"}
                      checked={pageEnd == 1}
                      name="xxx"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleInsertionChange(e)}
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Insert at the end of book
                    </label>
                  </div>

                  <div class="flex flex-col items-start mb-4">
                    <div>
                      <input
                        id="default-checkbox"
                        type="radio"
                        value={"position"}
                        checked={position !== 0 || showPositionDropdown}
                        name="xxx"
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => handleInsertionChange(e)}
                      />
                      <label
                        for="default-checkbox"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Insert after page position
                      </label>
                    </div>
                    {showPositionDropdown && (
                      <select
                        className=" form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={(e) => handlePositionChange(e.target.value)}
                        value={position}
                      >
                        <option value=""></option>
                        {book &&
                          book.pages &&
                          book.pages.map((option) => (
                            <option value={option.position}>
                              {option.position}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>

                  {/* widget content end */}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="">
                <BasicButton
                  title={"Update"}
                  classes="px-8"
                  handleClick={() => addInformationPage()}
                />
              </div>

              {/* <p className="w-8/12"> Sign up to receive the latest updates:</p> */}
            </div>

            {/* <div className="flex justify-center my-2">
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
                    I have read the Terms and Conditions, and I accept updates.
                  </label>
                </div>
              </div>
            </div> */}

            {/* <div className="flex justify-center">
              <div className="w-8/12  grid md:grid-cols-2 gap-4">
                <BasicButton
                  disabled={!termsConsent || !email}
                  title={"Agree & Signup"}
                  classes="px-8"
                  handleClick={() => signup()}
                />

                <BasicButton
                  title={"Cancel"}
                  classes="px-8"
                  handleClick={() => hideModal()}
                />
              </div>
            </div> */}

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
