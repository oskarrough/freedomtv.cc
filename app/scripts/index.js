/* global SC */
/* eslint no-unused-vars:0 */

import $ from 'jquery'
import db from './db'
import youtube from './youtube'
import soundcloud from './soundcloud'
import draggable from './draggable'

let currentVideo
let volumeTimer

youtube.on('stateChange', event => {
	const ended = event.data === 0
	if (ended) {
		// console.log('video ended')
		ui.nextVideo()
	}
})

const utils = {
	getCurrentTrackIndex() {
		const $el = $('.RemoteControl-list .is-active')
		const index = Number($el.text().trim() - 1)
		return index
	},
	// https://surma.github.io/underdash/#flatten
	flatten(arr) {
		return Array.prototype.concat.apply([], arr)
	},
	findVideos() {
		return ui.flatten(db.map(track => track.videos))
	},
	findVideo(trackIndex = 0) {
		const trackVideos = db[trackIndex].videos
		let video
		// console.log(`findVideo(${trackIndex})`)
		video = utils.pickRandom(trackVideos)
		while (video === currentVideo && trackVideos.length > 1) {
			video = utils.pickRandom(trackVideos)
		}
		// console.log('found video', video)
		currentVideo = video
		return video
	},
	pickRandom(arr) {
		return arr[Math.floor(Math.random() * arr.length)]
	}
}

const ui = {
	changeVideo(index) {
		let video
		if (!index || index < 0) {
			video = utils.findVideo()
		} else {
			video = utils.findVideo(index)
		}
		// console.log('Changing video to ' + video)
		return youtube.loadVideoById(video)
	},
	nextVideo() {
		const index = ui.getCurrentTrackIndex()
		return ui.changeVideo(index)
	},
	changeTrack(index) {
		return soundcloud.skip(index)
	},
	showVolumeChange(vol) {
		// Clamp between 0 and 1.
		if (vol > 1) {
			vol = 1
		}
		if (vol < 0) {
			vol = 0
		}
		// Map to a 0-20 scale so it fits our images.
		const roundedVolume = (Math.round(vol * 20) / 20) * 20
		// Create DOM image.
		const image = `<img src="images/volume/freedomTV_Site_Volume_${roundedVolume}.png" alt="">`
		ui.notify(image)
	},

	notify(html, isSticky) {
		const $el = $('.Notify')
		const show = () => {
			$el.show()
		}
		const hide = () => {
			$el.hide()
		}

		// Show it, change image, hide again.
		$el.html(html)
		show()
		window.clearTimeout(volumeTimer)
		if (!isSticky) {
			volumeTimer = setTimeout(hide, 4000)
		}
	}
}

// EVENT HANDLERS

const volumeSteps = 0.05

$('.js-volUp').on('click', () => {
	soundcloud.getVolume(vol => {
		soundcloud.setVolume(vol + volumeSteps)
		ui.showVolumeChange(vol + volumeSteps)
	})
})
$('.js-volDown').on('click', () => {
	soundcloud.getVolume(vol => {
		soundcloud.setVolume(vol - volumeSteps)
		ui.showVolumeChange(vol - volumeSteps)
	})
})
$('.js-powerButton').on('click', () => {
	youtube.getPlayerState().then(state => {
		if (state === 1) {
			youtube.loadVideoById('6hKIHF5cULg').then(() => {
				soundcloud.toggle()
			})
		} else {
			soundcloud.play()
			soundcloud.getCurrentSoundIndex(index => ui.changeVideo(index))
		}
	})
})
$('.js-prev').on('click', () => {
	soundcloud.prev()
	soundcloud.getCurrentSoundIndex(index => ui.changeVideo(index))
})
$('.js-toggleSound').on('click', () => {
	// Can not use soundcloud.toggle()
	// because it resets the volume as a new track plays.
	soundcloud.getVolume(vol => {
		if (vol < 1) {
			soundcloud.setVolume(100)
			ui.notify('unmuted')
		} else {
			soundcloud.setVolume(0)
			ui.notify('muted', true)
		}
	})
})

$('.js-next').on('click', () => {
	soundcloud.next()
	soundcloud.getCurrentSoundIndex(index => ui.changeVideo(index))
})

$('.js-changeTrack').on('click', event => {
	// Use the string number text to decide what to play.
	const $el = $(event.currentTarget)
	const index = Number($el.text().trim() - 1)
	// console.log($el, `dom index: ${index}`)

	ui.changeVideo(index)
	soundcloud.getCurrentSoundIndex(soundIndex => {
		if (index !== soundIndex) {
			soundcloud.skip(index)
		}
	})
})

// START

const start = function() {
	console.log('freedom tv is starting')
	// console.log('autoplaying first track')
	soundcloud.setVolume(0)
	ui.changeTrack(0)
	soundcloud.seekTo(200)
	// $('.js-next').trigger('click')
	soundcloud.setVolume(100)
	// soundcloud.play()
	// ui.changeVideo(0).then(() => {
	// 	// 	soundcloud.setVolume(50)
	// 	// youtube.playVideo()
	// 	// setTimeout(() => {
	// 	// 	// soundcloud.play()
	// 	// }, 1000)
	// })
}

soundcloud.bind(SC.Widget.Events.READY, start)
