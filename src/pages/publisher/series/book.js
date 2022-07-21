import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Publishers from "..";
import AdInsertModal from "../../../modals/ad-insert-modal";
import AdEditModal from "../../../modals/ad-edit-modal";
import { useBookStore } from "../../../stores/book-store";

export default function Book() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publication, setPublication] = useState();
  const [previewMode, setPreviewMode] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showAdEditModal, setShowAdEditModal] = useState(false);
  const [currentEditingPageAd, setCurrentEditingPageAd] = useState();
  const [currentEditingAdId, setcurrentEditingAdId] = useState();
  //   const { pageAdvertId, setpageAdvertId } = useBookStore((state) => state);

  let { userId } = useParams();
  let { seriesId } = useParams();
  let { bookId } = useParams();
  const getPublication = () => {
    const url =
      "/api/book/" + bookId + "/series/" + seriesId + "/publisher/" + userId;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setPublication(response.data.series);
          console.log(response.data.series);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const movePage = (page, direction) => {
    // alert(`${page.name} ${direction}`);
    const url = "/api/page/" + page.id + "/move/" + direction;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          getPublication();
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const deletePage = (page) => {
    const url = "/api/page/" + page.uuid;
    axios
      .delete(url)
      .then((response) => {
        if (response.status == 200) {
          getPublication();
          //   setPublication(response.data.series);
          //   console.log(response.data.series);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const showAdBox = (page) => {
    setShowAdModal(true);
    setCurrentEditingPageAd(page);
    setcurrentEditingAdId(null);
  };

  const showEditAdBox = (page) => {
    setShowAdEditModal(true);
    setCurrentEditingPageAd(page);
    setcurrentEditingAdId(page.adverts[0].uuid);
    // alert(page.adverts[0].uuid);
  };

  const hideEditAdBox = () => {
    setShowAdEditModal(false);
    setCurrentEditingPageAd(null);
    setcurrentEditingAdId("");
    // alert(page.adverts[0].uuid);
  };

  const hideAdBox = () => {
    setShowAdModal(false);
    setCurrentEditingPageAd(null);
    setcurrentEditingAdId("");
  };

  const handleAdIdChange = (e) => {
    setcurrentEditingAdId(e);
  };

  const saveAd = () => {
    const url = "/api/page/advert/";
    axios
      .post(url, { page: currentEditingPageAd.id, ad_id: currentEditingAdId })
      .then((response) => {
        if (response.status == 200) {
          getPublication();
          hideAdBox();
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const updateAd = () => {
    const url = "/api/page/advert/update";
    axios
      .post(url, {
        page: currentEditingPageAd.id,
        ad_id: currentEditingAdId,
      })
      .then((response) => {
        if (response.status == 200) {
          getPublication();
          hideEditAdBox();
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const deleteAd = (page) => {
    const url = "/api/page/advert/delete/" + page.id;
    axios
      .delete(url)
      .then((response) => {
        if (response.status == 200) {
          getPublication();
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getPublication();
  }, []);
  return (
    <>
      <div className="bg-white m-2 p-2 flex md:flex-row justify-between shadow">
        <div>
          <h1 className="text-2xl text-center font-bold">
            Book
            <span className="text-gray-500 font-normal ml-2">
              ({publication && publication.name})
            </span>
          </h1>
        </div>
        <div>
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  href="/publishers"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Publishers
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>

                  <a
                    href={`/publisher/publications/options/${userId}`}
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Options
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href={`/publisher/publications/series/${userId}`}
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Series
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    {publication && publication.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div>
          <BasicButton
            title={"Go Back"}
            handleClick={() => window.history.back()}
          />
          <a
            href={`/publisher/create-page/${userId}/${
              publication && publication.id
            }
            `}
          >
            <BasicButton
              classes={"bg-teal-500 hover:bg-teal-400 ml-2"}
              title={"Add page"}
              handleClick={() => null}
            />
          </a>
        </div>
      </div>

      {publication && (
        <div className="bg-white m-2 p-2 grid md:grid-cols-3 ">
          <div className="flex flex-col items-center">
            <img
              className="w-6/12"
              src={
                "https://wordalbums1.test/storage/" +
                publication.cover_photo.split("public")[1]
              }
            />
            <div>
              {/* <p className="text-black">Title</p> */}
              <p className="text-black">{publication.name}</p>
            </div>
            <div>
              <a href={`/reader/${publication && publication.uuid}`}>
                <BasicButton
                  classes={"bg-teal-500 hover:bg-teal-400 ml-2"}
                  disabled={!publication || !publication.pages.length}
                  title={"Preview Book"}
                  handleClick={null}
                />
              </a>
            </div>
            <p>Price: ${publication.price}</p>
          </div>
          <div className="col-span-2 bg-gray-50 p-2 rounded h-96 overflow-y-scroll">
            <h1 className="text-black font-bold text-2xl m-2">Pages</h1>
            <hr />
            <div className="w-8/12 md:w-11/12">
              <div className="grid content-start gap-4 p-2">
                {publication &&
                  publication.pages.map((page, i) => {
                    return (
                      <>
                        <div className="bg-white rounded p-2 relative">
                          <div className="flex items-center justify-between">
                            {" "}
                            <div className="flex">
                              <div className="flex items-center">
                                {page.file.includes("pdf") && (
                                  <img className="w-16" src={"/pdf-icon.png"} />
                                )}
                                {!page.file.includes("pdf") && (
                                  <img
                                    className="w-16"
                                    src={
                                      "https://wordalbums1.test/storage/" +
                                      page.file.split("public")[1]
                                    }
                                  />
                                )}
                              </div>
                              <div className="p-2">
                                {/* <p className="font-bold text-2xl">{publication.name}</p> */}
                                <p className="text-gray-500">{page.name}</p>
                                <p className="text-teal-500">
                                  Page {page.position}
                                </p>
                              </div>
                            </div>
                            <div className="p-2 text-right">
                              {page.position !== 1 && (
                                <BasicButton
                                  classes={"bg-teal-500 hover:bg-teal-400"}
                                  disabled={false}
                                  title={"Move Up"}
                                  handleClick={() => movePage(page, "up")}
                                />
                              )}
                              {page.position !== publication.pages.length && (
                                <BasicButton
                                  classes={
                                    "bg-teal-500 hover:bg-teal-400 ml-2 mr-1"
                                  }
                                  disabled={false}
                                  title={"Move Down"}
                                  handleClick={() => movePage(page, "down")}
                                />
                              )}
                            </div>
                            {/* <div className="p-2 text-right"></div> */}
                            <></>
                          </div>
                          <div
                            className="bg-white rounded rounded-full bg-white p-0  right-0 absolute px-1 cursor-pointer"
                            style={{ top: -13 }}
                            onClick={() => deletePage(page)}
                          >
                            <i class="fa fa-times-circle text-red-500  z-50 text-2xl"></i>
                          </div>
                        </div>
                        {
                          <div className="border border-dashed p-2 flex justify-center relative">
                            {page.adverts.length ? (
                              <div
                                className="bg-white rounded rounded-full bg-white p-0  right-0 absolute px-1 cursor-pointer"
                                style={{ top: -13 }}
                                onClick={() => deleteAd(page)}
                              >
                                <i class="fa fa-times-circle text-red-500  z-50 text-2xl"></i>
                              </div>
                            ) : (
                              ""
                            )}
                            {page.adverts.length ? (
                              <div
                                className="bg-white rounded rounded-full bg-white p-0  right-0 absolute px-1 cursor-pointer"
                                style={{ top: -13, right: 40 }}
                                onClick={() => showEditAdBox(page)}
                              >
                                <i class="fa fa-edit text-blue-500  z-50 text-2xl"></i>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="">
                              {!page.adverts.length ? (
                                <BasicButton
                                  classes={
                                    "bg-gray-500 hover:bg-teal-400 ml-2 mr-1 "
                                  }
                                  disabled={false}
                                  title={"Insert Ad"}
                                  handleClick={() => showAdBox(page)}
                                />
                              ) : (
                                ""
                              )}
                              {page.adverts.length ? (
                                <p>
                                  <span className="text-black font-bold">
                                    Ad ID:
                                  </span>{" "}
                                  {page.adverts[0].uuid}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        }
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        {/* <div>
          <BasicButton
            title={"Create"}
            classes={"p-6"}
            handleClick={() => null}
          />
        </div>{" "} */}
      </div>
      {/* <ReaderPreview
        pages={publication && publication.pages}
        showModal={previewMode}
        hideModal={hidePreviewModal}
      /> */}
      <AdInsertModal
        modalOpen={showAdModal}
        hideAdModal={hideAdBox}
        saveAdvert={saveAd}
        handleAdIdChange={handleAdIdChange}
        value={currentEditingAdId}
      />
      <AdEditModal
        modalOpen={showAdEditModal}
        hideAdModal={hideEditAdBox}
        updateAdvert={updateAd}
        handleAdIdChange={handleAdIdChange}
        value={currentEditingAdId}
      />
    </>
  );
}
