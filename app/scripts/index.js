/* eslint no-unused-vars:0 */

import $ from 'jquery';
import ytPlayer from './youtube';
import scPlayer from './soundcloud';

// MODEL

const videos = [
	// 'eCIJZ_6Qcck',
	// 'RHOy9XObpZU',
	// '5vuuT5W9BWo',
	// 'J9eCj2XUFSg',
	// 'h0pWXCdRU5A',
	// 'DHTyG8x5UPo'
	'eCIJZ_6Qcck',
	'RHOy9XObpZU',
	'q8ZHi6whe58',
	'qchPLaiKocI',
	'aJbD00z68JI',
	'TwyqfyR_qXg',
	'X84muuaySVQ',
	'bF_a6qMeWP8',
	'HKaIMdX6K7g',
	'MCt0DLsn3lM',
	'BbIPRG2P16Q',
	'Yi1m_UVpAHw',
	'2VW1M5L2oV0',
	'ozoTzkCeO-A'
]

const videoTheRhythm = 'DHTyG8x5UPo'

const findRandomVideo = () => {
	return videos[Math.floor(Math.random() * videos.length)]
}

// ACTIONS

const play = function () {
	// Only toggles volume.
	scPlayer.toggle()
	remoteControl.classList.add('is-playing')
}

const pause = function () {
	// Only toggles volume.
	scPlayer.toggle()
	remoteControl.classList.remove('is-playing')
}

const changeTrack = function (event) {
	let $el = $(event.currentTarget)

	// Use the string number text to decide which track to play.
	let index = Number($el.text().trim() - 1)

	// Change video
	if (index === 4) {
		ytPlayer.loadVideoById(videoTheRhythm)
	} else {
		ytPlayer.loadVideoById(findRandomVideo())
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
