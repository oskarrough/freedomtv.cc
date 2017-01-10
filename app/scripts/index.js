/* eslint no-unused-vars:0 */

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

window.scPlayer = scPlayer

scPlayer.bind(SC.Widget.Events.PLAY, () => {
	scPlayer.getCurrentSoundIndex(index => {
		if (index === 4) {
			ytPlayer.loadVideoById(videoTheRhythm)
			return
		}
		ytPlayer.loadVideoById(getRandomVideo())
	})
})

