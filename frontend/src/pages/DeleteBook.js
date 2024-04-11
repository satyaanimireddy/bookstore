import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Goback from "../components/Goback";
import axios from "axios";
import { useSnackbar } from "notistack";

function DeleteBook() {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  var navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });

        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });

        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <Goback />
      <h2 className="py-4">Delete Book</h2>
      {loading ? <Spinner /> : ""}
      <div className="py-4 border border-2 w-50 d-flex flex-column">
        <div className="d-flex justify-content-center flex-column">
          <p>Are you sure to delete</p>
          <button
            onClick={handleDeleteBook}
            className="btn btn-danger w-25 m-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
