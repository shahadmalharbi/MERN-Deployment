const Movie = require("../models/movie.model") //Pirate model
const Reviewer = require("../models/movie.model") //Pirate model

// return all 
module.exports.findAllMovie = (req, res) => {
  //sort 
  var mySort = { type: 1 };
  //.collation({locale: "en" }) dealing with 'A' and 'a' as same language and order
  Movie.find({}).collation({locale: "en" }).sort(mySort)
    .then(allMovie => res.json({ movies: allMovie }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
// return one 
module.exports.findOneSingleMovie = (req, res) => {
	Movie.findOne({ _id: req.params.id })
		.then(oneSingleMovie=> res.json(oneSingleMovie))
		.catch(err => res.status(400).json( err));
};

//create a new 
module.exports.createNewMovie = (req, res) => {
    Movie.create(req.body)
    .then(newlyCreatedMovie=> res.json({ movie: newlyCreatedMovie }))
    .catch(err => res.status(400).json(err));
};

//update exists 
module.exports.updateExistingMovie = (req, res) => {
    Movie.findByIdAndUpdate({ _id: req.params.id }, req.body, { new:true, runValidators:true  })
    .then(updatedMovie => res.json({ reviews : updatedMovie }))
    .catch(err => res.status(400).json( err ));
};

//delete a 
module.exports.deleteAnExistingMovie = (req, res) => {
    Movie.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

//create a new 
module.exports.createNewReviewer = async (req, res) => {
    Movie.create(req.body)
    try {
      const movieId = req.params.id
      const movie = await Movie.findOne({_id: movieId})
      let newReview = {
                name: req.body.name,
                rating: req.body.rating,
                review: req.body.review
            }
      console.log('newReview', newReview)
      movie.reviewer.push(newReview)
      await movie.save({ runValidators:true })
      return res.status(200).json(movie)
    } catch (err) {
      console.log(err)
      return res.status(400).json((err))
    }
  }