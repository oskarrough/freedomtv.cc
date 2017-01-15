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
	'Yi1m_UVpAHw'
]

const videoTheRhythm = 'DHTyG8x5UPo'

const getRandomVideo = () => {
	return videos[Math.floor(Math.random() * videos.length)]
}

ytPlayer.mute();
// ytPlayer.loadVideoById(videos[0])

const remoteControl = document.querySelector('.RemoteControl')
const onClick = (event) => {
	let $el = $(event.currentTarget)
	let index = $el.index()
	if (index === 4) {
		ytPlayer.loadVideoById(videoTheRhythm)
	} else {
		ytPlayer.loadVideoById(getRandomVideo())
	}
	// Skip track.
	scPlayer.skip(index)
}

$('.play').on('click', () => {
	scPlayer.toggle()
	remoteControl.classList.add('is-playing')
})

$('.pause').on('click', () => {
	scPlayer.toggle()
	remoteControl.classList.remove('is-playing')
	// ytPlayer.pauseVideo()
})

$('li', '.RemoteControl-list').on('click', onClick)

setTimeout(() => {
	$('.RemoteControl-list li').eq(0).trigger('click')
}, 1000)
