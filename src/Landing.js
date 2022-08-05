import BasicButton from "./components/buttons/basic-button";
import PlatformUpdateModal from "./modals/platform-updates-modal";
import { authUserData, isAuthUser, isAdmin } from "./Utils/helpers";
import { useState, useEffect } from "react";
import WebHeader from "./pages/web/header";
import axios from "axios";

export const PageHeader = () => {
  const initialPublishers = Array(3)
    .fill()
    .map(() => Math.round(Math.random() * 40));
  const [publishers, setPublishers] = useState([]);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const getPublishers = () => {
    const url = "/api/publishers";
    axios
      .post(url)
      .then((response) => {
        if (response.status == 200) {
          setPublishers(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const getBooks = () => {
    const url = "/api/books";
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setBooks(response.data.books);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const showPlatformModal = () => {
    setPlatformModalOpen(true);
  };

  const hidePLatformModal = () => {
    setPlatformModalOpen(false);
  };

  const hasPurchasedBook = (book) => {
    if (!isAuthUser()) {
      return false;
    }

    if (book) {
      const bought = book.buyers.filter((buyer) => {
        // alert(buyer.user_id == authUserData().id);
        if (buyer.user_id == authUserData().id) {
          return buyer;
        }
      });

      //   alert(bought);

      return bought.length ? true : false;
    }

    // return false;
  };

  useEffect(() => {
    getPublishers();
    getBooks();
    // alert(authUserData().id);
    // isAdmin();
  }, []);
  return (
    <>
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <WebHeader />

      <div
        class="relative overflow-hidden bg-no-repeat bg-cover bg-black"
        style={{
          backgroundPosition: "50%",
          backgroundImage: `url("https://mdbcdn.b-cdn.net/img/new/slides/146.webp")`,
          height: "350px",
        }}
      >
        <div
          class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.75)` }}
        >
          <div class="flex justify-center items-center h-full">
            <div class="text-center text-white px-6 md:px-12">
              <br />
              <br />
              <h1 class="text-5xl font-bold mt-0 mb-6">WordAlbums</h1>

              <h3 className="text-3xl font-bold mb-8">
                Discover your next great book!
              </h3>
              <div className="flex justify-center">
                <p className="text-center md:w-6/12 m-4">
                  WordAlbums highlights the best new books across all genres, as
                  chosen by our editors. Every book we cover is one that we are
                  excited to recommend to readers.
                </p>
              </div>
              {/* <button
                type="button"
                class="inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out my-4"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Become a Publisher
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        {" "}
        <div className="bg-black w-full mt-0 h-full">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-50">
              <h1 className="text-center text-2xl font-bold my-6 text-black">
                Books
              </h1>
              {/* /web/reader/${book.uuid} */}
              {
                <div className="grid md:grid-cols-8 justify-center gap-4 p-2">
                  {books.map((book) => (
                    <div
                      className="md:col-span-2 p-6 bg-white rounded-lg cursor-pointer"
                      onClick={() => {
                        hasPurchasedBook(book)
                          ? (document.location.href = `/web/book/${book.uuid}`)
                          : (document.location.href = `/web/reader/${book.uuid}`);
                      }}
                    >
                      <img
                        className="w-full shadow"
                        src={"/storage/" + book.cover_photo.split("public")[1]}
                      />{" "}
                      <div className="text-center py-2">
                        {" "}
                        <p className="font-bold text-2xl">{book.name}</p>
                        <p className="text-gray-300">By {book.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
            <div className="grid md:grid-cols-1 w-10/12">
              {/* <div className="items-center"></div> */}

              <div className="col-span-2">
                {" "}
                <h1 class="text-3xl font-bold mt-0 mb-3 text-center py-4 text-white">
                  Publishers
                  {/* <hr /> */}
                </h1>
                <br />
                <div className="grid grid-cols-2 md:grid-cols-3 p-2 ">
                  {publishers.length &&
                    publishers.map((publisher) => {
                      return (
                        <div class="text-center my-4">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                            class="rounded-full w-7/12 mb-4 mx-auto"
                            alt="Avatar"
                          />
                          <h5 class="text-xl font-medium leading-tight mb-2 text-white">
                            {publisher.name}
                          </h5>
                          <p class="text-gray-500 mb-1">
                            Series (5) Books (20)
                          </p>
                          {/* <div className="flex justify-center  gap-2 m-2">
                            <i
                              class="fa fa-star cursor-pointer text-amber-500"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star cursor-pointer text-amber-500"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star cursor-pointer text-amber-500"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star cursor-pointer text-gray-500"
                              aria-hidden="true"
                            ></i>
                            <i
                              class="fa fa-star cursor-pointer text-gray-500"
                              aria-hidden="true"
                            ></i>
                          </div> */}
                          <div className="flex justify-center">
                            <a
                              href={`/web/publisher/publications/${publisher.uuid}`}
                            >
                              <BasicButton
                                title={`Publications`}
                                classes="bg-black border border-white hover:bg-white hover:text-black"
                              />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <br />
                {/* <h1 class="text-3xl font-bold mt-0 mb-3 text-center mt-6">
                  Books{" "}
                </h1>
               
                <br />
                <div className="grid md:grid-cols-3 p-2 ">
                  {publishers.length &&
                    publishers.map((publisher, i) => {
                      return (
                        <div class="text-center my-4">
                          <img
                            src={`book${i + 1}.jpg`}
                            class="rounded-full w-32 mb-4 mx-auto"
                            alt="Avatar"
                          />
                          <h5 class="text-xl font-medium leading-tight mb-2">
                            {`Book ${i + 1}`}
                          </h5>
                          <p class="text-gray-500">Publisher</p>
                          <div className="flex justify-center">
                            <BasicButton title={`View`} />
                          </div>
                        </div>
                      );
                    })}
                </div> */}
              </div>
            </div>

            <div className="grid md:grid-cols-1 w-10/12">
              <h1 class="text-3xl font-bold mt-0 mb-3 text-center py-4 text-white">
                Platform Updates
                {/* <hr /> */}
              </h1>
              <p className="p-2 text-white">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
            <div className="my-2">
              <BasicButton
                title={`Sign up for updates`}
                handleClick={showPlatformModal}
              />
            </div>
          </div>
        </div>
      </div>
      <PlatformUpdateModal
        modalOpen={platformModalOpen}
        hideModal={hidePLatformModal}
        type={"platform_updates"}
      />
    </>
  );
};

export default PageHeader;
