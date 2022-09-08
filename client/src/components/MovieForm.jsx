import {Link} from "react-router-dom";

const PirateForm = (props) => {
    const {movie ,handleChange,handleSubmit } = props;
    return (
      <div className="container col-9 border">
        <form onSubmit={handleSubmit}>
          <div className="row">
              <div className="form-group row m-2">
                <label className=" col-form-label text-primary h1">
                   Movie Title :
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control m-1"
                    name="title"
                    onChange={handleChange}
                    value={movie.title}
                  />
                </div>
  
                <label className=" col-form-label text-primary h1">
                  Your Name:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control m-1"
                    name="name"
                    onChange={handleChange}
                    value={movie.name}
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
              value={movie.rating}>
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
                  value={movie.review}
                />
              </div>
            </div>
          <button className="btn btn-success m-2">Submit</button>
        </form>
        <Link to="/" className="btn btn-danger m-2">
          cancel
        </Link>
      </div>
    );
  };
  
  export default PirateForm;