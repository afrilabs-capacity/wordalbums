import TextField from "../../components/inputs/text-input";
import BasicButton from "../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { isAdmin, API_BASE } from "../../Utils/helpers";
import axios from "axios";
export default function CreatePublisher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const url = API_BASE + "/api/publisher-create";
  const addPublisher = () => {
    axios
      .post(url, { name: name, email: email })
      .then((response) => {
        if (response.status == 200) {
          window.location.replace("/publishers");
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  const handleNameChange = (name) => {
    setName(name);
  };
  const handleEmailChange = (email) => {
    setEmail(email);
  };
  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <h1 className="text-2xl m-2 text-center mb-4">Create Publisher</h1>
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <div className="w-8/12 md:w-4/12">
          <div className="m-2">
            <label className="text-black">Name</label>
            <TextField
              classes={"p-6 my-2"}
              placeholder={"Name.."}
              handleChange={handleNameChange}
            />
          </div>
          <div className="m-2">
            <label className="text-black">Email</label>
            <TextField
              classes={"p-6"}
              placeholder={"Email.."}
              handleChange={handleEmailChange}
            />
          </div>
        </div>
        <div>
          <BasicButton
            title={"Create"}
            classes={"p-6"}
            handleClick={addPublisher}
          />
        </div>
      </div>
    </>
  );
}
