import TextField from "../../../../components/inputs/text-input";
import BasicButton from "../../../../components/buttons/basic-button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WebHeader from "../../header";
import axios from "axios";
export default function WebSeries() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publication, setPublication] = useState([]);
  let { useruuid } = useParams();
  let { seriesId } = useParams();
  const getPublication = () => {
    const url = "/api/series/" + seriesId + "/publisher/" + useruuid;
    axios
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setPublication(response.data.series);
          //   console.log(response.data.series);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getPublication();
  }, []);

  return (
    <>
      <WebHeader />

      <div className="flex flex-col justify-center items-center bg-black h-full">
        <div className="md:w-10/12 ">
          <div className="grid md:grid-cols-3 items-center gap-4">
            <div>
              {publication && publication.cover_photo && (
                <div className="flex flex-col items-center p-4">
                  <img
                    className="md:w-6/12"
                    src={
                      "https://wordalbums1.test/storage/" +
                      publication.cover_photo.split("public")[1]
                    }
                  />
                  <div>
                    {/* <p className="text-black">Title</p> */}
                    <p className="text-white">{publication.name}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="justify-center p-2 col-span-2 bg-black">
              <h1 className="text-center text-2xl font-bold my-6 text-white">
                Books
              </h1>
              <hr className="text-white" />
              {publication && (
                <div className="md:w-10/12">
                  <div className="grid grid-cols-2 md:grid-cols-3 content-start gap-4 p-2">
                    {publication.books &&
                      publication.books.map((publication) => (
                        <a href={`/web/reader/${publication.uuid}`}>
                          <div>
                            <img
                              className="md:w-8/12"
                              src={
                                "https://wordalbums1.test/storage/" +
                                publication.cover_photo.split("public")[1]
                              }
                            />
                            <p className="font-bold text-2xl">
                              {publication.name}
                            </p>
                            <p className="text-gray-300">
                              By {publication.name}
                            </p>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}
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
