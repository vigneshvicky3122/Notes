import React, { useState } from "react";
import { url } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar({ Data, setData }) {
  const navigate = useNavigate();
  const [Tittle, setTittle] = useState("");
  const [Description, setDescription] = useState("");

  async function AddTask(e) {
    e.preventDefault();

    let data = {
      id: Date.now(),
      tittle: Tittle,
      description: Description,
      status: "pending",
      createdAt: Date.now(),
      submittedTime: null,
    };

    if (Data === undefined) {
      setData([data]);
    } else {
      let update = [...Data];
      update.push(data);
      setData(update);
    }
    try {
      let result = await axios.post(
        `${url}/add-task`,
        { data },
        {
          headers: {
            Authorization: window.localStorage.getItem("app-token"),
            user_id: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (result.data.statusCode === 200) {
        setTittle("");
        setDescription("");
        document.querySelector(".add-close-btn").click();
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
  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Notes
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Notes
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/dashboard"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#AddModal"
                    href="#!"
                  >
                    Add New Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/login"
                    onClick={() => window.localStorage.clear()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="AddModal"
        tabIndex="-1"
        aria-labelledby="AddModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddModalLabel">
                Create New Note
              </h1>
              <button
                type="button"
                className="btn-close add-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={AddTask}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Tittle:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => setTittle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    onChange={(e) => setDescription(e.target.value)}
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
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
