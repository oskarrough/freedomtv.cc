/* eslint no-unused-vars:0 */

// import lazysizes from 'lazysizes';
// import rough from './rough';

import YouTubePlayer from 'youtube-player'

const stateNames = {
	'-1': 'unstarted',
	0: 'ended',
	1: 'playing',
	2: 'paused',
	3: 'buffering',
	5: 'video cued'
};

const player = YouTubePlayer('TeaserVideo', {
	videoId: 'eCIJZ_6Qcck',
	playerVars: {
		modestbranding: 1,
		playsinline: 1,
		rel: 0,
		showinfo: 0,
		// color: 'white',
		controls: 0
	}
})

player.playVideo()

player.on('stateChange', function (event) {
	// console.log('State: ' + stateNames[event.data] + ' (' + event.data + ').')

	if (stateNames[event.data] === 'ended') {
		// Loop the video.
		player.seekTo(0)
	}
})

