import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdInsertModal from "../../../modals/ad-insert-modal";
import AdEditModal from "../../../modals/ad-edit-modal";
import InformationPageModal from "../../../modals/information-page-modal";
import WebHeader from "../header";
import { API_BASE } from "../../../Utils/helpers";

export default function WebBook() {
  const [book, setBook] = useState();

  let { bookuuid } = useParams();
  const getBook = () => {
    const url = API_BASE + "/api/book/" + bookuuid;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setBook(response.data.book);
          //   console.log(response.data.series);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getBook();
  }, []);
  return (
    <>
      <WebHeader />
      <div className="bg-black w-full mt-0">
        {book && (
          <div className="m-2 p-2 grid grid-cols-1 md:grid-cols-3 justify-center">
            <div className="w-full flex flex-col items-center">
              <img
                className="w-6/12 md:w-6/12 m-2"
                src={"/storage/" + book.cover_photo.split("public")[1]}
              />
              <div>
                {/* <p className="text-black">Title</p> */}
                <p className="text-white mt-2">{book.name}</p>
              </div>
              <div className="">
                <a href={`/web/reader/${book && book.uuid}`}>
                  <BasicButton
                    classes={"bg-teal-500 hover:bg-teal-400 ml-2"}
                    disabled={!book || !book.pages.length}
                    title={"View"}
                    handleClick={null}
                  />
                </a>
              </div>
              {/* <p className="text-white">Price: ${book.price}</p> */}
              <h1 className="text-white font-bold text-2xl m-2 justify-center flex md:hidden">
                {book.pages && book.pages.length} Pages
              </h1>
            </div>

            <div className="col-span-2  p-2 rounded h-96 overflow-y-scroll">
              <h1 className="text-white font-bold text-2xl m-2  justify-center hidden md:flex">
                {book.pages && book.pages.length} Pages
              </h1>
              {/* <hr /> */}
              <div className="md:w-11/12">
                <div className="grid content-start gap-4 p-2">
                  {book &&
                    book.pages.map((page, i) => {
                      return (
                        <>
                          <div className="rounded-lg p-2 relative bg-white m-2">
                            <div className="flex flex-col md:flex-row items-center justify-between">
                              {" "}
                              <div className="flex flex-col md:flex-row">
                                <div className="flex justify-center">
                                  {page.file.includes("pdf") && (
                                    <img
                                      className="w-4/12 md:w-16"
                                      src={"/pdf-icon.png"}
                                    />
                                  )}
                                  {!page.file.includes("pdf") && (
                                    <img
                                      className="w-16"
                                      src={
                                        "/storage/" +
                                        page.file.split("public")[1]
                                      }
                                    />
                                  )}
                                </div>
                                <div className="p-2">
                                  {/* <p className="font-bold text-2xl">{publication.name}</p> */}
                                  <p className="text-black text-center">
                                    {page.name}
                                  </p>
                                  <p className="text-teal-500 text-center md:text-left">
                                    Page {page.position}
                                  </p>
                                </div>
                              </div>
                              <BasicButton
                                classes={"bg-teal-500 hover:bg-teal-400 ml-2"}
                                disabled={!book || !book.pages.length}
                                title={"View"}
                                handleClick={() =>
                                  (window.location.href = `/web/reader/${book.uuid}/${page.uuid}`)
                                }
                              />
                            </div>
                          </div>
                          {}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
