const https = require('https')
const fs = require('fs')
const fetch = require('node-fetch')
const {getSrcMedia} = require('./logic.js')
const path = require('path')


fetch('') //here URL album
	.then(res => res.text())
	.then(data => {
		return getSrcMedia(data)
	})
	.then(srcArray => {
		let counter = 722;

		function download() {
			https.get(srcArray[counter], res => {
				if (res.statusCode === 200) {

					res.pipe(fs.createWriteStream( path.join(__dirname, 'media', `${counter}.jpg`) ))
						.once('finish', (ev) => {
							console.log(`${srcArray.length} || ${counter}`)
							console.log(srcArray[counter])
							++counter
						})
						.once('close', ev => {
							download();
						})
						.once('error', ev => {
							download();
						})

				} else {
					console.log(res.statusCode)
					console.log(srcArray[counter])
					srcArray[counter] = res.headers.location
					download()
				}
			})
				.on('timeout', ev => {
					download();
				})
		}
		download()
	})