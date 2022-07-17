import axios from "axios";
import { useEffect, useState } from "react";
import BasicButton from "../../components/buttons/basic-button";
export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const url = "/api/publishers";
  const getPublishers = () => {
    axios
      .post(url)
      .then((response) => {
        if (response.status == 200) {
          setPublishers(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getPublishers();
  }, []);
  return (
    <>
      <div className="main">
        <div className="bg-white m-2 p-2 flex justify-between shadow">
          <div>
            <h1 className="text-2xl text-center m-2 bold">Publishers</h1>
          </div>
          <div>
            <a href="/publisher/create-publisher">
              <BasicButton title={"Create Publisher"} handleClick={null} />
            </a>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <div class="rounded-t-xl overflow-hidden bg-white p-10">
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-gray-600">Publisher</th>
                  <th class="px-4 py-2 text-gray-600">Email</th>
                  <th class="px-4 py-2 text-gray-600">Series</th>
                  <th class="px-4 py-2 text-gray-600">Books</th>
                  <th class="px-4 py-2 text-gray-600">Publications</th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((publisher) => {
                  return (
                    <tr>
                      <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        {publisher.name}
                      </td>
                      <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        {publisher.email}
                      </td>

                      <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        <a href={`/publisher/create-series/${publisher.id}`}>
                          <BasicButton
                            classes={"bg-teal-500 hover:bg-teal-400"}
                            title={"Create Series"}
                            handleClick={null}
                          />
                        </a>
                      </td>
                      <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        <a href="/publisher/create-book">
                          <BasicButton
                            classes={"bg-green-500 hover:bg-green-400"}
                            title={"Create Book"}
                            handleClick={null}
                          />
                        </a>
                      </td>
                      <td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                        <a
                          href={`/publisher/publications/options/${publisher.id}`}
                        >
                          <BasicButton
                            classes={"bg-indigo-500 hover:bg-indigo-400"}
                            title={"Plublications"}
                            handleClick={null}
                          />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
