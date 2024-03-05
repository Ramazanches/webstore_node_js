const nodemailer = require('nodemailer')

class MailService {

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}

	async sendActivationMail(to, link) {

		const message = `
			<div>
				<h1>Для активации перейдите по ссылке</h1>
				<a href="${link}">${link}</a>
			</div>
		`	

		const options = {
			from: process.env.SMTP_USER,
			to,
			subject: 'Активация аккаунта на ' + process.env.API_URL,
			text: '',
			html: message
		}

		this.transporter.verify(err => {
			if (err) console.error(err)
			console.log('Mail config is correct')
			console.log(this.transporter.options)
		})

		await this.transporter.sendMail(options)

	}
}

module.exports = new MailService()