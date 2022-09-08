import React, { useState, useEffect } from "react";
import { useHistory, useParams ,Link} from "react-router-dom";
import axios from "axios";

const CreateReview = (props) => {
  const [movie, setMovie] = useState({});
  const [reviewer, setReviewer]= useState({
    name: "",
    rating: 0,
    review: "",
  })

  const { id } = useParams();
  const [reviewerCreated, setReviewerCreated] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const handleChange = (event) => {
    setReviewer({ ...reviewer, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    
    axios
      .get(`http://localhost:8000/api/movies/${id}`)
      .then((response) => {
        console.log("response after trying to get one movie", response);
        setMovie(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    setReviewerCreated(false)
    axios
      .post("http://localhost:8000/api/reviewer/new/"+id, reviewer)
      .then((response) => {
        setReviewer(response.data);
         setReviewerCreated(true)
         setTimeout(() => history.push(`/moives/${movie._id}`), 2000);
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
        }
        setErrors(errorMessages);
      });
  };
  return (
    <div className="container mt-5 p-1">
      <div className="d-flex justify-content-between">
        <h1 className="display-4">Add Reviewer to {movie.title}</h1>
      </div>
      {errors.map((errorMessage, index) => (
        <div key={index} className="alert alert-danger col-6 container">
          Error: {errorMessage}
        </div>
      ))}
      {reviewerCreated && (
        <div className="alert alert-success">
          Reviewer has been successfully created
        </div>
      )}
            <div className="container col-9">
        <form onSubmit={handleSubmit}>
          <div className="row">
              <div className="form-group row m-2">
                <label className=" col-form-label text-primary h1">
                  Your Name:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control m-1"
                    name="name"
                    onChange={handleChange}
                    value={reviewer.name}
                  />
                </div>
                <label className=" col-form-label text-primary h1">
              Rating
              </label>
              <div className="col-sm-10">
              <select
              className="form-select"
              aria-label="Default select example"
              name="rating"
              onChange={handleChange}
              value={reviewer.rating}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
              </div>
              </div>
              <label className=" col-form-label text-primary h1">
              Your Review:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control m-1"
                  name="review"
                  onChange={handleChange}
                  value={reviewer.review}
                />
              </div>
            </div>
          <button className="btn btn-primary m-2">Submit</button>
        </form>
      </div>
          <div>
          <Link to="/" className="btn btn-danger m-2">
           Cancel
          </Link>
        </div>
      </div>
  );
};

export default CreateReview;