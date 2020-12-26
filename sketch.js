let f;
let txtSize = 800;
let t;
let fontArray;
let xHeightLevel;
let xHeightRatio;
let txtBaseLine;
let detailedFontArray = [];
let studyLetters = ["ä","ë","ï","ÿ","ü","ö"];
let lettersIndex = 0;
let studyLetter = studyLetters[lettersIndex];
let counterShapeIndex = 0;

function preload() {
    f = loadFont('assets/Abril_Fatface.otf');
    
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    txtSize = windowHeight*0.8;
    textFont(f);
    textSize(width);
    fontArray = f.textToPoints("x", 0, textAscent(), width);
    xHeightLevel = fontArray[0].y;
    for (let i = 1; i < fontArray.length; i++) {
        if (fontArray[i].y < xHeightLevel) {
            xHeightLevel = fontArray[i].y;
        }
      
    }
    let xHeight = (textAscent() - xHeightLevel);
    xHeightRatio = xHeight/textAscent();

    textSize(txtSize);
    txtBaseLine = textAscent()*xHeightRatio/2 + height/2;

    fontArray = f.textToPoints(studyLetters[lettersIndex], width/2, txtBaseLine, txtSize, {
        sampleFactor: 0.25,
        simplifyThreshold: 0
      });
    

    
    // detailed analysis
    let _fontAnalysis = [];
    let currP, prevP;
    prevP = createVector(fontArray[0].x,fontArray[0].y);    
    let j = 0;
    let k = 0;
    _fontAnalysis[j] = [];
    _fontAnalysis[j][k] = prevP;
    for (let i = 1; i < fontArray.length; i++) {
        currP = createVector(fontArray[i].x,fontArray[i].y);
        if (prevP.dist(currP) > 5) {
            j++;
            _fontAnalysis[j] = [];
            k = 0;
            _fontAnalysis[j][k] = currP;
        } else {
            k++;            
            _fontAnalysis[j][k] = currP;
        }
        prevP = currP;
    }

    while (_fontAnalysis.length > 0) {
        let vertexHighIndex = 0;
        for (let i = 1; i < _fontAnalysis.length; i++) {
            if (_fontAnalysis[i].length > _fontAnalysis[vertexHighIndex].length) {
                vertexHighIndex = i;
            }
        }
        detailedFontArray.push(_fontAnalysis[vertexHighIndex]);
        _fontAnalysis.splice(vertexHighIndex,1)
    }

}

function draw() {
    background(200);
    colorMode(HSB,360,100,100);

    noStroke();
    fill(0,100,100);

    push();
    beginShape();
    for (let j = 0; j < detailedFontArray[0].length; j++) {
        vertex(detailedFontArray[0][j].x-textWidth(studyLetter)/2+map(mouseY,0,height/2,-20,20),detailedFontArray[0][j].y);
    }
    for (let j = 1; j < detailedFontArray.length; j++) {
        beginContour();
        for (let k = 0; k < detailedFontArray[j].length; k++) {
            vertex(detailedFontArray[j][k].x-textWidth(studyLetter)/2+map((k%2 == 0?mouseX:mouseY),0,width/2,-20,20),detailedFontArray[j][k].y);
        }
        endContour();
    }
    endShape(CLOSE);
    pop();
 
}

function mousePressed() {
    if (lettersIndex >= studyLetters.length-1) {
        lettersIndex = 0;
    } else {
        lettersIndex++;
    }
    fontArray = f.textToPoints(studyLetters[lettersIndex], width/2, txtBaseLine, txtSize, {
        sampleFactor: 0.25,
        simplifyThreshold: 0
      });
    
    detailedFontArray = [];
    
    // detailed analysis
    let _fontAnalysis = [];
    let currP, prevP;
    prevP = createVector(fontArray[0].x,fontArray[0].y);    
    let j = 0;
    let k = 0;
    _fontAnalysis[j] = [];
    _fontAnalysis[j][k] = prevP;
    for (let i = 1; i < fontArray.length; i++) {
        currP = createVector(fontArray[i].x,fontArray[i].y);
        if (prevP.dist(currP) > 5) {
            j++;
            _fontAnalysis[j] = [];
            k = 0;
            _fontAnalysis[j][k] = currP;
        } else {
            k++;            
            _fontAnalysis[j][k] = currP;
        }
        prevP = currP;
    }

    while (_fontAnalysis.length > 0) {
        let vertexHighIndex = 0;
        for (let i = 1; i < _fontAnalysis.length; i++) {
            if (_fontAnalysis[i].length > _fontAnalysis[vertexHighIndex].length) {
                vertexHighIndex = i;
            }
        }
        detailedFontArray.push(_fontAnalysis[vertexHighIndex]);
        _fontAnalysis.splice(vertexHighIndex,1)
    }    

}


