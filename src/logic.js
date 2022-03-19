const domPars = require('jsdom')

async function getSrcMedia(html) {

	let src = []
	let doc = new domPars.JSDOM(html)

	await doc.window.document.querySelectorAll('.image').forEach(el => {
		let href = el.getAttribute('href')
		src.push(href)
	})

	return src
}

module.exports = { getSrcMedia }