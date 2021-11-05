const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
// const methodOverride = require('method-override');

const destinations = require('./routes/destinations');
const itineraries = require('./routes/itineraries');
const ExpressError = require('./utils/ExpressError');

const app = express();

// Path Setup for Routing and ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Method Override and Static File Path Setup
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Port Config and Development Mode
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Serving on Port ${port}`);
});

// Master Routes
app.use('/destinations', destinations);
app.use('/itineraries', itineraries);

app.get('/', (req, res) => {
	console.dir(req._parsedUrl.path);
	res.render('index');
});

// Universal Default Error Handling
app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404));
});

// Error Page and Info Render
app.use((err, req, res, next) => {
	const { statusCode = 500, message = 'An error has occurred' } = err;
	if (!err.message) {
		err.message = 'Oh no, an error occurred';
	}
	res.status(statusCode).render('error', { err });
});

console.log('...Working');
