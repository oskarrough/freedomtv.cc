/* global SC */
/* eslint no-unused-vars:0 */

import $ from 'jquery'
import db from './db'
import ytPlayer from './youtube'
import scPlayer from './soundcloud'
import draggable from './draggable'

// MODEL

const random = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)]
}

// https://surma.github.io/underdash/#flatten
function flatten(arr) {
	return Array.prototype.concat.apply([], arr);
}

const findVideos = () => flatten(db.map(track => track.videos))

const findVideo = (trackIndex = 0) => {
	console.log(trackIndex);
	let videos = db[trackIndex].videos
	return random(videos)
}

const getCurrentTrackIndex = () => {
	const $el = $('.RemoteControl-list .is-active')
	const index = Number($el.text().trim() - 1)
	console.log(index);
	return index
}

// ACTIONS

const changeVideo = function (index) {
	// Use the string number text to decide which track to play.
	// let index = getCurrentTrackIndex()
	let video

	console.log(index);

	if (!index || index < 0) {
		video = findVideo()
	} else {
		video = findVideo(index)
	}

	return ytPlayer.loadVideoById(video)
}

const changeTrack = function (index) {
	return scPlayer.skip(index)
}

const toggleVideo = () => {
	ytPlayer.getPlayerState().then(state => {
		// console.log(state);
		if (state === 1) {
			// console.log('pausing');
			ytPlayer.pauseVideo()
		} else {
			// console.log('playing');
			ytPlayer.playVideo()
		}
	})
}

let volumeTimer;
const showVolumeChange = vol => {
	const $el = $('.VolumeStatus')
	const $img = $el.find('img')

	const show = () => {
		$el.show()
	}
	const hide = () => {
		$el.hide()
	}

	// Clamp between 0 and 1
	if (vol > 1) {
		vol = 1
	}
	if (vol < 0) {
		vol = 0
	}

	// Map to a 0-20 scale so it fits our images
	let roundedVolume = (Math.round(vol * 20) / 20) * 20

	// Show it, change image, hide again.
	show()
	$img[0].src = `images/volume/freedomTV_Site_Volume_${roundedVolume}.png`
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
	// toggleVideo()
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
		} else {
			scPlayer.setVolume(0)
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
	console.log($el, `dom index: ${index}`);

	changeVideo(index)
	scPlayer.skip(index)
})

// START

const start = function () {
	// scPlayer.setVolume(0)
	console.log('autoplaying first track')
	changeVideo(0)
	changeTrack(0)
}

scPlayer.bind(SC.Widget.Events.READY, start)
