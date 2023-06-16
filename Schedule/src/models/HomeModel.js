const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String
});

const HomeModel = mongoose.model('Nikolaus', HomeSchema);
// const Home_Model = mongoose.model('Home', Home_Schema);

class Home {

}

module.exports = Home;

