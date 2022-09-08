const MovieController = require('../controllers/movie.controller');

module.exports = app => {
    app.get("/api/movies", MovieController.findAllMovie);
    app.post("/api/movies/new", MovieController.createNewMovie)
    app.get("/api/movies/:id", MovieController.findOneSingleMovie)
    app.post("/api/reviewer/new/:id", MovieController.createNewReviewer)
    app.delete("/api/movies/delete/:id", MovieController.deleteAnExistingMovie)
    app.put("/api/movies/edit/:id", MovieController.updateExistingMovie)
};

