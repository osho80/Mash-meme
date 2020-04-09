'use strict';

// ****** Const & Globals *******

var gCanvas;
var gCtx;
var gElGallery = document.querySelector('.imgs-gallery');
var gElEditor = document.querySelector('.meme-editor');









function onInit() {
    renderGallery();
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
}


function renderGallery() {
    var imgs = gImgs;
    var strHTMLs = imgs.map(function getImgsHTML(img) {
        return `<img class="gallery-img" id="img-${img.id}" src="${img.url}" onclick="onSetEditor(this)">`
    });

    document.querySelector('.gallery-display').innerHTML = strHTMLs.join('');
    
}

function onSetEditor(img) {
    gElGallery.style.display = 'none';
    gElEditor.style.display = 'block'
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    // console.log(img);
    
}

