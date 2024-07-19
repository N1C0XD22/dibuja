function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
} 
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("white");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mousePressed){
        line(pmouseX, pmouseY, pmouseX, pmouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML='Etiqueta:' + results[0].label;
    document.getElementById("confidence").innerHTML='Presición:'+ Math.round(results[0].confdence*100)+ '%';
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}