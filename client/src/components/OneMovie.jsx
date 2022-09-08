import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const OneMovie = (props) => {
  const [movie, setMovie] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((response) => {
        console.log("response after trying to get one movie", response);
        setMovie(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/movies")
      .then((res) => {
        console.log(res);
        setMovies(res.data.movies);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);
  const removeFromDom = (movieId) => {
    setMovies(movies.filter((movie) => movie._id !== movieId));
  };

  return (
    <div className="container mt-5 p-2">
      <div className="d-flex justify-content-end">
                <Link to="/" className="btn btn-secondary m-2">
           Back to Movies List
          </Link>
          </div>
      <div className="d-flex justify-content-start">
        <h1 className="display-4">Reviews for {movie.title}:</h1>
      </div>
      <div className="row">
        <table className="table border border-dark">
          <thead className="table-active">
            <tr>
              <th>Reviewer</th>
              <th>Rating</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {isLoaded &&
              movie.reviewer.map((reviews, index) => {
                return (
                  <tr key={index}>
                    <td>{reviews.name}</td>
                    <td>{reviews.rating}</td>
                    <td>{reviews.review}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="col-3">
          <DeleteButton
            movieId={movie._id}
            successCallback={() => removeFromDom(movie._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default OneMovie;
