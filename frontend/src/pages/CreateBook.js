import React, { useState } from "react";
import Goback from "../components/Goback";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleBookSave = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/books", data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="container p-5">
      <Goback />
      <h3 className="mt-3 text-center">Create Book</h3>
      {loading ? <Spinner /> : ""}
      <div className="row">
        <div className="col-6 border border-2 border-secondary m-auto px-4 py-4">
          <div className="mb-3 mt-3">
            <label for="title" class="form-label">
              Title :
            </label>
            <input
              type="text"
              class="form-control border border-2 border-secondary m-auto"
              id="title"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="author" class="form-label">
              Author :
            </label>
            <input
              type="author"
              class="form-control border border-2 border-secondary m-auto"
              id="author"
              placeholder="Enter author"
              name="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="publishYear" class="form-label">
              publishYear:
            </label>
            <input
              type="publishYear"
              class="form-control border border-2 border-secondary m-auto"
              id="publishYear"
              placeholder="Enter publishYear"
              name="publishYear"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleBookSave}
            class="btn btn-primary w-100 m-auto px-3 mb-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;
