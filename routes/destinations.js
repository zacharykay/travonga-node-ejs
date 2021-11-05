const express = require('express');
const router = express.Router();

router.get('/*', (req, res) => {
	res.render(`destinations/${req._parsedUrl.path}`);
	// Alternatively: res.render(`destinations/${req.params[0]}`);
});

module.exports = router;
