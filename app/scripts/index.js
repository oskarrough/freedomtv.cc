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

// EVENT HANDLERS

$('.js-volUp').on('click', () => {
	scPlayer.getVolume(vol => {
		scPlayer.setVolume(vol + 0.1)
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
	// Mute the video.
	ytPlayer.mute();

	// TODO: Rewrite to wait for Soundcloud Widget API callback.
	setTimeout(() => {
		console.log('autoplaying first track')
		$('.js-changeTrack').eq(0).trigger('click')
	}, 1000)
}

start()
