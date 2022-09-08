const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/movies_DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Successfully established a connection"))
    .catch(err => console.log("Unable to establish a connection"))
