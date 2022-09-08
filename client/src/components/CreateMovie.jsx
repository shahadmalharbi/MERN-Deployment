import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MovieForm from "./MovieForm";

const CreateMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    name: "",
    rating: 0,
    review: "",
  });

  const [movieCreated, setMovieCreated] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  //Methods

  const handleChange = (event) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setMovieCreated(false);
    setErrors([]);
    console.log(movie);
    const copiedMovie = {
      title: movie.title,
      reviewer: {
        name: movie.name,
        rating: movie.rating,
        review: movie.review,
      },
    };
    axios
      .post("http://localhost:8000/api/movies/new", copiedMovie)
      .then((response) => {
        setMovieCreated(true);
        setTimeout(() => history.push("/"), 2000);
      })
      .catch((err) => {
        console.log(err);
        const data = err.response.data;
        const errorMessages = [];
        if ("errors" in data) {
          for (let field in data.errors) {
            const validationError = data.errors[field];
            errorMessages.push(validationError.message);
          }
        } else {
          errorMessages.push("Name is already exist!");
        }
        setErrors(errorMessages);
      });
  };
  return (
    <div className="container mt-5 p-2 col-7">
      <div className="d-flex justify-content-between">
        <h1 className="display-4">Add a Movie</h1>
      </div>
      {errors.map((errorMessage, index) => (
        <div key={index} className="alert alert-danger">
          Error: {errorMessage}
        </div>
      ))}
      {movieCreated && (
        <div className="alert alert-success">
          Movie has been successfully created
        </div>
      )}
      <div className="row border">
        <MovieForm
          movie={movie}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateMovie;
