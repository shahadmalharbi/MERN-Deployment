import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const DeleteButton = (props) => {
  const { movieId, successCallback } = props;
  const history = useHistory();
  const deleteMovie = (e) => {
    axios
      .delete("http://localhost:8000/api/movies/delete/" + movieId)
      .then((res) => {
        successCallback();
        history.push("/");
      });
  };
  return (
    <button className="btn btn-danger m-1" onClick={deleteMovie}>
      Delete Movie 
    </button>
  );
};

export default DeleteButton;