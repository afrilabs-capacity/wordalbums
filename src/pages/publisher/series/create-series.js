import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { isAdmin } from "../../../Utils/helpers";
import axios from "axios";
export default function CreateSeries() {
  const [name, setName] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("mm");
  const [publisherId, setPublisherId] = useState("");
  const [fileSelected, setFileSelected] = useState("");

  const url = "/api/series-create";
  let { userId } = useParams();
  const previewImageRef = useRef();
  const addPublisher = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("user_id", publisherId);
    formData.append("cover_photo", coverPhoto);
    axios
      .post(url, formData)
      .then((response) => {
        if (response.status == 200) {
          window.location.href = "/publisher/publications/series/" + userId;
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
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  useEffect(() => {
    setPublisherId(userId);
    if (!isAdmin()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="bg-white m-2 p-2 flex justify-between shadow">
        <div>
          <h1 className="text-2xl text-center m-2 font-bold">Create Series</h1>
        </div>
        <div>
          <BasicButton
            title={"Go Back"}
            handleClick={() => window.history.back()}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <div className="w-8/12 md:w-4/12 bg-gray-50 p-4">
          <div className="m-2 mb-8">
            <label className="text-black">Series Name</label>
            <TextField
              classes={"p-6 my-2"}
              placeholder={"Name.."}
              handleChange={handleNameChange}
            />
          </div>
          <div className="m-2 text-center">
            <label className="text-black m-2">Series Photo (Optional)</label>
            <div className="flex justify-center my-2">
              {!fileSelected && (
                <div className="w-32 h-32 bg-gray-100 p-2">
                  <div className="flex flex-col justify-center  h-full">
                    <i class="fa fa-plus cursor-pointer text-green-500"></i>
                    <p className="text-xs">Click to upload</p>
                    <p className="text-xs"> (jpeg, jpg, png)</p>
                    <label className="my-2">
                      <input
                        type="file"
                        onChange={(e) => uploadCover(e)}
                        class="text-sm 
                        text-grey-500
                        file:mr-2
                        file:py-2
                        file:px-2
                        file:rounded-full
                        file:border-0
                        file:text-md
                        file:font-semibold
                        file:text-white
                        file:bg-gradient-to-r
                        file:from-blue-600
                        file:to-amber-600
                        hover:file:cursor-pointer
                        hover:file:opacity-80"
                      />
                    </label>
                    {/* <input type="file" onChange={(e) => uploadCover(e)} /> */}
                  </div>
                </div>
              )}

              {fileSelected && (
                <div className="w-32 h-32 bg-gray-100 p-2 relative">
                  <img src={fileSelected} className="w-full" />
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

          <div className="my-8 text-center">
            <br />
            <BasicButton
              disabled={!name || !fileSelected}
              title={"Create"}
              classes={"p-6 w-9/12 mt-4"}
              handleClick={addPublisher}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
