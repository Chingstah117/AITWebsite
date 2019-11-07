const http = require('http');
const express = require('express');
const app = express();
const path = require("path");
require('./db');

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

const mongoose = require('mongoose');
const Showdb = mongoose.model('Showdb');

// var show1 = {name: "QuanZhi GaoShou", rating: "9", comments: "eSports anime developed in China by Tencent and BiliBili", genre: "ONA"};
// var show2 = {name: "Kimi no Na Wa", rating: "10", comments: "Arguably best anime movie to date", genre: "Movie"};
// var show3 = {name: "Mobile Gundam Unicorn", rating: "7", comments: "Gundam lul", genre: "OVA"};
// var show4 = {name: "Re:Creators", rating: "10", comments: "Most impactful show I've ever seen", genre: "TV"};

// new Showdb({
// 		name: "QuanZhi GaoShou",
// 		rating: "9",
// 		comments: "eSports anime developed in China by Tencent and BiliBili", 
// 		genre: "ONA"
// }).save();	
// new Showdb({
// 		name: "Kimi no Na Wa", 
// 		rating: "10", 
// 		comments: "Arguably best anime movie to date", 
// 		genre: "Movie"
// }).save();
// new Showdb({
// 		name: "Mobile Gundam Unicorn", 
// 		rating: "7", 
// 		comments: "Gundam lul", 
// 		genre: "OVA"
// }).save();	
// new Showdb({
// 		name: "Re:Creators", 
// 		rating: "10", 
// 		comments: "Most impactful show I've ever seen", 
// 		genre: "TV"
// }).save();

// var show = [show1, show2, show3, show4];

app.get('/', (req, res) => {
	res.redirect('/shows');
});

// app.get('/shows', (req, res) => {
// 	// console.log(Showdb.size());
// 	res.render("add", {shows: Showdb});
// });

app.get('/shows', function(req, res) {
	Showdb.find(function(err, show, count) {
		res.render( 'shows', {
			shows: show
		});
	});
});

// app.post('/shows', function(req, res){
// 	console.log(req.body.genre);
// 	if(req.body.genre != "All"){
// 		var list = Showdb.find(function(err, show, count) {
// 			return show.genre == req.body.genre;
// 		});
// 		console.log(list);
// 		return list.filter(s => s.genre== req.body.genre);
// 	}
// 	else{
// 		res.redirect('/shows');
// 	}
// });

app.post('/shows', function(req, res){
	console.log(req.body.genre);
	if(req.body.genre === "All"){
		Showdb.find(function(err, show, count) {
		res.render( 'shows', {
			shows: show
		});
	});}	
	else{	
		Showdb.find(function(err, show, count){
		const filteredShows = show.filter(function(s) { return s.genre===req.body.genre});
		res.render('shows', {shows: filteredShows});
		});
	}
});

app.get('/add', function(req, res){
	res.render("add");
});

app.post('/add', (req, res) =>{
	new Showdb({
		name: req.body.name, 
		rating: req.body.rating, 
		comments: req.body.comments, 
		genre: req.body.genre
	}).save(function(err, show, count) {
		res.redirect('/shows');
	});
})

app.get('/about', function(req, res){
	res.render("about");
});



app.get('/update', function(req, res){
	Showdb.find(function(err, show, count) {
		res.render( 'update', {
			shows: show
		});
	});
});

app.post('/update', function(req, res){
	Showdb.findOne({name: req.body.name}, function(err, show, count) {
		show.rating= req.body.rating;
		show.comments= req.body.comments;
		show.genre= req.body.genre;
		show.save(function(saveErr, saveShow, saveCount) {
				Showdb.find(function(err, show, count) {
		res.render('update', {
			shows: show
	})
		}); 
	});

	});


	// Showdb.findOne({name: req.body.name}, function(err, show, count) {
	// 	Showdb.push({rating= req.body.rating, comments= req.body.comments, genre= req.body.genre});
	// 	show.save(function(saveErr, saveShow, saveCount) {
	// 		res.render('update', {
	// 			shows: show
	// 		});
	// 	});
	// });	
});




app.listen(process.env.PORT || 3000);
console.log('Starting server on port ', process.env.PORT || 3000);
