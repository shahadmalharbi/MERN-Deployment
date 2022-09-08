import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import DeleteButton from './DeleteButton'

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/movies")
      .then((res) => {
        console.log(res);
        setMovies(res.data.movies);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5 p-2">
      <div className="d-flex justify-content-start">
        <h1 className="display-4">Movies List:</h1>
      </div>
      <div className="d-flex justify-content-end">
        <Link to="movie/new" className="btn btn-secondary m-2">
          add new Movie
        </Link>
      </div>
      <div className="row">
        <table className="table border border-dark">
          <thead className="table-active">
            <tr>
              <th>Movie Title</th>
              {/* <th>Avg Rating</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                {/* { movie.reviewer.map((reviews) => {
                return (
                    <td>{reviews.rating}</td>
                );
              })} */}
                <td>
                  <Link to={`/moives/${movie._id}`} className="btn btn-dark m-1">
                    Read Reviews
                  </Link>
                  |
                  <Link
                    to={`/movies/${movie._id}/review`}
                    className="btn btn-dark m-1"
                  >
                    Write a Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;