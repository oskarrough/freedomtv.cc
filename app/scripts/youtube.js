import YouTubePlayer from 'youtube-player'

// Create our player.
const player = YouTubePlayer('TeaserVideo', {
	playerVars: {
		modestbranding: 1,
		playsinline: 1,
		rel: 0,
		showinfo: 0,
		controls: 0
	}
})

const stateNames = {
	'-1': 'unstarted',
	0: 'ended',
	1: 'playing',
	2: 'paused',
	3: 'buffering',
	5: 'video cued'
}

player.on('stateChange', function (event) {
	// console.log('State: ' + stateNames[event.data] + ' (' + event.data + ').')

	if (stateNames[event.data] === 'ended') {
		// Loop the video.
		player.seekTo(0)
	}
})

export default player;
