'use strict';

// ****** Const & Globals *******

var gCanvas;
var gCtx;
var gElGallery = document.querySelector('.imgs-gallery');
var gElEditor = document.querySelector('.meme-editor');
var gElMemes = document.querySelector('.meme-gallery');
var gSavedMemes; 



function onInit() {
    renderGallery();
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        //console.log('window: ', window);
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

        }
    });
    
}

function renderGallery() {
    var imgs = gImgs;
    var strHTMLs = imgs.map(function getImgsHTML(img) {
        return `<img class="gallery-img" id="${img.id}" src="${img.url}" onclick="onSetEditor(this)">`
    });

    document.querySelector('.gallery-display').innerHTML = strHTMLs.join('');
    
}

function renderMemes() {
    var memes = loadFromStorage(SAVED_MEME);
    var strHTMLs = memes.map(function(meme, idx) {
        
        return `<img class="meme-gal-item" id="${idx}-memes" src="${meme.data}" onclick="targetMeme(this)">`
        
        
    });
    document.querySelector('.memes-display').innerHTML = strHTMLs.join('');
}

function openMemes(){
    gElEditor.style.display = 'none';
    gElGallery.style.display = 'none';
    gElMemes.style.display = 'block';
    renderMemes();

}

function openGallery(){ 
    gElEditor.style.display = 'none';
    gElMemes.style.display = 'none';
    gElGallery.style.display = 'block';
    gMeme = {
        selectedImgId: '',
        selectedLineIDx: 0,
        lines: [
            {
                text: 'I love to meme',
                size: 40,
                xPos: 30,
                yPos: 60,
                align: 'left',
                color: 'green',
                font: 'david'
            },
    
            {
                text: '#MeToo',
                size: 40,
                xPos: 30,
                yPos: 430,
                align: 'left',
                color: 'red',
                font: 'IMPACT'
            }
        ]
    }
    renderGallery();
}

function filterImgs() {
    console.log('not available yet');
    
}

function onSetEditor(img) {
    gElGallery.style.display = 'none';
    gElMemes.style.display = 'none';
    gElEditor.style.display = 'flex';
    // gElGallery.style.visibility = 'hidden';
    // gElEditor.style.visibility = 'visible';
    gMeme.selectedImgId = parseInt(img.id);
    
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gMeme.lines.forEach(function(line, idx) {
      
        drawText(gMeme, idx);
       
    });
    saveToStorage(MEME_KEY, gMeme);
    
    
}

function editMeme(meme, imgId) {
    gElGallery.style.display = 'none';
    gElMemes.style.display = 'none';
    gElEditor.style.display = 'flex';
    var imgUrl = findImgById(imgId);
    
    var img2Set = new Image();
    img2Set.src = imgUrl;
    img2Set.onload = () => {
    gCtx.drawImage(img2Set, 0, 0, gCanvas.width, gCanvas.height);
        meme.lines.forEach(function(line, idx) {
            
            drawText(meme, idx);
            
        });
    }
    removeFromStorage(MEME_KEY);
    gMeme = meme;
    saveToStorage(MEME_KEY, meme);


}

function targetMeme(imgTag) {
    var idx = parseInt(imgTag.id);
    var memes = loadFromStorage(SAVED_MEME);
    var selectedMeme = memes[idx]
    var imgId = selectedMeme.selectedImgId;
    
    editMeme(selectedMeme, imgId);
}

function findImgById(imgId) {
    
    var currImg = gImgs.find((img) => img.id === imgId);
    return currImg.url;
    
}

function setImgOnCanvas(url, txt) {
    gMeme.lines[gMeme.selectedLineIDx].text = txt;
    var img2Set = new Image();
    img2Set.src = url;
    img2Set.onload = () => {
    gCtx.drawImage(img2Set, 0, 0, gCanvas.width, gCanvas.height);
        gMeme.lines.forEach(function(line, idx) {
            
            drawText(gMeme, idx);
            
        });
    }
}

function onDrawText(txt) {
    loadFromStorage(MEME_KEY);
    var imgUrl = findImgById(gMeme.selectedImgId);
    //debugger
    setImgOnCanvas(imgUrl, txt);
   
    removeFromStorage(MEME_KEY);
    saveToStorage(MEME_KEY, gMeme);
    
}

function drawText(meme, idx) {
    
    
    gCtx.beginPath();
    
    gCtx.strokeStyle = meme.lines[idx].color
    gCtx.fillStyle = 'white'
    gCtx.font = meme.lines[idx].size + 'px' + ' ' + meme.lines[idx].font;
    
    gCtx.textAlign = meme.lines[idx].align
    var memeTxt = meme.lines[idx].text;
    //debugger
    gCtx.fillText(memeTxt,  meme.lines[idx].xPos,  meme.lines[idx].yPos);
    gCtx.closePath();
    gCtx.strokeText(memeTxt, meme.lines[idx].xPos,  meme.lines[idx].yPos);
    
}


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
        
    } else {
        ++gMeme.selectedLineIDx;
       
    }
    // console.log('line: ', gMeme.selectedLineIDx);
    
    editLine();
    // var currLine = document.querySelector('input.meme-txt');
   
    // currLine.value = gMeme.lines[gMeme.selectedLineIDx].text;
    
    
}


function saveToMemes() {
    //debugger
    var gSavedMemes = loadFromStorage(SAVED_MEME)
    if(!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = [];
    }
    var currMeme = gMeme;
    currMeme.data = gCanvas.toDataURL();
    gSavedMemes.push(currMeme); 
    saveToStorage(SAVED_MEME, gSavedMemes);
}

function editLine() {       //maybe can be deleted!!! no, need it for first focus.
    
    var currLine = document.querySelector('input.meme-txt');
    
    currLine.value = gMeme.lines[gMeme.selectedLineIDx].text;
    
    
}



function handleTouch(ev) {
    // See the effect of preventDefault regarding scrolling down inside the box 
    ev.preventDefault()
    console.log(ev.type)
}