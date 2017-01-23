/* global SC */
/* eslint no-unused-vars:0 */

import $ from 'jquery'
import db from './db'
import ytPlayer from './youtube'
import scPlayer from './soundcloud'
import draggable from './draggable'

const pickRandom = arr => {
	return arr[Math.floor(Math.random() * arr.length)]
}

// https://surma.github.io/underdash/#flatten
function flatten(arr) {
	return Array.prototype.concat.apply([], arr)
}

const findVideos = () => flatten(db.map(track => track.videos))

let currentVideo
const findVideo = (trackIndex = 0) => {
	const trackVideos = db[trackIndex].videos
	let video
	console.log(`findVideo(${trackIndex})`)
	video = pickRandom(trackVideos)
	while (video === currentVideo) {
		console.log('same, picking new')
		video = pickRandom(trackVideos)
	}
	console.log('found video', video)
	currentVideo = video
	return video
}

const getCurrentTrackIndex = () => {
	const $el = $('.RemoteControl-list .is-active')
	const index = Number($el.text().trim() - 1)
	console.log(index);
	return index
}

// ACTIONS

const changeVideo = function (index) {
	let video
	console.log(index);

	if (!index || index < 0) {
		video = findVideo()
	} else {
		video = findVideo(index)
	}

	console.log('Changing video to ' + video);

	return ytPlayer.loadVideoById(video)
}

const nextVideo = () => {
	const index = getCurrentTrackIndex()
	return changeVideo(index)
}

const changeTrack = function (index) {
	return scPlayer.skip(index)
}

const showVolumeChange = vol => {
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
	notify(image)
}

let volumeTimer;
const notify = html => {
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
	volumeTimer = setTimeout(hide, 5000)
}

// EVENT HANDLERS

$('.js-volUp').on('click', () => {
	scPlayer.getVolume(vol => {
		scPlayer.setVolume(vol + 0.05)
		showVolumeChange(vol + 0.05)
	})
})
$('.js-volDown').on('click', () => {
	scPlayer.getVolume(vol => {
		scPlayer.setVolume(vol - 0.05)
		showVolumeChange(vol - 0.05)
	})
})
$('.js-powerButton').on('click', () => {
	ytPlayer.getPlayerState().then(state => {
		if (state === 1) {
			ytPlayer.loadVideoById('6hKIHF5cULg').then(() => {
				scPlayer.toggle()
				// because the video is 1 sec long
				// setTimeout(scPlayer.toggle, 1000)
			})
		} else {
			scPlayer.play()
			scPlayer.getCurrentSoundIndex(index => changeVideo(index))
		}
	})
})
$('.js-prev').on('click', () => {
	scPlayer.prev()
	scPlayer.getCurrentSoundIndex(index => changeVideo(index))
})
$('.js-toggleSound').on('click', () => {
	// Can not use scPlayer.toggle() because it resets when a new track plays
	scPlayer.getVolume(vol => {
		// console.log(vol);
		if (vol < 1) {
			scPlayer.setVolume(100)
			notify('unmute')
		} else {
			scPlayer.setVolume(0)
			notify('mute')
		}
	})
})

$('.js-next').on('click', () => {
	scPlayer.next()
	scPlayer.getCurrentSoundIndex(index => changeVideo(index))
})

$('.js-changeTrack').on('click', event => {
	// Use the string number text to decide what to play.
	const $el = $(event.currentTarget)
	const index = Number($el.text().trim() - 1)
	console.log($el, `dom index: ${index}`)

	changeVideo(index)
	scPlayer.getCurrentSoundIndex(soundIndex => {
		if (index !== soundIndex) {
			scPlayer.skip(index)
		}
	})
})

ytPlayer.on('stateChange', event => {
	const ended = event.data === 0
	if (ended) {
		console.log('video ended')
		nextVideo()
	}
})

// START

const start = function () {
	// scPlayer.setVolume(0)
	console.log('autoplaying first track')
	changeTrack(0)
	changeVideo(0).then(ytPlayer.playVideo)
}

scPlayer.bind(SC.Widget.Events.READY, start)
