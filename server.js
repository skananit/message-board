// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
var Promise = mongoose.connect('mongodb://localhost:27017/webtech', {
  useMongoClient: true,
});


var Course = require('./app/models/course');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



router.route('/webtech')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var course = new Course();      // create a new instance of the Bear model
        course.name = req.body.name;  // set the bears name (comes from the request)
        course.time = req.body.time;
        course.course= req.body.course;
        // save the bear and check for errors
        course.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Course created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
                res.setHeader('Access-Control-Allow-Origin', '*');

        Course.find(function(err, courses) {
            if (err)
                res.send(err);

            res.json(courses);
        });
    });
    
router.route('/webtech/:course_id')
 // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
                res.setHeader('Access-Control-Allow-Origin', '*');

        Course.findById(req.params.course_id, function(err, course) {
            if (err)
                res.send(err);
            res.json(course);
        });
    })
       .put(function(req, res) {

        // use our bear model to find the bear we want
        Course.findById(req.params.course_id, function(err, course) {

            if (err)
                res.send(err);

            course.name = req.body.name;  // update the bears info

            // save the bear
            course.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Course updated!' });
            });

        });
    })
    
      // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Course.remove({
            _id: req.params.course_id
        }, function(err, course) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
