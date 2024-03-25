exports.about = (req, res) => { 
	res.render("about.hbs", {
		title: "О нас",
		signinIcon: true,
		auth: req.cookies.refreshToken !== undefined
	});
}