let ColorML = {

	savedColors: [],

	color: {
		red: "0",
		green: "0",
		blue: "0",
		name: ""
	},

	net: new brain.NeuralNetwork({hiddenLayers: [3, 14]}),

	init: () => {
		
		ColorML.cycleNewColor();

		$('.train-network').click(ColorML.trainNetwork);

		$('.guess-color').click(() => ColorML.guessColor(ColorML.color));
		
		$('.import-training-data').click(ColorML.importTrainingData);

		$('.export-training-data').click(ColorML.exportTrainingData);

		$('.color-button').click(ColorML.userGuessColor);

		$('.color-slider').change(ColorML.handleColorSlider);
	},

	handleColorSlider: (e) => {
		const slider = e.target;

		ColorML.color[slider.name] = slider.value;

		ColorML.updateColorOutput(ColorML.color);
		ColorML.updateColorReadouts(ColorML.color);
	},

	userGuessColor: (e) => {
		const newColor = ColorML.cycleNewColor(),
					button = e.target,
					colorName = $(button).data('color');

		ColorML.storeColor(newColor, colorName);
	},

	updateColorSliders: (color) => {
		$('.color-slider').each((index, element) => {
			let slider = $(element),
					sliderColor = slider.attr('name');

					slider.val(color[sliderColor]);
		});
	},

	cycleNewColor: () => {
		const newColor = ColorML.generateRandomColorObject();
		
		ColorML.updateColorObject(newColor);
		ColorML.updateColorOutput(newColor);
		ColorML.updateColorSliders(newColor);
		ColorML.updateColorReadouts(newColor);

		return newColor;
	},

	storeColor: (color, name) => {
		const tmpObj = {
			red: color.red,
			green: color.green,
			blue: color.blue,
			name: name
		};

		ColorML.savedColors.push(tmpObj);

		$('#stored-color-total').text(ColorML.savedColors.length);
	},

	trainNetwork: function() {
		const trainingData = ColorML.savedColors.map((data) => {
			let tmpObj = {
				input: {
						red: (parseInt(data.red) / 255),
						green: (parseInt(data.green) / 255),
						blue: (parseInt(data.blue) / 255)
				},
				output: {}
			};

			tmpObj.output[data.name] = 1;

			return tmpObj;
		});

		ColorML.net.train(trainingData);

		alert('Network trained');
	},

	generateRandomColorObject: () => {
		const randomInteger = ceiling => Math.floor(Math.random() * ceiling);

		const color = {
			red: randomInteger(256),
			green: randomInteger(256),
			blue: randomInteger(256)
		};

		return color;
	},

	guessColor: (color) => {

		const output = ColorML.net.run({
				red: (parseInt(color.red) / 255),
				green: (parseInt(color.green) / 255),
				blue: (parseInt(color.blue) / 255)
		});

		let highest = {
			key: null,
			value: null
		}

		Object.keys(output).forEach((key, index) => {
			if(output[key] > highest.value) {
				highest.key = key;
				highest.value = output[key];
			}
		});

		alert(highest.key);
	},

	importTrainingData: () => { ColorML.net.fromJSON(JSON.parse($('#trained-data').val())) },

	exportTrainingData: () => { $('#trained-data').val(JSON.stringify(ColorML.net.toJSON())) },

	updateColorOutput: (color) => $('.color-output').css('backgroundColor', `rgb(${color.red}, ${color.green}, ${color.blue})`),

	updateColorObject: (color) => {
		ColorML.color.red = color.red;
		ColorML.color.green = color.green;
		ColorML.color.blue = color.blue;
	},

	updateColorReadouts: (color) => {
		$('.color-readout').each((index, element) => {
			const elementColor = $(element).data('color');

			$(element).text(color[elementColor]);
		});
	},
}

$(document).ready(ColorML.init);