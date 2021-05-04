const controller = {
	index: (req, res) => {
		res.render('web/index');
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;