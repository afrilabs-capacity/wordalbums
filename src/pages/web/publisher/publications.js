import TextField from "../../../components/inputs/text-input";
import BasicButton from "../../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WebHeader from "../header";
import { API_BASE } from "../../../Utils/helpers";
import axios from "axios";
export default function WebPublications() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publications, setPublications] = useState([]);
  const [publisher, setPublisher] = useState({});
  let { uuid } = useParams();

  const url = API_BASE + "/api/publisher/" + uuid;
  const getPublisher = () => {
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setPublisher(response.data.publisher);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getPublisher();
  }, []);

  return (
    <>
      <WebHeader />

      <div className="flex flex-col justify-center items-center bg-black h-full">
        <div className="w-8/12 md:w-10/12 ">
          <div className="grid  md:grid-cols-3 items-start gap-4">
            <div>
              <div class="text-center mt-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                  class="rounded-full w-32 mb-4 mx-auto"
                  alt="Avatar"
                />

                <h5 class="text-xl font-medium leading-tight mb-2 text-white">
                  {publisher && publisher.name}
                </h5>
                {/* <p class="text-gray-500">Publisher</p> */}
                <div className="flex justify-center">
                  <a href={`/web/publisher/publications/options/`}>
                    {/* <BasicButton title={`Publications`} /> */}
                  </a>
                </div>
              </div>
            </div>
            <div className="justify-center p-2 col-span-2 bg-black ">
              {" "}
              <h1 className="text-center text-2xl font-bold my-6 text-white">
                Series
              </h1>
              <div className=" flex justify-center border border-side border-gray-500 p-4">
                <div className="grid md:grid-cols-2 content-center gap-4">
                  {publisher &&
                    publisher.series &&
                    publisher.series.map((publication) => (
                      <a
                        href={`/web/publisher/${uuid}/publications/series/${publication.id}`}
                      >
                        <div className="text-center flex flex-col items-center">
                          <img
                            className="w-8/12"
                            src={
                              "https://wordalbums1.test/storage/" +
                              publication.cover_photo.split("public")[1]
                            }
                          />
                          <p className="text-lg text-white">
                            {publication.name}
                          </p>
                          {/* <p className="text-gray-300">By {publication.name}</p> */}
                        </div>
                      </a>
                    ))}
                </div>
              </div>
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
