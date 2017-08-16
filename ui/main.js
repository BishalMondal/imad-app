console.log('Loaded!');

var element = document.getElementById('main-text'
            );
element.innertHTML = 'New Value';

//move the image onclick

var img = document.getelementById('madi');

img.onclick = function() {
    img.style.marginLeft = '100px';
};