import React, { useEffect, useState } from "react";
import Goback from "../components/Goback";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleBookEdit = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
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
      <h3 className="mt-3">Create Book</h3>
      {loading ? <Spinner /> : ""}
      <div className="row">
        <div className="col-6 border border-2 border-secondary m-auto px-4 py-4">
          <div className="mb-3 mt-3">
            <label for="email" class="form-label">
              Title :
            </label>
            <input
              type="text"
              class="form-control border border-2 border-secondary m-auto"
              id="email"
              placeholder="Enter title"
              name="email"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="email" class="form-label">
              Author :
            </label>
            <input
              type="email"
              class="form-control border border-2 border-secondary m-auto"
              id="email"
              placeholder="Enter author"
              name="email"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="email" class="form-label">
              publishYear:
            </label>
            <input
              type="email"
              class="form-control border border-2 border-secondary m-auto"
              id="email"
              placeholder="Enter publishYear"
              name="email"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleBookEdit}
            class="btn btn-primary w-100 m-auto px-3 mb-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
