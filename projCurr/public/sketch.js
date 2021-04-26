let video;
let classifier;
let modelURL = './model/';
let label = "waiting...";
let imageCurr;

	var loadFile = function (event) {
		imageCurr = document.getElementById('output');
		imageCurr.src = URL.createObjectURL(event.target.files[0]);
	};

	// STEP 1: Load the model!
	function preload() {
		classifier = ml5.imageClassifier(modelURL + 'model.json');
	}
	function setup() {
		var canv = createCanvas(350, 200);
		canv.parent('sketch-holder');

		// Create the video
		video = createCapture(VIDEO);
		video.hide();

		// STEP 2.1: Start classifying
		classifyVideo();
	}

	// STEP 2.2 classify!
	function classifyVideo() {
		classifier.classify(video, gotResults);
	}

	function draw() {
		// document.getElementById("myAnchor").id = "newid";
		push();
		translate(width, 0);
		scale(-1, 1);
		image(video, 0, 0, 350, 200);
		pop();
	
		// STEP 4: Draw the label
		textSize(48);
		textAlign(CENTER, CENTER);
		fill(255);
		text(label, width / 2, height - 16);
	}
	
	// STEP 3: Get the classification!
	function gotResults(error, results) {
		// Something went wrong!
		if (error) {
		console.error(error);
		return;
		}
		// Store the label and classify again!
		label = results[0].label;
		classifyVideo();
		console.log(label);
	}
  
	// Make a prediction with a selected image
	function classifyImg() {
		let outputPred;
		classifier.predict(document.getElementById('output'), function(err, results) {
			outputPred = results[0].label;
			document.getElementById('out').innerHTML = outputPred;
			
		});
	}