import $ from 'jquery'

// This assumes you've loaded the Soundcloud API, which exposes a global `SC` var.
let remoteControl = document.querySelector('.RemoteControl')
let remoteControlList = document.querySelector('.RemoteControl-list')
let iframeElement = document.querySelector('.Player iframe')
let widget = SC.Widget(iframeElement)

const onPlay = () => {
	console.log('play')

	// Mark current button as active.
	widget.getCurrentSoundIndex(index => {
		let li = $('.js-changeTrack').eq(index).parent('li')

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

export default widget

