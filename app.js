require('dotenv').config()

const path = require("path"),
			express = require("express"),
			app = express(),
			cors = require('cors'),
			cookieParser = require('cookie-parser'),
			compression = require('compression'),
			mongoose = require("mongoose"),
			hbs = require("hbs"),
			expressHbs = require("express-handlebars"),
			router = require('./server/routes'),
			errorMiddleware = require('./server/middlewares/error'),
			db = 'mongodb://127.0.0.1:27017/webstore'

app.disable('x-powered-by')
app.use(cors({ credentials: true, origin: process.env.API_URL }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/client"))
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use('/', router)
app.enable('view cache')

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, '/client/views'))
hbs.registerPartials(__dirname + "/client/views/partials")
app.engine("hbs", expressHbs.engine({
	layoutsDir: path.join(__dirname, "/client/views/layouts"),
	defaultLayout: "layout",
	extname: "hbs"
}))

app.use( (req, res) => res.status(404).render('404.hbs'))
app.use(errorMiddleware)

const start = async () => {
	try {
		const mongoDB = process.env.DB_URI || db,
					connection = mongoose.connection,
					port = process.env.PORT || 3000	

		await mongoose.connect(mongoDB)

		connection.on('error', console.error.bind(console, 'Ошибка подключения: '))
		connection.once('open', () => console.log('Соединение установлено'))

		app.listen(port, () => console.log("Server is starting"))
	}
	catch (e) {
		console.warn(e.message)
	}
}

start()

process.on("SIGINT", async () => {
	await mongoose.disconnect()
	console.log("End!")
	process.exit()
});

