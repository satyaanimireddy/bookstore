import React, { useEffect, useState } from "react";
import Goback from "../components/Goback";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const { _id, title, author, publishYear } = book;
  return (
    <div className="container">
      <Goback />
      <h2 className="py-3">ShowBook</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row p-5 border border-2 bg-info">
          <div className="col-9">
            <div>
              <span>Id: </span>
              <span>{_id}</span>
            </div>
            <div>
              <span>Title: </span>
              <span>{title}</span>
            </div>
            <div>
              <span>Author: </span>
              <span>{author}</span>
            </div>
            <div>
              <span>publishYear: </span>
              <span>{publishYear}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;
