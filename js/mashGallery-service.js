'use strict';


var gImgs = [{
    id: 1001,
    url: 'gallery/1.jpg',
    keywords: ['trump'] 
},

{   id: 1002,
    url: 'gallery/2.jpg',
    keywords: ['dogs'], 
},

{   id: 1003,
    url: 'gallery/3.jpg',
    keywords: ['dog', 'baby', 'sleeping', 'peaceful']
},

{   id: 1004,
    url: 'gallery/4.jpg',
    keywords: ['cat', 'sleeping', 'peaceful']
},

{   id: 1005,
    url: 'gallery/5.jpg',
    keywords: ['baby', 'child', 'angery']
},

{   id: 1006,
    url: 'gallery/6.jpg',
    keywords: ['man', 'hair', 'explain', 'big']
},

{   id: 1007, 
    url: 'gallery/7.jpg',
    keywords: ['child', 'baby', 'surprised', 'amazed']    
},

{   id: 1008, 
    url: 'gallery/8.jpg',
    keywords: ['man', 'hat', 'smiling', 'funny']    
}
];


function getImgsForDisplay(){
    return gImgs;
}

function findImgById(imgId) {

    var currImg = gImgs.find((img) => img.id === imgId);
    return currImg.url;

}