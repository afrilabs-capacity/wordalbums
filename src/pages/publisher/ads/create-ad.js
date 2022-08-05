import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TextArea from "../../../components/inputs/text-area";
import { isAdmin, API_BASE } from "../../../Utils/helpers";
import axios from "axios";
export default function CreateAdvert() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  const url = API_BASE + "/api/advert-create";
  const addAdvert = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("data", data);
    axios
      .post(url, formData)
      .then((response) => {
        if (response.status == 200) {
          window.location.href = `/ads`;
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

  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="bg-white m-2 p-2 flex justify-between shadow">
        <div>
          <h1 className="text-2xl text-center m-2 font-bold">Create Advert</h1>
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
          <div className="m-2 mb-6">
            <label className="text-black">Name</label>
            <TextField
              classes={"p-6 my-2"}
              placeholder={"Name.."}
              handleChange={handleNameChange}
            />
          </div>
          <div className="m-2 mb-6">
            <label className="text-black">Ad Code</label>
            <TextArea
              classes={"p-6 my-2"}
              placeholder={"Name.."}
              handleChange={handleDataChange}
            />
          </div>

          <div className="my-8 text-center">
            <br />
            <BasicButton
              disabled={!name || !data}
              title={"Create"}
              classes={"p-6 w-9/12 mt-4"}
              handleClick={addAdvert}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
