/* global SC */
import $ from 'jquery'

const iframe = document.querySelector('.SoundCloudPlayer iframe')

// This assumes you've loaded the Soundcloud API, which exposes a global `SC` var.
// https://developers.soundcloud.com/docs/api/html5-widget
const widget = new SC.Widget(iframe)

const onReady = () => {
	console.log('ready')
}

const onPlay = () => {
	console.log('play')

	// Mark current button as active.
	widget.getCurrentSoundIndex(index => {
		const li = $('.js-changeTrack').eq(index).parent('li')
		$('.RemoteControl-list').find('li').not(li).removeClass('is-active')
		li.addClass('is-active')
	})

	// widget.getCurrentSound(sound => {
	// 	console.log(sound.title)
	// })
	// remoteControl.classList.add('is-playing')
}

const onFinish = () => {
	console.log('finished')
	// remoteControl.classList.remove('is-playing')
}

widget.bind(SC.Widget.Events.PLAY, onPlay)
widget.bind(SC.Widget.Events.FINISH, onFinish)
widget.bind(SC.Widget.Events.READY, onReady)

export default widget
