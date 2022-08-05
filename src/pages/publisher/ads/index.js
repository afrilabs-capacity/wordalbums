import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TextArea from "../../../components/inputs/text-area";
import { isAdmin, API_BASE } from "../../../Utils/helpers";
import axios from "axios";
export default function AdHome() {
  const [adverts, setAdverts] = useState([]);
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const getAds = () => {
    const url = API_BASE + "/api/adverts";
    axios
      .get(url, {})
      .then((response) => {
        if (response.status == 200) {
          setAdverts(response.data.adverts);
          //   window.location.href = `/publisher/${userId}/publications/series/${seriesId}`;
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const deleteAd = (advert) => {
    const url = API_BASE + "/api/advert/delete/" + advert.id;
    axios
      .delete(url)
      .then((response) => {
        if (response.status == 200) {
          getAds();
          //   window.location.href = `/publisher/${userId}/publications/series/${seriesId}`;
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const handleNameChange = (e) => {
    setName(e);
  };
  const handleDataChange = (e) => {
    setData(e);
  };

  const updateAd = () => {};

  useEffect(() => {
    getAds();
    if (!isAdmin()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="bg-white m-2 p-2 flex justify-between shadow">
        <div>
          <h1 className="text-2xl text-center m-2 font-bold">Ads</h1>
        </div>
        <div>
          <BasicButton
            title={"Go Back"}
            handleClick={() => window.history.back()}
          />
          <a href="/ads/create">
            <BasicButton
              title={"Create Ad Unit"}
              classes={"bg-teal-500 mx-2"}
              handleClick={() => null}
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <div className="w-8/12 md:w-11/12 grid  grid-cols-3  p-4">
          {adverts.map((advert) => {
            return (
              <div className="p-2 bg-gray-50 m-2 rounded relative">
                <div
                  className="bg-white rounded rounded-full bg-white p-0  right-0 absolute px-1 cursor-pointer"
                  style={{ top: -13 }}
                  onClick={() => deleteAd(advert)}
                >
                  <i class="fa fa-times-circle text-red-500  z-50 text-2xl"></i>
                </div>
                <label className="text-gray-500">
                  <span className="text-black">Name:</span> {advert.name}
                </label>
                <p className="text-gray-500 my-1">
                  <span className="text-black">Ad ID:</span>
                </p>
                <p className="text-gray-500 mb-2">{advert.uuid}</p>

                <p className="text-black">Ad Code</p>
                <TextArea value={advert.data} handleClick={handleDataChange} />
                <div className="mb-4 text-center">
                  <BasicButton
                    disabled={!name || !data}
                    title={"Update"}
                    classes={"p-6 w-full mt-4"}
                    handleClick={updateAd}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </>
  );
}
