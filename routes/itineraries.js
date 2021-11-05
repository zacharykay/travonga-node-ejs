const express = require('express');
const router = express.Router();

router.get('/*', (req, res) => {
	res.render(`itineraries/${req._parsedUrl.path}`);
	// Alternatively: res.render(`itineraries/${req.params[0]}`);
});

module.exports = router;
