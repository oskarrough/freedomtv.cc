import YoutubePlayer from 'youtube-player'

// Create our player.
const player = YoutubePlayer('YoutubePlayer', {
	// videoId: 'e6XhT3VZfJI',
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

player.on('stateChange', (event) => {
	const state = stateNames[event.data]
	// console.log('State: ' + state + ' (' + event.data + ').')
	if (state === 'ended') {
		// Loop the video.
		player.seekTo(0)
	}
})

// Mute the video.
player.mute()

export default player
