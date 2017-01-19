/* global SC */
import $ from 'jquery'

// This assumes you've loaded the Soundcloud API, which exposes a global `SC` var.
// https://developers.soundcloud.com/docs/api/html5-widget
const remoteControlList = document.querySelector('.RemoteControl-list')
const iframeElement = document.querySelector('.Player iframe')
const widget = new SC.Widget(iframeElement)

const onReady = () => {
	console.log('ready')
}

const onPlay = () => {
	console.log('play')

	// Mark current button as active.
	widget.getCurrentSoundIndex(index => {
		const li = $('.js-changeTrack').eq(index).parent('li')
		$(remoteControlList).find('li').not(li).removeClass('is-active')
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
