import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between py-5 px-2">
        <h2>Book list</h2>
        <Link to={`/books/create`} className="fs-2">
          <i class="bi bi-plus-lg"></i>
        </Link>
      </div>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <table className="w-100 border border-4 border-secondary fs-4">
          <thead>
            <tr>
              <th className="border border-2 border-secondary">No</th>
              <th className="border border-2 border-secondary">Title</th>
              <th className="border border-2 border-secondary">Author</th>
              <th className="border border-2 border-secondary">PublishYear</th>
              <th className="border border-2 border-secondary">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td className="border border-2 border-secondary">
                    {index + 1}
                  </td>
                  <td className="border border-2 border-secondary">
                    {book.title}
                  </td>
                  <td className="border border-2 border-secondary">
                    {book.author}
                  </td>
                  <td className="border border-2 border-secondary">
                    {book.publishYear}
                  </td>
                  <td className="border border-2 border-secondary">
                    <div className="d-flex justify-content-around">
                      <Link to={`/books/details/${book._id}`}>
                        <i class="bi bi-info-circle-fill"></i>
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <i class="bi bi-pencil-fill"></i>
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <i class="bi bi-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
