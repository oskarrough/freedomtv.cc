/* eslint no-unused-vars:0 */

import $ from 'jquery';
import ytPlayer from './youtube';
import scPlayer from './soundcloud';

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

const getRandomVideo = () => {
	return videos[Math.floor(Math.random() * videos.length)]
}

ytPlayer.mute();
// ytPlayer.loadVideoById(videos[0])

const remoteControl = document.querySelector('.RemoteControl')

const changeTrack = function (event) {
	let $el = $(event.currentTarget)
	let index = Number($el.text().trim() - 1)
	console.log(index)
	// Change video
	if (index === 4) {
		ytPlayer.loadVideoById(videoTheRhythm)
	} else {
		ytPlayer.loadVideoById(getRandomVideo())
	}
	// Change track.
	scPlayer.skip(index)
}

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

const play = function () {
	scPlayer.toggle()
	remoteControl.classList.add('is-playing')
}

const pause = function () {
	scPlayer.toggle()
	remoteControl.classList.remove('is-playing')
	// ytPlayer.pauseVideo()
}

setTimeout(() => {
	console.log('autoplaying first track')
	$('.js-changeTrack').eq(0).trigger('click')
}, 800)
