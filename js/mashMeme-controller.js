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
    gElEditor.style.display = 'flex';
    // gElGallery.style.visibility = 'hidden';
    // gElEditor.style.visibility = 'visible';
    
    
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    // console.log(img);
    
}

function onDrawText(txt) {
    console.log(txt);
    //selected Img, LineIdx
    // gMeme.selectedImgId
    gMeme.lines[0].text = txt;
    // render
    drawText (gMeme);
}

function drawText(meme) {
    gCtx.beginPath();
    // gCtx.moveTo(10, 10);
    
    // gCtx.lineWidth = '2'
    gCtx.strokeStyle = gMeme.lines[0].color
    gCtx.fillStyle = 'white'
    gCtx.font = gMeme.lines[0].size + 'px' + ' ' + gMeme.lines[0].font;
    
    gCtx.textAlign = gMeme.lines[0].align
    var memeTxt = gMeme.lines[0].text;
    gCtx.fillText(memeTxt, 10, 60);
    gCtx.closePath();
    gCtx.strokeText(memeTxt, 10, 60);
    // (text, x, y)
}

function onIncreaseFont() {
    gMeme.lines[0].size++
}

function onDecreaseFont() {
    gMeme.lines[0].size--
}
