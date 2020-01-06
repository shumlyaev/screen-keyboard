let qwerty = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
let actElem;

keyboardInit();

document.onkeydown = function(event) {
    actElem = document.activeElement;
    if (actElem.classList.contains('k-editable')) document.querySelector('#keyboard .key[data="' + event.key + '"]').classList.add('active');
}
document.onkeyup = function(event) {
    document.querySelector('#keyboard .key[data="' + event.key + '"]').classList.remove('active');
    actElem = 0;
}
document.querySelectorAll('#keyboard .key').forEach(function(element) {
    element.onmousedown = function(event) {
        actElem = document.activeElement;
        if (actElem.classList.contains('k-editable')) {
            this.classList.add('active');
            if (this.getAttribute('data') == 'Backspace') {
                actElem.value = actElem.value.substring(0, actElem.value.length - 1);
            } else if (this.getAttribute('data') == 'Enter') {
                actElem.value += '\n';
            } else {
                actElem.value += this.getAttribute('data');
            }
        }
    }
});
document.onmouseup = function(event) {
    document.querySelectorAll('#keyboard .key').forEach(function(element) {
        element.classList.remove('active');
    });
    actElem.focus();
    actElem = 0;
}
function keyboardInit() {
    let output = '<div id="block-1"><div class="line">';
    for (let i = 0; i < qwerty.length; i++) {
        if (i == 13 || i == 25 || i == 37) output += '</div><div class="line">';
        output += '<div class="key" data="' + qwerty[i] + '">' + qwerty[i] + '</div>';
    }
    output += '</div><div class="line"><div class="key" data=" ">Space</div></div></div>';
    output += '<div id="block-2"><div class="key" data="Backspace">Backspace</div><div class="key" data="Enter">Enter</div></div>';
    document.querySelector('#keyboard').innerHTML = output;
}
