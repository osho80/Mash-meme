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
        return `<img class="gallery-img" id="${img.id}" src="${img.url}" onclick="onSetEditor(this)">`
    });

    document.querySelector('.gallery-display').innerHTML = strHTMLs.join('');
    
}

function onSetEditor(img) {
    gElGallery.style.display = 'none';
    gElEditor.style.display = 'flex';
    // gElGallery.style.visibility = 'hidden';
    // gElEditor.style.visibility = 'visible';
    gMeme.selectedImgId = parseInt(img.id);
    
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    saveToStorage(MEME_KEY, gMeme);
    drawText (gMeme);
    //console.log(img);
    
}

function findImgById(imgId) {
    
    var currImg = gImgs.find((img) => img.id === imgId);
    //console.log(currImg.url);
    return currImg.url;
    //.url;
    
}

function setImgOnCanvas(url) {
    var img2Set = new Image();
    img2Set.src = url;
    gCtx.drawImage(img2Set, 0, 0, gCanvas.width, gCanvas.height);
}

function onDrawText(txt) {
    loadFromStorage(MEME_KEY);
    var imgUrl = findImgById(gMeme.selectedImgId);
    setImgOnCanvas(imgUrl);
        //gCtx.drawImage(img2Set, 0, 0, gCanvas.width, gCanvas.height);
        //gMeme.lines[0].text = '';
        //drawText(gMeme);
    gMeme.lines[0].text = txt;
    drawText(gMeme);
    removeFromStorage(MEME_KEY);
    saveToStorage(MEME_KEY, gMeme);
        //var elText = document.querySelector('.meme-txt');
    
    
        //console.log(txt);
        //selected Img, LineIdx
        // saveToStorage(MEME_KEY, gMeme);
        //gMeme.lines[0].text = txt;
        // render
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
    //renderMeme();
    // (text, x, y)
}

// function renderMeme() {
//     removeFromStorage(MEME_KEY);
//     var elText = document.querySelector('.meme-txt');
//     console.log(elText.value);
    
//     onDrawText(elText.value);
//     saveToStorage(MEME_KEY);
// }

function onIncreaseFont() {
    //debugger
    gMeme.lines[0].size++;
    //removeFromStorage(MEME_KEY);
    saveToStorage(MEME_KEY, gMeme);
    onDrawText(gMeme.lines[0].text);
}

function onDecreaseFont() {
    gMeme.lines[0].size--;
    saveToStorage(MEME_KEY, gMeme);
    onDrawText(gMeme.lines[0].text);
}
