exports.about = (req, res) => { 
	res.render("about.hbs", {
		title: "О нас"
	});
}