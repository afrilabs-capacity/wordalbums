import React, { useState, useEffect, useRef } from "react";
import "../reader.css";
import { Document, Page, pdfjs } from "react-pdf";
import {
  RenderCurrentScaleProps,
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { useParams } from "react-router-dom";
// Import the main component
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Reader() {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(0);
  const [views, setViews] = useState([]);
  const [showZoomTool, setShowZoomTool] = useState(false);
  const [showToolBar, setShowToolBar] = useState(false);
  const [book, setBook] = useState({});
  const [pages, setPages] = useState([]);

  const zoomPluginInstance = zoomPlugin();
  const {
    ZoomInButton,
    ZoomOutButton,
    ZoomPopover,
    CurrentScale,
    ZoomIn,
    ZoomOut,
  } = zoomPluginInstance;

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef();
  const refLeftNav = useRef();
  const refRightNav = useRef();
  let { uuid } = useParams();
  let bookPagesWithAds = [];
  const getBook = () => {
    const url = "/api/book/" + uuid;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          bookPagesWithAds = [];
          setBook(response.data.book);
          if (response.data.book.pages) {
            for (let i = 0; i < response.data.book.pages.length; i++) {
              bookPagesWithAds.push(response.data.book.pages[i]);
              if (response.data.book.pages[i].adverts.length) {
                bookPagesWithAds.push(response.data.book.pages[i].adverts[0]);
              }
            }
          }
          response.data.book.pages && setPages(bookPagesWithAds);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => alert("Swiped"),
    onSwipedLeft: (eventData) => alert("Swiped Left"), // After LEFT swipe  (SwipeEventData) => void
    onSwipedRight: (eventData) => alert("Swiped Right"),
  });

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      refLeftNav.current &&
      !refLeftNav.current.contains(event.target) &&
      refRightNav.current &&
      !refRightNav.current.contains(event.target)
    ) {
      setIsComponentVisible((prev) => !prev);
    } else {
    }
  };

  useEffect(() => {
    if (pages.length) {
      const bookPages = pages.map((page) => {
        // alert(page.file);
        if (page.file) {
          if (page.file.includes("pdf")) {
            return {
              widget: (
                <RenderPDF
                  filename={"/storage" + page.file.split("public")[1]}
                  zoomPluginHandle={zoomPluginInstance}
                />
              ),
              type: "pdf",
            };
          } else {
            return {
              widget: (
                <RenderImage
                  filename={"/storage" + page.file.split("public")[1]}
                />
              ),
              type: "image",
            };
          }
        } else {
          return {
            widget: <RenderAd filename={page} />,
            type: "image",
          };
        }
      });
      setViews(bookPages);
      setNumPages(bookPages.length);
    }
  }, [pages]);

  useEffect(() => {
    getBook();
    // let allViews = [
    //   {
    //     widget: (
    //       <RenderPDF
    //         filename="/silex.pdf"
    //         zoomPluginHandle={zoomPluginInstance}
    //       />
    //     ),
    //     type: "pdf",
    //   },
    //   { widget: <RenderImage filename="/pet.jpg" />, type: "image" },
    //   {
    //     widget: (
    //       <RenderPDF
    //         filename="/outdoor.pdf"
    //         zoomPluginHandle={zoomPluginInstance}
    //       />
    //     ),
    //     type: "pdf",
    //   },
    //   { widget: <RenderImage filename="/kid.jpg" />, type: "image" },
    //   {
    //     widget: (
    //       <RenderPDF
    //         filename="/sound.pdf"
    //         zoomPluginHandle={zoomPluginInstance}
    //       />
    //     ),
    //     type: "pdf",
    //   },
    // ];

    // setViews(allViews);
    // setNumPages(allViews.length);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // return { ref, isComponentVisible, setIsComponentVisible };

  return (
    <>
      {/* <h1 className="text-2xl flex justify-center">Welcome</h1> */}
      <div
        className="bg-black"
        onClick={() => setShowZoomTool((prev) => !prev)}
      >
        <div className="grid grid-cols-8 content-center h-full relative">
          <div className="left col-span-1" style={{ backgroundColor: "" }}>
            <div className="flex items-center justify-center h-screen">
              <i
                ref={refLeftNav}
                class="fa fa-less-than  cursor-pointer text-white"
                className={
                  page !== 0
                    ? "fa fa-less-than cursor-pointer text-white"
                    : "hiden"
                }
                onClick={() => {
                  if (page !== 0) {
                    setPage(page - 1);
                  } else {
                    return;
                  }
                }}
              ></i>
            </div>
          </div>
          <div
            className="main bg-black col-span-6 relative grid items-center"
            {...handlers}
          >
            <div
              className="absolute left-0 bottom-0 right-0  z-40 h-26  text-black"
              style={{ bottom: 30 }}
            >
              <div
                className=" w-60 rounded"
                style={{
                  margin: "0 auto",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
              >
                {
                  <>
                    {" "}
                    <p
                      ref={ref}
                      className={`flex justify-center items-center text-white rounded-full p-2 ${
                        !isComponentVisible && "hidden"
                      } `}
                    >
                      {views.length && views[page].type == "pdf" && (
                        <>
                          <CustomizeZoomButtonsExample
                            zoomPluginHandle={zoomPluginInstance}
                          />
                          <span className="white mx-2">|</span>
                        </>
                      )}
                      page {page + 1} of {numPages}{" "}
                      <a
                        href={`/publisher/${
                          book && book.user_id
                        }/publications/series/${"seriesId"}/book/${
                          book && book.id
                        }`}
                      >
                        <i class="fa fa-book text-white cursor-pointer ml-2 z-50 text-1xl"></i>
                      </a>
                    </p>
                  </>
                }
              </div>
            </div>
            <div className="text-center">
              {views.length ? views[page].widget : ""}
            </div>
          </div>
          <div className="rihgt col-span-1" style={{ backgroundColor: "" }}>
            <div className="flex items-center justify-center h-full">
              <i
                ref={refRightNav}
                class="fa fa-greater-than cursor-pointer text-white"
                className={
                  page !== numPages - 1
                    ? "fa fa-greater-than cursor-pointer text-white"
                    : "hiden"
                }
                onClick={() => {
                  //alert(page);
                  if (page !== views.length - 1) {
                    setPage(page + 1);
                  } else {
                    return;
                  }
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function RenderPDF({ filename, zoomPluginHandle }) {
  return (
    <div className="h-screen">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
        <div className="h-screen">
          <Viewer
            fileUrl={process.env.PUBLIC_URL + filename}
            defaultScale={SpecialZoomLevel.PageWidth}
            plugins={[zoomPluginHandle]}
          />
        </div>
      </Worker>
    </div>
  );
}

export function RenderImage({ filename }) {
  return <img src={process.env.PUBLIC_URL + filename} className="h-screen" />;
}

export function RenderAd({ filename }) {
  return (
    <div
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: filename.data }}
    ></div>
  );
}

const CustomizeZoomButtonsExample = ({ zoomPluginHandle }) => {
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginHandle;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div className="flex justify-center">
        <div style={{ padding: "0px 2px" }}>
          <ZoomOut>
            {(RenderZoomOutProps) => (
              <i
                class="fa fa-minus cursor-pointer text-white"
                onClick={RenderZoomOutProps.onClick}
              ></i>
            )}
          </ZoomOut>
        </div>
        <div style={{ padding: "0px 2px" }} className="mx-2">
          <CurrentScale>
            {(RenderCurrentScaleProps) => (
              <>{`${Math.round(RenderCurrentScaleProps.scale * 100)}%`}</>
            )}
          </CurrentScale>
        </div>
        <div style={{ padding: "0px 2px" }}>
          <ZoomIn>
            {(RenderZoomInProps) => (
              <i
                class="fa fa-plus cursor-pointer text-white"
                onClick={RenderZoomInProps.onClick}
              ></i>
            )}
          </ZoomIn>
        </div>
      </div>
    </div>
  );
};

export default Reader;
