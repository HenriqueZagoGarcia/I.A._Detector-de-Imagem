Webcam.set({
    width: 350, 
    height: 300,
    image_formate: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() 
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('versão ml5:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cMGwPmHtT/model.json', modelLoaded);

function modelLoaded()
{
    console.log('modelo carregado!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult); 
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("resultObjectName").innerHTML = results[0].label;
        document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}