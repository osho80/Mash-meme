'use strict';

// ****** Const & Globals *******

var gCanvas;
var gCtx;
var gElGallery = document.querySelector('.imgs-gallery');
var gElEditor = document.querySelector('.meme-editor');
var gElMemes = document.querySelector('.meme-gallery');




function onInit() {
    renderGallery(gImgs);
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        //console.log('window: ', window);
        if (window.innerWidth >= 740) return;  /// Really??
        if (window.innerWidth < 740) {
            removeFromStorage(MEME_KEY);
            // gCanvas.width = window.innerWidth
            gCanvas.width = 0.95 * window.innerWidth
            gCanvas.height = 0.95 * window.innerWidth
            onDrawText(gMeme.lines[0].text);
            // onDrawText(gMeme.lines[1].text);
            saveToStorage(MEME_KEY, gMeme);
            //loadFromStorage(MEME_KEY);

        }
    });

}

function renderGallery(imgs) {
    
    var strHTMLs = imgs.map(function getImgsHTML(img) {
        return `<img class="gallery-img" id="${img.id}" src="${img.url}" onclick="onSetEditor(this)">`
    });

    document.querySelector('.gallery-display').innerHTML = strHTMLs.join('');

}

function renderMemes() {
    var memes = getMemesForDisplay();
    var strHTMLs = memes.map(function (meme, idx) {

        return `<img class="meme-gal-item" id="${idx}-memes" src="${meme.data}" onclick="targetMeme(this)">`
    });
    document.querySelector('.memes-display').innerHTML = strHTMLs.join('');
}

function openMemes() {
    gElEditor.style.display = 'none';
    gElGallery.style.display = 'none';
    gElMemes.style.display = 'block';
    renderMemes();
}

function openGallery() {
    gElEditor.style.display = 'none';
    gElMemes.style.display = 'none';
    gElGallery.style.display = 'block';
    setMemeToDefault();       //Why do we need it here? if gMeme was changed, like when editing saved meme. 
    renderGallery(gImgs);
}

function openEditor() {
    gElGallery.style.display = 'none';
    gElMemes.style.display = 'none';
    gElEditor.style.display = 'flex';
}

function onSetEditor(img) {             // operates by click on an image
    openEditor();
    var imgId = parseInt(img.id);
    setMemeImg(imgId);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    var lines = getMemeLines();
    lines.forEach(line => drawText(line)); 
    dispEditableTxt();
    // saveToStorage(MEME_KEY, gMeme);          Do we need it?

}

function editMeme(meme) {
    openEditor();
    renderCanvas(meme);
    gMeme = meme;

    //saveToStorage(MEME_KEY, meme);
}

function targetMeme(imgTag) {           //onclick meme in meme gallery
    var idx = parseInt(imgTag.id);
    var meme = getMemeToEdit(idx)
    editMeme(meme);
}

function renderCanvas(meme) {
    var imgId = meme.selectedImgId;
    var imgUrl = findImgById(imgId);
    var img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        var lines = meme.lines;
        lines.forEach(line => drawText(line));  
    }
    
}

function onDrawText(txt) {
    setTextToMeme(txt);
}

function drawText(line) {
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = line.fill;
    gCtx.font = line.size + 'px' + ' ' + line.font;
    gCtx.textAlign = line.align
    gCtx.fillText(line.text, line.xPos, line.yPos);
    gCtx.strokeText(line.text, line.xPos, line.yPos);
}


function onIncreaseFont() {
    increaseFont();
}

function onDecreaseFont() {
    decreaseFont();
}

function onLineDown() {
    lineDown();
}

function onLineUp() {
    lineUp();
}

function onChangeLine() {
    changeLineIdx();
    dispEditableTxt();
}



function onSaveToMemes() {
    saveToMemes();
}

function dispEditableTxt() {       
    var currLine = document.querySelector('input.meme-txt');
    currLine.value = gMeme.lines[gMeme.selectedLineIDx].text;
}



function handleTouch(ev) {
    // See the effect of preventDefault regarding scrolling down inside the box 
    ev.preventDefault()
    console.log(ev.type)
}

// function onSearhcImg() {

// }


function filterImgs() {     //not working properly
    var searchInput = document.querySelector('.search-img').value;
    var copyImgs = gImgs.slice();  
    var imgs = [];
    copyImgs.forEach(function (img, idx) {
        img.keywords.forEach(function(word) {
            if(word.includes(searchInput)) {
                var currImg = copyImgs.splice(idx, 1);
                console.log(currImg);
                console.log(...currImg);
                
                imgs.push(...currImg)
                //console.log('idx: ', idx);
                
                
            }
        })
        if (img.keywords.includes(searchInput)) imgs.push(img);
    });
    console.log('imgs: ', imgs);
    
    if (!imgs || !imgs.length) imgs = gImgs;

    renderGallery(imgs);
}




// function findImgById(imgId) {

//     var currImg = gImgs.find((img) => img.id === imgId);
//     return currImg.url;

// }



// keywords.forEach(function(word) {
//     if()
// })
// // dog
// dogs


// var searchInput = document.querySelector('.search-img').value;

//     var imgs = []; 
//     gImgs.forEach(function(img) {

//         if(img.keywords.includes(searchInput)) imgs.push(img);
//     });

//     if(!imgs || !imgs.length) imgs = gImgs;

//     renderGallery(imgs);