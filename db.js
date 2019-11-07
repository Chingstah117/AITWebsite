const mongoose = require('mongoose');

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {

 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 dbconf = 'mongodb://localhost/showdb';
}
console.log("environment", process.env.NODE_ENV);
console.log("using dbconf as ", dbconf);

mongoose.connect(dbconf);

const Showdb = new mongoose.Schema({
	name: String,
	rating: Number,
	comments: String,
	genre: String
})
mongoose.model('Showdb', Showdb);
