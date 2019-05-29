var copySpan;
var interval;
var timer;
var startTime;

var speechMark = [
    {"time":6,"type":"word","start":0,"end":6,"value":"Listen"},
    {"time":707,"type":"word","start":8,"end":17,"value":"customize"},
    {"time":1704,"type":"word","start":19,"end":22,"value":"and"},
    {"time":1875,"type":"word","start":23,"end":31,"value":"download"},
    {"time":2351,"type":"word","start":32,"end":38,"value":"speech"},
    {"time":3308,"type":"word","start":40,"end":49,"value":"Integrate"},
    {"time":3784,"type":"word","start":50,"end":54,"value":"when"},
    {"time":3929,"type":"word","start":55,"end":61,"value":"you're"},
    {"time":4128,"type":"word","start":62,"end":67,"value":"ready"},
    {"time":4890,"type":"word","start":69,"end":73,"value":"Type"},
    {"time":5136,"type":"word","start":74,"end":76,"value":"or"},
    {"time":5241,"type":"word","start":77,"end":82,"value":"paste"},
    {"time":5580,"type":"word","start":83,"end":87,"value":"your"},
    {"time":5687,"type":"word","start":88,"end":92,"value":"text"},
    {"time":6057,"type":"word","start":93,"end":95,"value":"in"},
    {"time":6128,"type":"word","start":96,"end":99,"value":"the"},
    {"time":6187,"type":"word","start":100,"end":106,"value":"window"},
    {"time":6988,"type":"word","start":108,"end":114,"value":"choose"},
    {"time":7291,"type":"word","start":115,"end":119,"value":"your"},
    {"time":7384,"type":"word","start":120,"end":128,"value":"language"},
    {"time":7865,"type":"word","start":129,"end":132,"value":"and"},
    {"time":7999,"type":"word","start":133,"end":139,"value":"region"},
    {"time":8743,"type":"word","start":141,"end":147,"value":"choose"},
    {"time":9046,"type":"word","start":148,"end":149,"value":"a"},
    {"time":9092,"type":"word","start":150,"end":155,"value":"voice"},
    {"time":9783,"type":"word","start":157,"end":163,"value":"choose"},
    {"time":10101,"type":"word","start":164,"end":170,"value":"Listen"},
    {"time":10397,"type":"word","start":171,"end":173,"value":"to"},
    {"time":10497,"type":"word","start":174,"end":180,"value":"speech"},
    {"time":11254,"type":"word","start":182,"end":185,"value":"and"},
    {"time":11379,"type":"word","start":186,"end":190,"value":"then"},
    {"time":11534,"type":"word","start":191,"end":200,"value":"integrate"},
    {"time":11959,"type":"word","start":201,"end":203,"value":"it"},
    {"time":12067,"type":"word","start":204,"end":208,"value":"into"},
    {"time":12224,"type":"word","start":209,"end":213,"value":"your"},
    {"time":12380,"type":"word","start":214,"end":226,"value":"applications"},
    {"time":13196,"type":"word","start":227,"end":230,"value":"and"},
    {"time":13323,"type":"word","start":231,"end":239,"value":"services"},
    
];

function startReading () {
  console.log('reading text');

  const spanText = document.getElementById('polly1');
  copySpan = spanText.innerHTML; //for later use on stopReading
 
  var text2convert = spanText.innerText;
  var texts = text2convert.split(' ');
  
  var newDomString = '';
  if (texts && texts.length > 0) {
    let index = 0;
    newDomString = texts.reduce((acc, cur) => {
      index++;
      return acc+' <span class="evenOrOdd'+ (index%2) +' span'+ index +'"  id="span'+ index +'">'+cur+'</span>'; 
    }, '')
  }
  
  spanText.innerHTML = newDomString;
  startListening();
}

function stopReading () {
  const spanText = document.getElementById('polly1');
  spanText.innerHTML = copySpan || spanText.innerHTML;
  startTime = undefined;
  console.log('stop reading');
}

function startListening () {
    console.log('start listening');
    const audio = document.querySelector('audio');
    
    audio.addEventListener('timeupdate', (event) => {
        removeHighlights();
        highlightText(event.target.currentTime * 1000); //to milli seconds
    });
}

function highlightText(curTime) {
  if (!startTime) {
      startTime = curTime;
  }
  var elapsedTime = curTime - startTime;
  var i = 0;
  var ind = speechMark.find((obj) => {
    i++;
    return (elapsedTime <= obj.time);
  }); // doesnt work in IE
 
  foundSpan = document.getElementById("span"+i);
  spanClassList = foundSpan && foundSpan.classList;
  spanClassList && spanClassList.add('highlight');
}

function removeHighlights () {
  var highlightedTexts = document.getElementsByClassName('highlight');
  let classList;
  for (let i in highlightedTexts) {
    classList = highlightedTexts[i].classList;
    classList && classList.remove('highlight');
  }
}
