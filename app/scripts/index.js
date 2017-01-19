/* global SC */
/* eslint no-unused-vars:0 */

import $ from 'jquery'
import store from './store'
import ytPlayer from './youtube'
import scPlayer from './soundcloud'

// ACTIONS

const changeTrack = function (event) {
	const $el = $(event.currentTarget)

	// Use the string number text to decide which track to play.
	const index = Number($el.text().trim() - 1)

	// Change video
	if (index === 4) {
		// the rhythm video
		ytPlayer.loadVideoById('DHTyG8x5UPo')
	} else {
		ytPlayer.loadVideoById(store.findRandomVideo())
	}

	// Change track.
	scPlayer.skip(index)
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
	scPlayer.toggle()
})
$('.js-prev').on('click', () => {
	scPlayer.prev()
})
$('.js-volDown').on('click', () => {
	scPlayer.getVolume(vol => {
		scPlayer.setVolume(vol - 0.1)
	})
})
$('.js-toggleSound').on('click', () => {
	scPlayer.toggle()
})
$('.js-next').on('click', () => {
	scPlayer.next()
})
$('.js-changeTrack').on('click', changeTrack)

// START

const start = function () {
	console.log('autoplaying first track')
	$('.js-changeTrack').eq(0).trigger('click')
}

scPlayer.bind(SC.Widget.Events.READY, start)
