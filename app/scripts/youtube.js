import YoutubePlayer from 'youtube-player'

// Create our player.
const player = new YoutubePlayer('YoutubePlayer', {
	// videoId: '6hKIHF5cULg',
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

const loader = document.querySelector('.YoutubePlayer-loader')
const hideLoader = () => loader.classList.add('is-hidden')
const showLoader = () => loader.classList.remove('is-hidden')

player.on('stateChange', event => {
	const state = stateNames[event.data]
	console.log('State: ' + state + ' (' + event.data + ').')
	// if (state === 'ended') {
	// 	// Loop the video.
	// 	player.seekTo(0)
	// }
	if (state === 'buffering') {
		showLoader()
	}
	if (state === 'playing') {
		hideLoader()
	}
})

// Mute the video.
player.mute()

export default player
