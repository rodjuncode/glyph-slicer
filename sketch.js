let f;
let txtSize = 800;
let t;
let fontArray;
let xHeightLevel;
let xHeightRatio;
let txtBaseLine;
let detailedFontArray = [];
let studyLetters = ["&"];
let lettersIndex = 0;
let studyLetter = studyLetters[lettersIndex];
let counterShapeIndex = 0;
let frame = 0;

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

    fontArray = f.textToPoints(studyLetters[lettersIndex], 0, txtBaseLine, txtSize, {
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
    colorMode(HSB,360,100,100,100);
    background(46,73,100);

    noStroke();
    noFill();

    push();
    beginShape();
    for (let j = 0; j < detailedFontArray[0].length; j++) {
        vertex(detailedFontArray[0][j].x+map(mouseY,0,height/2,-20,20),detailedFontArray[0][j].y);
        push();
        stroke(0,100,100);
        line(detailedFontArray[0][j].x+map(mouseY,0,height/2,-20,20),detailedFontArray[0][j].y,map(j,0,detailedFontArray[0].length-1,0,width),0);
        pop();
    }
    for (let j = 1; j < detailedFontArray.length; j++) {
        beginContour();
        for (let k = 0; k < detailedFontArray[j].length; k++) {
            vertex(detailedFontArray[j][k].x+map(mouseY,0,width/2,-20,20),detailedFontArray[j][k].y);
        }
        endContour();
        push();
        stroke(0,100,100);
        for (let k = 0; k < detailedFontArray[j].length; k++) {
            line(detailedFontArray[j][k].x+map(mouseY,0,height/2,-20,20),detailedFontArray[j][k].y,map(k,0,detailedFontArray[j].length-1,0,width),height);
        }
        pop();        
    }
    endShape(CLOSE);
    pop();
 
    frame++;

}

function keyTyped() {

    textSize(txtSize);

    fontArray = f.textToPoints(key, 0, txtBaseLine, txtSize, {
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

    return false;
    
}


