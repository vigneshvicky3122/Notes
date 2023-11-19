import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { url } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import moment from "moment";
function Dashboard() {
  useEffect(() => {
    GetData();
  }, []);
  const navigate = useNavigate();
  const [Data, setData] = useState([{}]);
  const TaskId = useRef("");
  const [SearchValue, setSearchValue] = useState("");
  const [EditTittle, setEditTittle] = useState("");
  const [EditDescription, setEditDescription] = useState("");
  const [AlertMessage, setAlertMessage] = useState("");

  async function GetData() {
    try {
      let result = await axios.get(`${url}/get-data`, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
          user_id: window.localStorage.getItem("UserId"),
        },
      });
      if (result.data.statusCode === 200) {
        setData(result.data.Tasks);
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function GetTask(id) {
    try {
      let result = await axios.get(`${url}/get-task/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
          user_id: window.localStorage.getItem("UserId"),
        },
      });
      if (result.data.statusCode === 200) {
        let findObject = result.data.Tasks[0].tasks.filter((f) => f.id === id);
        setEditTittle(findObject[0].tittle);
        setEditDescription(findObject[0].description);
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.Message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function UpdateTask(e) {
    e.preventDefault();

    let update = [...Data];
    let index = update.findIndex((obj) => obj.id === TaskId.current);
    update[index].tittle = EditTittle;
    update[index].description = EditDescription;
    setData(update);
    try {
      let result = await axios.put(
        `${url}/update-task/${TaskId.current}`,
        {
          tittle: EditTittle,
          description: EditDescription,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
            user_id: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (result.data.statusCode === 200) {
        document.querySelector(".close-btn-edit").click();
        setEditTittle("");
        setEditDescription("");
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");

        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
      }
      if (result.data.statusCode === 401) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");

        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function UpdateStatus(id) {
    let update = [...Data];
    let index = update.findIndex((obj) => obj.id === id);

    update[index].status = "completed";
    update[index].submittedTime = Date.now();
    setData(update);
    try {
      let result = await axios.put(
        `${url}/task-status/${id}`,
        { status: "completed", time: Date.now() },
        {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
            user_id: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (result.data.statusCode === 200) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      if (result.data.statusCode === 401) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");

        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.Message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function Reassign(id) {
    let update = [...Data];
    let index = update.findIndex((obj) => obj.id === id);

    update[index].status = "pending";
    update[index].submittedTime = null;
    setData(update);
    try {
      let result = await axios.put(
        `${url}/reassign/${id}`,
        { status: "pending" },
        {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
            user_id: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (result.data.statusCode === 200) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      if (result.data.statusCode === 401) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");

        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.Message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function DeleteTask(id) {
    let update = [...Data];
    let index = Data.findIndex((obj) => obj.id == id);

    update.splice(index, 1);
    setData(update);
    try {
      let result = await axios.delete(`${url}/delete-task/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("app-token"),
          user_id: window.localStorage.getItem("UserId"),
        },
      });
      if (result.data.statusCode === 200) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      if (result.data.statusCode === 401) {
        setAlertMessage(result.data.message);
        const toastLiveExample = document.getElementById("liveToast");

        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);

        toastBootstrap.show();
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar setData={setData} Data={Data} />
      <div className="search-area">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="searchBar"
            aria-describedby="button-addon2"
            onBlur={() => setSearchValue("")}
            onChange={(e) => setSearchValue(e.target.value)}
            value={SearchValue}
          />
        </div>
      </div>
      <div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {Data &&
            Data.filter(
              (a) =>
                a.status === "pending" &&
                a.tittle.toLowerCase().startsWith(SearchValue.toLowerCase())
            ).map((element, index) => {
              return (
                <>
                  <div className="col" key={index}>
                    <div
                      className={
                        element.status === "completed"
                          ? "card border-2 border-success"
                          : "card border-2 border-warning"
                      }
                    >
                      <div className="card-body">
                        <h5 className="card-title">{element.tittle}</h5>
                        <p className="card-text">{element.description}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {moment(element.createdAt).fromNow()}
                          </small>
                        </p>
                        {element.status === "pending" ? (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                UpdateStatus(element.id);
                              }}
                            >
                              Complete
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#EditModal"
                              onClick={() => {
                                TaskId.current = element.id;
                                GetTask(element.id);
                              }}
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                DeleteTask(element.id);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          {Data &&
            Data.filter(
              (a) =>
                a.status === "completed" &&
                a.tittle.toLowerCase().startsWith(SearchValue.toLowerCase())
            ).map((element, index) => {
              return (
                <>
                  <div className="col" key={index}>
                    <div
                      className={
                        element.status === "completed"
                          ? "card border-2 border-success"
                          : "card border-2 border-warning"
                      }
                    >
                      <div className="card-body">
                        <h5 className="card-title">{element.tittle}</h5>
                        <p className="card-text">{element.description}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {moment(element.createdAt).fromNow()}
                          </small>
                        </p>
                        {element.status === "completed" ? (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                Reassign(element.id);
                              }}
                            >
                              Re-Assign
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                DeleteTask(element.id);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>

      <div
        className="modal fade"
        id="EditModal"
        tabIndex="-1"
        aria-labelledby="EditModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditModalLabel">
                Rewrite the Note
              </h1>
              <button
                type="button"
                className="btn-close close-btn-edit"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={UpdateTask}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Tittle:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => {
                      setEditTittle(e.target.value);
                    }}
                    value={EditTittle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    onChange={(e) => {
                      setEditDescription(e.target.value);
                    }}
                    value={EditDescription}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTju-XcQahsYxxIvkaG-kOGNU42kccKNpgVWJR1oUZBJo2B-qQO"
              className="rounded me-2"
              alt="..."
              width={"20px"}
              height={"20px"}
            />
            <strong className="me-auto">Notes</strong>
            <small>1 minutes ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setAlertMessage("")}
            ></button>
          </div>
          <div className="toast-body">{AlertMessage}</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
