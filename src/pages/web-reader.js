import React, { useState, useEffect, useRef, forwardRef } from "react";
import "../reader.css";
import { Document, Page, pdfjs } from "react-pdf";
import BasicButton from "../components/buttons/basic-button";
import StripeForm from "../payment/pay-button";
import StripePaymentModal from "../modals/stripe-payment-modal";
import { authUserData, isAuthUser } from "../Utils/helpers";
import TextNumberField from "../components/inputs/text-number-input";
import StripeDonateForm from "../payment/donate-button";
import StripeCustomDonateForm from "../payment/donate-button-custom";
import PlatformUpdateModal from "../modals/platform-updates-modal";
import {
  RenderCurrentScaleProps,
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { useParams } from "react-router-dom";
// Import the main component
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import PageSavePaymentModal from "../modals/page-save-payment";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useSwipeable } from "react-swipeable";
import SavePageModal from "../modals/save-page-modal";
import RegistrationModal from "../modals/registration-modal";
import uniqueId from "react-uuid";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function WebReader() {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(0);
  const [pageWithoutAd, setPageWithoutAd] = useState(0);
  const [views, setViews] = useState([]);
  const [showZoomTool, setShowZoomTool] = useState(false);
  const [showToolBar, setShowToolBar] = useState(false);
  const [book, setBook] = useState({});
  const [pages, setPages] = useState([]);
  const [pagesWithoutAds, setPagesWithoutAds] = useState([]);
  const [counAdPages, setCountAdPages] = useState(0);
  const [showNavigation, setShowNaviation] = useState(true);
  const [savePageModalOpen, setSavePageModalOpen] = useState(false);
  const [savePagePaymentModalOpen, setSavePagePaymentModalOpen] =
    useState(false);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pageSaveMode, setPageSaveMode] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [noAdMode, setNoAdMode] = useState(false);
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;
  const zoomPluginInstance = zoomPlugin();
  const {
    ZoomInButton,
    ZoomOutButton,
    ZoomPopover,
    CurrentScale,
    ZoomIn,
    ZoomOut,
  } = zoomPluginInstance;

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef();
  const ref2 = useRef();
  const refLeftNav = useRef();
  const refRightNav = useRef();
  let { uuid } = useParams();
  let { useruuid } = useParams();
  let { pageuuid } = useParams();
  let bookPagesWithAds = [];
  const getBook = () => {
    const url = "/api/book/" + uuid;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          response.data && setBook(response.data.book);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const initBook = () => {
    bookPagesWithAds = [];
    if (book.pages) {
      if (book.infopage) {
        if (book.infopage.page_start == 1) {
          bookPagesWithAds.push({
            ...book.infopage,
            type: "info",
          });
          // alert("has info page");
        }
      }
      for (let i = 0; i < book.pages.length; i++) {
        bookPagesWithAds.push(book.pages[i]);

        if (book.infopage) {
          if (
            book.infopage.position > 0 &&
            book.pages[i].position == book.infopage.position
          ) {
            bookPagesWithAds.push({
              ...book.infopage,
              type: "info",
            });
          }
        }

        if (book.pages[i].adverts.length) {
          if (isAuthUser()) {
            if (!noAdMode) {
              // alert("hhh");
              bookPagesWithAds.push({
                ...book.pages[i].adverts[0],
                type: "advert",
              });
            } else {
              // alert("bought");
            }
          } else {
            bookPagesWithAds.push({
              ...book.pages[i].adverts[0],
              type: "advert",
            });
          }
        }
      }
      if (book.infopage) {
        if (book.infopage.page_end == 1) {
          bookPagesWithAds.push({
            ...book.infopage,
            type: "info",
          });
          // alert("has info page");
        }
      }
    }
    console.log("bookPagesWithAds", bookPagesWithAds);
    book.pages && setPages(bookPagesWithAds);
    book.pages && setPagesWithoutAds(book.pages);
  };

  useEffect(() => {
    initBook();
  }, [book]);

  useEffect(() => {
    hasPurchasedBook();
  }, [book.buyers]);

  useEffect(() => {
    if (noAdMode) {
    }
  }, [noAdMode]);

  useEffect(() => {
    if (pages.length) {
      const bookPages = pages.map((page) => {
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
              id: page.uuid,
            };
          } else {
            return {
              widget: (
                <RenderImage
                  filename={"/storage" + page.file.split("public")[1]}
                />
              ),
              type: "image",
              id: page.uuid,
            };
          }
        } else if (page.type == "advert") {
          return {
            widget: <RenderAd filename={page} />,
            type: "advert",
            id: page.uuid,
          };
        } else {
          return {
            widget: <RenderInfoPage filename={page} book={book} />,
            type: "info",
            id: page.id,
          };
        }
      });
      setViews(bookPages);
      setNumPages(bookPages.length);
    }
  }, [pages]);

  const hasPurchasedBook = () => {
    if (!authUserData()) {
      return false;
    }
    if (book.buyers) {
      book.buyers.map((buyer) => {
        if (buyer.user_id == authUserData().id) {
          setNoAdMode(true);
        }
      });
    }
  };

  const savePage = () => {
    const url = "/api/guest/page/save";

    localStorage.setItem("cookie_id", uniqueId());
    const cookieId = localStorage.getItem("cookie_id");
    console.log(views);

    axios
      .post(url, {
        email: email,
        cookie_id: cookieId,
        book_uuid: book.uuid,
        page_uuid: views[page].id,
      })
      .then((response) => {
        if (response.status == 200) {
          hideSavePageModal();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const shouldSetSavedPage = () => {
    const cookieId = localStorage.getItem("cookie_id");
    if ((pageuuid && cookieId) || (pageuuid && noAdMode)) {
      // alert(pageuuid);
      const url = `/api/page/${pageuuid}/cookieId/${cookieId}`;

      if (pageuuid && noAdMode) {
        if (views.length) {
          for (let i = 0; i < views.length; i++) {
            if (views[i].id == pageuuid) {
              setPage(i);
              setPageWithoutAd(i);
              setPageSaveMode(true);
            }
          }
        }
      } else {
        axios
          .get(url)
          .then((response) => {
            if (response.status == 200) {
              if (views.length) {
                for (let i = 0; i < views.length; i++) {
                  if (views[i].id == pageuuid) {
                    setPage(i);
                    setPageWithoutAd(i);
                    setPageSaveMode(true);
                  }
                }
              }
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("Swiped"),
    onSwipedLeft: (eventData) => showNavigation && paginateRight(), // After LEFT swipe  (SwipeEventData) => void
    onSwipedRight: (eventData) => showNavigation && paginateLeft(),
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

  const paginateRight = () => {
    if (page !== views.length - 1) {
      setPage(page + 1);
      if (views[page].type !== "advert") {
        setPageWithoutAd(pageWithoutAd + 1);
      }
    } else {
      return;
    }
  };

  const paginateLeft = () => {
    if (page !== 0) {
      setPage(page - 1);
      if (views[page].type !== "advert") {
        setPageWithoutAd(pageWithoutAd - 1);
      }
    } else {
      return;
    }
  };

  const restoreNavigation = () => {
    setShowNaviation(true);
  };

  const showSavePageModal = () => {
    if (!pageSaveMode) {
      setIsComponentVisible(false);
      setSavePageModalOpen(true);
    } else {
      setIsComponentVisible(false);
      setSavePagePaymentModalOpen(true);
    }
  };

  const hideSavePageModal = () => {
    setSavePageModalOpen(false);
  };

  const showSavePagePaymentModal = () => {
    setSavePagePaymentModalOpen(true);
  };

  const hideSavePagePaymentModal = () => {
    setSavePagePaymentModalOpen(false);
  };

  const showStripeModal = () => {
    setStripeModalOpen(true);
  };

  const hideStripeModal = () => {
    setStripeModalOpen(false);
  };

  const showRegistrationModal = () => {
    setRegistrationModalOpen(true);
  };

  const hideRegistrationModal = () => {
    setRegistrationModalOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const shouldShowAds = () => {};

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
  };

  useEffect(() => {
    shouldSetSavedPage();
  }, [views]);

  useEffect(() => {
    if (views.length && views[page].type == "advert") {
      setShowNaviation(false);
    }
  }, [page]);

  useEffect(() => {
    getBook();

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
            {showNavigation && (
              <div className="flex items-center justify-center h-screen">
                <LeftPagination
                  ref={refLeftNav}
                  page={page}
                  handleClick={paginateLeft}
                />
              </div>
            )}
          </div>
          <div
            className="main bg-black col-span-6 relative grid items-center"
            {...handlers}
          >
            <div
              className="absolute left-0 bottom-0 right-0  z-40 h-26  text-black"
              style={{ bottom: 10 }}
            >
              <div
                className="w-60 rounded"
                style={{
                  margin: "0 auto",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
              >
                {
                  <>
                    {" "}
                    {views.length &&
                      views[page].type !== "advert" &&
                      !savePageModalOpen && (
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
                          {/* page {pageWithoutAd + 1} of {pagesWithoutAds.length} */}
                          {!noAdMode && (
                            <>
                              {pageWithoutAd !== pagesWithoutAds.length - 1 &&
                                "page " +
                                  (pageWithoutAd + 1) +
                                  " of " +
                                  "Next/Slide"}
                              {pageWithoutAd == pagesWithoutAds.length - 1 &&
                                "page " +
                                  (pageWithoutAd + 1) +
                                  " of " +
                                  "Back/Slide"}
                            </>
                          )}

                          {noAdMode && (
                            <>
                              page {pageWithoutAd + 1} of{" "}
                              {pagesWithoutAds.length}
                            </>
                          )}

                          <i
                            class="fa fa-book text-white cursor-pointer ml-2 z-50 text-1xl"
                            onClick={() =>
                              noAdMode && isAuthUser()
                                ? (document.location.href = `/web/book/${book.uuid}`)
                                : (document.location.href = `/`)
                            }
                          ></i>
                        </p>
                      )}
                  </>
                }

                {views.length && views[page].type == "advert" && (
                  <>
                    <p
                      ref={ref}
                      className={`text-white rounded-full p-2 text-center ${
                        !isComponentVisible && ""
                      } `}
                    >
                      Wait{" "}
                      <CountdownTimer restoreNavigation={restoreNavigation} />{" "}
                      seconds to view the next/previous page or buy Ad Free book
                      for USD ${book.price}
                    </p>
                    <div className="flex justify-center mb-2">
                      {isAuthUser() ? (
                        <StripeForm book={book} />
                      ) : (
                        <BasicButton
                          title={`Ad-Free $${book.price}`}
                          handleClick={showRegistrationModal}
                        />
                      )}
                    </div>
                  </>
                )}

                {/* <p className="text-white">{authUserData.name}</p> */}

                {views.length && views[page].type !== "advert" && (
                  <p
                    ref={ref2}
                    className={`text-white rounded-full p-2 text-center ${
                      !isComponentVisible && "hidden"
                    } `}
                  >
                    {views[page].type !== "info" && (
                      <>
                        <hr className="py-1" />
                        <i
                          class="fas fa-save cursor-pointer"
                          onClick={() => showSavePageModal(page)}
                        ></i>{" "}
                        Save Page Position
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div>{views.length ? views[page].widget : ""}</div>
          </div>
          <div
            className="right col-span-1 h-screen"
            style={{ backgroundColor: "" }}
          >
            {showNavigation && (
              <div className="flex items-center justify-center h-screen">
                <RightPagination
                  ref={refRightNav}
                  page={page}
                  numPages={numPages}
                  handleClick={paginateRight}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <SavePageModal
        modalOpen={savePageModalOpen}
        handleEmailChange={handleEmailChange}
        hideModal={hideSavePageModal}
        savePage={savePage}
        email={email}
        book={book}
      />
      <PageSavePaymentModal
        modalOpen={savePagePaymentModalOpen}
        hideModal={hideSavePagePaymentModal}
        book={book}
      />

      <StripePaymentModal
        modalOpen={stripeModalOpen}
        hideModal={hideStripeModal}
        book={book}
      />

      <RegistrationModal
        modalOpen={registrationModalOpen}
        hideModal={hideRegistrationModal}
        book={book}
      />
    </>
  );
}

export function RenderPDF({ filename, zoomPluginHandle }) {
  return (
    <div className="">
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
  return <img src={process.env.PUBLIC_URL + filename} className="h-full" />;
}

export function RenderAd({ filename }) {
  return (
    <div
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: filename.data }}
    ></div>
  );
}

export function RenderInfoPage({ filename, book }) {
  const [donationAmount, setDonationAmount] = useState(0);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const coverPhoto = filename.cover_photo
    ? filename.cover_photo.split("public")[1]
    : "";
  let styles = {
    cover_Style: {
      backgroundPosition: "50%",
      backgroundImage: `url(${"/storage" + coverPhoto})`,
    },
  };
  const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

  const handleAmountChange = (e) => {
    if (rx_live.test(e)) {
      if (e < 5) {
        setDonationAmount("");
      } else {
        setDonationAmount(e);
      }
    }
  };

  const showPlatformModal = () => {
    setPlatformModalOpen(true);
  };

  const hidePLatformModal = () => {
    setPlatformModalOpen(false);
  };

  useEffect(() => {
    // alert(filename.cover_photo ? "present" : "not present");
  }, []);
  return (
    <div
      className="h-screen flex flex-col items-center justify-center w-full relative"
      style={styles.cover_Style}
    >
      <div
        className={`m-2 p-4 rounded-lg md:w-8/12 my-2 glassmorphism ${
          !filename.cover_photo ? "bg-white" : ""
        }`}
      >
        <h1 className="text-3xl p-1">Release Information</h1>
        <div className="p-4 rounded-lg  h-48 overflow-y-scroll">
          <p className="text-black">{filename.release_information}</p>
        </div>

        <div className="my-2 flex justify-center">
          <BasicButton
            title={`Sign up for updates`}
            handleClick={() => showPlatformModal()}
          />
        </div>
      </div>

      <div
        className={`m-2 p-4 rounded-lg md:w-8/12 flex flex-col md:flex-row justify-between items-center glassmorphism ${
          !filename.cover_photo ? "bg-white" : ""
        }`}
      >
        {/* <BasicButton
          title={`Donate $${filename.donation_amount}`}
          handleClick={() => null}
        /> */}
        <StripeDonateForm book={book} amount={filename.donation_amount} />
        <p>Or</p>
        <div className="flex items-center">
          <TextNumberField
            placeholder={`Enter amount (USD)`}
            classes="rounded-none"
            handleChange={handleAmountChange}
            value={donationAmount}
          />
          <StripeCustomDonateForm book={book} amount={donationAmount} />
        </div>
      </div>
      <PlatformUpdateModal
        modalOpen={platformModalOpen}
        hideModal={hidePLatformModal}
        type={"information_page"}
      />
    </div>
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

export function CountdownTimer({ restoreNavigation }) {
  const countDownDate = new Date().getTime();

  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    if (countDown == 0) {
      clearInterval(interval);
      restoreNavigation();
    }

    return () => clearInterval(interval);
  }, [countDownDate]);

  return <span>{countDown}</span>;
}

export const RightPagination = React.forwardRef((props, ref) => {
  const { page, numPages, handleClick } = props;
  return (
    <i
      ref={ref}
      class="fa fa-greater-than cursor-pointer text-white hidden md:flex"
      className={
        page !== numPages - 1
          ? "fa fa-greater-than cursor-pointer text-white hidden md:flex"
          : "hiden"
      }
      onClick={() => handleClick()}
    ></i>
  );
});

export const LeftPagination = forwardRef((props, ref) => {
  const { page, handleClick } = props;
  return (
    <i
      ref={ref}
      class="fa fa-less-than  cursor-pointer text-white hidden md:flex"
      className={
        page !== 0
          ? "fa fa-less-than cursor-pointer text-white hidden md:flex"
          : "hiden"
      }
      onClick={() => handleClick()}
    ></i>
  );
});

export default WebReader;
