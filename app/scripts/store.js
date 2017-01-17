// YouTube videos
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

const findRandomVideo = (arr = videos) => {
	return arr[Math.floor(Math.random() * arr.length)]
}

export default {
	videos, findRandomVideo
}

