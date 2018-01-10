	//======================== News Scrapper ==========================//
	//======================== by Julian Hasse ========================//
	//======================== UNC Bootcamp 2018 ======================//



	//======================== Dependencies ==========================//
	const express = require("express");
	const request = require("request");
	const bodyParser = require("body-parser");
	const logger = require("morgan");
	const mongoose = require("mongoose");
	const cheerio = require("cheerio");
	

	//======================== Models ================================//
	var Note = require("./models/Note.js");
	var Article = require("./models/Article.js");
	

	//======================== PORT =-----=============================//
	var PORT = process.env.PORT || 3000;


	//======================== Middleware =============================//	
	var app = express();
	app.use(logger("dev"));
	app.use(bodyParser.urlencoded({
	  		extended: false
	}));
	app.use(express.static("public"));
	var exphbs = require("express-handlebars");
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	app.set("view engine", "handlebars");


	//======================== Routes ==============================//	
	var routes = require("./controllers/controller.js");
	app.use("/", routes);


	//======================== Mongoose / DB =======================//	
	mongoose.Promise = Promise;

	if(process.env.MONGODB_URI){
		mongoose.connect(process.env.MONGODB_URI);
	}else {
		mongoose.connect("mongodb://localhost/test");
	}

	var db = mongoose.connection;
	db.on("error", function(error) {
	  		console.log("Mongoose Error: ", error);
	});

	db.once("open", function() {
	  		console.log("DB connected OK!");
	});


	//======================== App Listen OK =======================//
	app.listen(PORT, () => {
	  		console.log("App running on PORT " + PORT);
	});


