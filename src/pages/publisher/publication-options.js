import TextField from "../../components/inputs/text-input";
import BasicButton from "../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function PublicationOptions() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publications, setPublications] = useState([]);

  let { userId } = useParams();

  return (
    <>
      <div className="bg-white m-2 p-2 flex justify-between shadow">
        <div>
          <h1 className="text-2xl text-center m-2 bold">Publications</h1>
        </div>
        <div>
          <BasicButton
            title={"Go Back"}
            handleClick={() => window.history.back()}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <div className="w-8/12 md:w-10/12">
          <div className="grid  md:grid-row-2 content-center gap-4">
            <div className="text-center">
              <a href={`/publisher/publications/series/${userId}`}>
                <BasicButton
                  classes={"bg-indigo-500 hover:bg-indigo-400 w-4/12 py-6"}
                  title={"Series"}
                  handleClick={null}
                />
              </a>
            </div>
            <div className="text-center">
              <a href={`/publisher/publications/books/${userId}`}>
                <BasicButton
                  classes={"bg-indigo-500 hover:bg-indigo-400 w-4/12 py-6"}
                  title={"Books"}
                  handleClick={null}
                />
              </a>
            </div>
          </div>
        </div>
        {/* <div>
          <BasicButton
            title={"Create"}
            classes={"p-6"}
            handleClick={() => null}
          />
        </div>{" "} */}
      </div>
    </>
  );
}
