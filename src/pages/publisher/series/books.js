import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAdmin, API_BASE } from "../../../Utils/helpers";
import EditBookModal from "../../../modals/edit-book-modal";
import axios from "axios";
import Publishers from "..";
export default function Books() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publication, setPublication] = useState();
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [currEditingBook, setCurrEditingBook] = useState();

  let { userId } = useParams();
  let { seriesId } = useParams();
  const getPublication = () => {
    const url = API_BASE + "/api/series/" + seriesId + "/publisher/" + userId;
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

  const showEditBookBox = () => {};

  const hideBookEditModal = () => {
    setShowEditBookModal(false);
  };

  const showBookEditModal = (book) => {
    setCurrEditingBook(book);
    setShowEditBookModal(true);
  };

  // ,,,,

  const deleteBook = (book) => {
    const url = API_BASE + "/api/book/delete/" + book.uuid;
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
    if (!isAdmin()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="bg-white m-2 p-2 flex flex-col md:flex-row justify-center md:justify-between shadow">
        <div>
          <h1 className="text-2xl text-center font-bold">
            Series
            <span className="text-gray-500 font-normal ml-2">
              ({publication && publication.name})
            </span>
          </h1>
        </div>
        <div>
          <nav class="flex justify-center" aria-label="Breadcrumb">
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

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <BasicButton
            title={"Go Back"}
            handleClick={() => window.history.back()}
          />
          <a
            href={`/publisher/create-book/${userId}/${
              publication && publication.id
            }`}
          >
            <BasicButton
              classes={"bg-teal-500 hover:bg-teal-400 w-full"}
              title={"Create Book"}
              handleClick={null}
            />
          </a>
        </div>
      </div>

      {publication && (
        <div className="bg-white m-2 p-2 grid md:grid-cols-3 ">
          <div className="flex flex-col items-center">
            <img
              className="w-full md:w-6/12"
              src={
                "https://wordalbums1.test/storage/" +
                publication.cover_photo.split("public")[1]
              }
            />
            <div>
              {/* <p className="text-black">Title</p> */}
              <p className="text-black">{publication.name}</p>
            </div>
          </div>
          <div className="md:col-span-2 bg-gray-50 p-2 rounded">
            <h1 className="text-black font-bold text-2xl">Books</h1>
            <hr />
            <div className="w-full md:w-10/12">
              <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
                {publication &&
                  publication.books.map((book) => (
                    <div className="relative p-4 shadow m-2 bg-white">
                      <div
                        className="bg-white rounded rounded-full bg-white p-0  right-0 absolute px-1 cursor-pointer"
                        style={{ top: -20, right: -5 }}
                        onClick={() => deleteBook(book)}
                      >
                        <i class="fa fa-times-circle text-red-500  z-50 text-2xl"></i>
                      </div>
                      <div
                        className="rounded rounded-full bg-white p-0  right-0 absolute px-1 cursor-pointer"
                        style={{ top: -20, right: 33 }}
                        onClick={() => showBookEditModal(book)}
                      >
                        <i class="fa fa-edit text-blue-500  z-50 text-2xl"></i>
                      </div>
                      <a
                        href={`/publisher/${userId}/publications/series/${seriesId}/book/${book.id}`}
                      >
                        <div>
                          <img
                            className="w-full"
                            src={
                              "/storage/" + book.cover_photo.split("public")[1]
                            }
                          />
                          <p className="font-bold text-2xl text-center">
                            {book.name}
                          </p>
                          <p className="text-gray-300 text-center">
                            By {book.name}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))}
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
      <EditBookModal
        modalOpen={showEditBookModal}
        hideAdModal={hideBookEditModal}
        book={currEditingBook}
        action={getPublication}
      />
    </>
  );
}
