import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [createContact, setCreateContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [updContact, setUpdContact] = useState({
    name: "",
    email: "",
    phone: "",
    _id: "",
  });
  const token = localStorage.getItem("accessToken");

  const loadData = async () => {
    const response = await fetch("http://localhost:5001/api/contacts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    setContacts(json);
  };

  const handleModel = async (e) => {
    const id = e.target.value;
    const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    setUpdContact(json);
  };

  function handleUpdChange(e) {
    return setUpdContact({
      ...updContact,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    return setCreateContact({
      ...createContact,
      [e.target.name]: e.target.value,
    });
  }

  const handleCreate = async () => {
    const response = await fetch("http://localhost:5001/api/contacts/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: createContact.name,
        email: createContact.email,
        phone: createContact.phone,
      }),
    });
    const json = await response.json();
    console.log(json);
    loadData();
    setCreateContact({ name: "", email: "", phone: "" });
  };

  const handleUpdate = async (e) => {
    const id = e.target.value;
    const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: updContact.name,
        email: updContact.email,
        phone: updContact.phone,
      }),
    });
    const json = await response.json();
    console.log(json);
    loadData();
    setUpdContact({ name: "", email: "", phone: "", _id: "" });
  };

  const handleDelete = async (e) => {
    const id = e.target.value;
    const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div style={{ width: "60%", marginLeft: "20%", marginTop: "10%" }}>
      {/* <!-- Button trigger modal --> */}

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn mr-auto btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Contact
        </button>
        {token ? (
          <Link
            className="btn btn-danger mr-auto"
            onClick={() => localStorage.removeItem("accessToken")}
            to="/login"
          >
            Logout
          </Link>
        ) : (
          <Link className="btn btn-success mr-auto" to="/login">
            Login
          </Link>
        )}
      </div>

      {/* <!-- Modal for Create Contact--> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      name="name"
                      value={createContact.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      email:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      name="email"
                      value={createContact.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      name="phone"
                      value={createContact.phone}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">S No.</th>
            <th scope="col">Name</th>
            <th scope="col">email</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {token &&
            contacts.map((x, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.phone}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      value={x._id}
                      onClick={handleModel}
                    >
                      Update
                    </button>

                    {/* <!-- Modal for Update Contact--> */}
                    <div
                      className="modal fade"
                      id="exampleModal1"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel1"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel1">
                              Create Contact
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="modal-body">
                              <form>
                                <div className="mb-3">
                                  <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                  >
                                    Name:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="recipient-name"
                                    onChange={handleUpdChange}
                                    name="name"
                                    value={updContact.name}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                  >
                                    email:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="recipient-name"
                                    onChange={handleUpdChange}
                                    name="email"
                                    value={updContact.email}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                  >
                                    Phone Number:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="recipient-name"
                                    onChange={handleUpdChange}
                                    name="phone"
                                    value={updContact.phone}
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={handleUpdate}
                              value={updContact._id}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      value={x._id}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
