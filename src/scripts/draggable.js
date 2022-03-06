// Object of the element to be moved
var selected = null
// Stores x & y coordinates of the mouse pointer
let x_pos = 0
let y_pos = 0
// Stores top, left values (edge) of the element
let x_elem = 0
let y_elem = 0;

// Will be called when user starts dragging an element
function _drag_init(elem) {
	// Store the object of the element which needs to be moved
	selected = elem;
	x_elem = x_pos - selected.offsetLeft;
	y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
	x_pos = document.all ? window.event.clientX : e.pageX;
	y_pos = document.all ? window.event.clientY : e.pageY;
	if (selected !== null) {
		selected.style.left = (x_pos - x_elem) + 'px';
		selected.style.top = (y_pos - y_elem) + 'px';
	}
}

// Destroy the object when we are done
function _destroy() {
	selected = null;
}

let dragItems = document.querySelectorAll('[draggable=true]');

for (var i = 0; i < dragItems.length; i++) {
	dragItems[i].onmousedown = function () {
		_drag_init(this);
		return false;
	};
}

document.onmousemove = _move_elem;
document.onmouseup = _destroy;

export default dragItems
