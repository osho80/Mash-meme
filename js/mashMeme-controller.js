'use strict';

// ****** Const & Globals *******

var gCanvas;
var gCtx;
var gElGallery = document.querySelector('.imgs-gallery');
var gElEditor = document.querySelector('.meme-editor');
//var gLineYaxisPos = 60; // locates text start on canvas








function onInit() {
    renderGallery();
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        console.log('window: ', window);
        if(window.innerWidth >= 740) return;
        if(window.innerWidth < 740) {
            removeFromStorage(MEME_KEY);
            // gCanvas.width = window.innerWidth
            gCanvas.width = 0.95*window.innerWidth
            gCanvas.height = 0.95*window.innerWidth
            onDrawText(gMeme.lines[0].text);
            // onDrawText(gMeme.lines[1].text);
            saveToStorage(MEME_KEY, gMeme);
            //loadFromStorage(MEME_KEY);
            //var img = 
            // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
            // gMeme.lines.forEach(function(line, idx) {
            //     //line.text = txt;
            //     console.log(idx);
            //     drawText(gMeme, idx);
            //     //gLineYaxisPos = gLineYaxisPos + 100;
            // });
            // saveToStorage(MEME_KEY, gMeme);

        }
        //gCanvas.height = window.innerHeight
    });
    
}

function renderGallery() {
    var imgs = gImgs;
    var strHTMLs = imgs.map(function getImgsHTML(img) {
        return `<img class="gallery-img" id="${img.id}" src="${img.url}" onclick="onSetEditor(this)">`
    });

    document.querySelector('.gallery-display').innerHTML = strHTMLs.join('');
    
}

function openGallery(){ 
    gElEditor.style.display = 'none';
    gElGallery.style.display = 'block';
    renderGallery();
}

function onSetEditor(img) {
    gElGallery.style.display = 'none';
    gElEditor.style.display = 'flex';
    // gElGallery.style.visibility = 'hidden';
    // gElEditor.style.visibility = 'visible';
    gMeme.selectedImgId = parseInt(img.id);
    
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gMeme.lines.forEach(function(line, idx) {
        //line.text = txt;
        console.log(idx);
        drawText(gMeme, idx);
        //gLineYaxisPos = gLineYaxisPos + 100;
    });
    saveToStorage(MEME_KEY, gMeme);
    //drawText (gMeme);
    //console.log(img);
    
}

function findImgById(imgId) {
    
    var currImg = gImgs.find((img) => img.id === imgId);
    //console.log(currImg.url);
    return currImg.url;
    //.url;
    
}

function setImgOnCanvas(url, txt) {
    gMeme.lines[gMeme.selectedLineIDx].text = txt;
    var img2Set = new Image();
    img2Set.src = url;
    img2Set.onload = () => {
    gCtx.drawImage(img2Set, 0, 0, gCanvas.width, gCanvas.height);
        gMeme.lines.forEach(function(line, idx) {
            //line.text = txt;
            console.log(idx);
            drawText(gMeme, idx);
            //gLineYaxisPos = gLineYaxisPos + 100;
            // line[gMeme.selectedLineIDx].text = txt;
        });
    }
}

function onDrawText(txt) {
    loadFromStorage(MEME_KEY);
    var imgUrl = findImgById(gMeme.selectedImgId);
    //debugger
    setImgOnCanvas(imgUrl, txt);
        //gCtx.drawImage(img2Set, 0, 0, gCanvas.width, gCanvas.height);
        //gMeme.lines[0].text = '';
        //drawText(gMeme);
    // ***** Need map function *****
    // for(var i = 0; i <  gMeme.lines.length; i++){
    //     gMeme.lines[0].text = txt;
    //     drawText(gMeme);
    //     gLineYaxisPos = gLineYaxisPos + 400;
    // }
    
    
    
    //gMeme.lines[0].text = txt;
    //drawText(gMeme);
    removeFromStorage(MEME_KEY);
    saveToStorage(MEME_KEY, gMeme);
        //var elText = document.querySelector('.meme-txt');
    
    
        //console.log(txt);
        //selected Img, LineIdx
        // saveToStorage(MEME_KEY, gMeme);
        //gMeme.lines[0].text = txt;
        // render
}

function drawText(meme, idx) {
    console.log(meme, idx);
    
    gCtx.beginPath();
    // gCtx.moveTo(10, 10);
    
    // gCtx.lineWidth = '2'
    gCtx.strokeStyle = meme.lines[idx].color
    gCtx.fillStyle = 'white'
    gCtx.font = meme.lines[idx].size + 'px' + ' ' + meme.lines[idx].font;
    
    gCtx.textAlign = meme.lines[idx].align
    var memeTxt = meme.lines[idx].text;
    //debugger
    gCtx.fillText(memeTxt,  meme.lines[idx].xPos,  meme.lines[idx].yPos);
    gCtx.closePath();
    gCtx.strokeText(memeTxt, meme.lines[idx].xPos,  meme.lines[idx].yPos);
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
    gMeme.lines[gMeme.selectedLineIDx].size++;
    saveToStorage(MEME_KEY, gMeme);
    onDrawText(gMeme.lines[gMeme.selectedLineIDx].text);
}

function onDecreaseFont() {
    gMeme.lines[gMeme.selectedLineIDx].size--;
    saveToStorage(MEME_KEY, gMeme);
    onDrawText(gMeme.lines[gMeme.selectedLineIDx].text);
}

function lineDown() {
    gMeme.lines[gMeme.selectedLineIDx].yPos = gMeme.lines[gMeme.selectedLineIDx].yPos + 20;
    onDrawText(gMeme.lines[gMeme.selectedLineIDx].text);
}

function lineUp(){
    gMeme.lines[gMeme.selectedLineIDx].yPos = gMeme.lines[gMeme.selectedLineIDx].yPos - 20;
    onDrawText(gMeme.lines[gMeme.selectedLineIDx].text);
}

function changeLineIdx() {
    
    if(gMeme.selectedLineIDx >= gMeme.lines.length -1) {
        gMeme.selectedLineIDx = 0;
        // x.value.innerText = 'Oshri';
        //x = 'Oshri'
        //x = gMeme.lines[selectedLineIDx].text;
    } else {
        ++gMeme.selectedLineIDx;
        //x = gMeme.lines[selectedLineIDx].text;
    }
    console.log('line: ', gMeme.selectedLineIDx);
    var currLine = document.querySelector('input.meme-txt');
   
    currLine.value = gMeme.lines[gMeme.selectedLineIDx].text;
    
    
}

function editLine() {       //maybe can be deleted!!!
    //console.log('Im focused');
    var currLine = document.querySelector('input.meme-txt');
    //console.log('x before change: ', currLine);
    currLine.value = gMeme.lines[gMeme.selectedLineIDx].text;
    //console.log('x after change: ', currLine);
    
}



function handleTouch(ev) {
    // See the effect of preventDefault regarding scrolling down inside the box 
    ev.preventDefault()
    console.log(ev.type)
}