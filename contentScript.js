function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.prevSibling);
}

function loadElement(url){
    var typeNumber = 4;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(url);
        qr.make();
    var qrData = qr.createImgTag();

    var oldElem = document.getElementById('qrrrr');
    if(!oldElem){
        var contatiner = document.getElementById('meta-contents');
        var elem = document.createElement('div');
        elem.id = 'qrrrr';
        elem.setAttribute('style',
        'float: right; ' + 
        'width: 110px;' + 
        'height: 110px;' + 
        'margin-top: -145px;' + 
        'margin-right: 4px;' +
        'border: solid 1px #000;');

        insertBefore(elem, contatiner);

        elem.innerHTML = qrData;
        var qrElem = elem.firstChild;
        qrElem.setAttribute('width','100%');
        qrElem.setAttribute('height','');
    } else {
        oldElem.innerHTML = qrData;
        var qrElem = oldElem.firstChild;
        qrElem.setAttribute('width','100%');
        qrElem.setAttribute('height','');
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === 'video-update-check' && request.url.includes("v=")) {
          setTimeout(function(){
            loadElement(request.url);
          }, 1000);
      }
    }
);
