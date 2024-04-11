import React, { useState } from "react";
import Goback from "../components/Goback";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateBook() {
  const [create, setCreate] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);

  var navigate = useNavigate();

  const inputHandler = (event) => {
    setCreate({ ...create, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(create);
    setLoading(true);
    axios
      .post("http://localhost:5000/books", {
        title: create.title,
        author: create.author,
        publishYear: create.publishYear,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card w-50 m-auto">
      <div className="d-flex px-3 py-3">
        <Goback />
      </div>
      <div className="card-body">
        <h2 className="pb-4">Create Book</h2>
        {loading ? <Spinner /> : ""}

        <form onSubmit={handleSubmit}>
          <div class="mb-3 row">
            <div className="col-3">
              <label htmlFor="title" class="form-label">
                Title :
              </label>
            </div>
            <div className="col-8 ">
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                value={create.title}
                onChange={inputHandler}
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
                value={create.author}
                onChange={inputHandler}
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
                value={create.publishYear}
                onChange={inputHandler}
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

export default CreateBook;
