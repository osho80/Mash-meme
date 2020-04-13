'use strict';

const MEME_KEY = 'meme';
const SAVED_MEME = 'savedMeme';

var gSavedMemes;

var gMeme = {
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
            fill: 'white',
            font: 'david'
        },

        {
            text: '#MeToo',
            size: 40,
            xPos: 30,
            yPos: 430,
            align: 'left',
            color: 'red',
            fill: 'white',
            font: 'IMPACT'
        }
    ]
}


function getMemesForDisplay() {
    var memes = loadFromStorage(SAVED_MEME);
    return memes;
}

function getMemeLines() {
    return gMeme.lines;
}

function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function getMemeToEdit(idx) {
    var memes = loadFromStorage(SAVED_MEME);
    var selectedMeme = memes[idx];
    //var imgId = selectedMeme.selectedImgId;
    //console.log('meme: ', selectedMeme);
    return selectedMeme;
}

function setTextToMeme(txt) {
    var line = gMeme.lines[gMeme.selectedLineIDx];
    line.text = txt;
    //drawText(line);
    //setMemeToEdit();
    renderCanvas(gMeme);
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIDx].size++;
    renderCanvas(gMeme);
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIDx].size--;
    renderCanvas(gMeme);
}

function lineDown() {
    gMeme.lines[gMeme.selectedLineIDx].yPos = gMeme.lines[gMeme.selectedLineIDx].yPos + 20;
    renderCanvas(gMeme);
}

function lineUp() {
    gMeme.lines[gMeme.selectedLineIDx].yPos = gMeme.lines[gMeme.selectedLineIDx].yPos - 20;
    renderCanvas(gMeme);
}

function changeLineIdx() {

    if (gMeme.selectedLineIDx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIDx = 0;

    } else {
        ++gMeme.selectedLineIDx;
    }
}


function setMemeToDefault() {
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

    return gMeme;
}

function saveToMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEME)
    if (!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = [];
    }
    
    var currMeme = gMeme;
    currMeme.data = gCanvas.toDataURL();
    gSavedMemes.push(currMeme);
    saveToStorage(SAVED_MEME, gSavedMemes);
}


