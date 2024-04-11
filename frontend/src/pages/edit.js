import React, { useState } from "react";
import Goback from "../components/Goback";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdateId] = useState("");
  var navigate = useNavigate();
  const { id } = useParams();

  const handleEditBook = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, {
        title: updateId.title,
        author: updateId.author,
        publishYear: updateId.publishYear,
      })
      .then((res) => {
        console.log(res);
        setUpdateId(res);
        setLoading(false);
        navigate("/");
      })
      .then((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card w-50 m-auto">
      <div className="d-flex px-3 py-3">
        <Goback />
      </div>
      <div className="card-body">
        <h2 className="pb-4">Edit Book</h2>
        <form onSubmit={handleEditBook}>
          <div class="mb-3 row">
            <div className="col-3">
              <label htmlFor="title" class="form-label">
                Title :
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                value={updateId.title}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div className="col-3">
              <label htmlFor="author" class="form-label">
                Author :
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                class="form-control"
                id="author"
                name="author"
                value={updateId.author}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div className="col-3">
              <label htmlFor="publishYear" class="form-label">
                PublishYear :
              </label>
            </div>
            <div className="col-8">
              <input
                type="text"
                class="form-control"
                id="publishYear"
                name="publishYear"
                value={updateId.publishYear}
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary my-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
