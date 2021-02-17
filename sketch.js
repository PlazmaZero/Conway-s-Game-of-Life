var grid;
var isPaused = true;
var fps = 30;
var BGC;

function setup() {
	BGC = (color(54, 54, 116));
	frameRate(30);
	createCanvas(800, 500);
	grid = new Grid(10);
	grid.randomize();
	pauseButton = new Button(193, 162, 139, 120, 40, 425, 15, 30, 'Pause', 'Play');
	randomizeButton = new Button(159, 25, 61, 120, 20, 440, 70, 15, 'Randomize');
	clearButton = new Button(159, 25, 61, 165, 25, 420, 100, 15, 'Clear');
	// an adapted switching display where you can toggle between data sets
	liveCounter = new Button(255, 215, 0, 165, 25, 420, 135, 15, ('Dead Cell Count: ' + grid.deadCellCount), ('Live Cell Count: ' + grid.liveCellCount));
	fpsSlider = new Slider(21, 165, 178, 165, 30, 420, 235, 15, 'Speed (FPS): ' + fps);
	rgbSlider = new ColorSlider(21, 165, 178, 130, 20, 420, 300, 12, 'Cell Color: ');
	BGCSlider = new ColorSlider(21, 165, 178, 130, 20, 420, 365, 12, 'Background Color: ');
	hueSlider = new ColorSlider(21, 165, 178, 130, 20, 590, 300, 12, 'Background Hue: ');
	brightnessSlider = new ColorSlider(21, 165, 178, 130, 20, 590, 425, 12, 'Background Brighness: ');
	saturationSlider = new ColorSlider(21, 165, 178, 130, 20, 590, 365, 12, 'Background Saturation: ');
	colorResetButton = new Button(159, 25, 61, 165, 25, 620, 100, 15, 'Theme Reset');
	pentaButton = new Button(100, 229, 87, 165, 25, 620, 135, 15, 'Pentadecathlon');
	gliderButton = new Button(100, 229, 87, 165, 25, 620, 170, 15, 'Glider');
  print('The most challenging part of the customizations was creating the slider class which can be instantiated with different arguments. Having the slider button scale with inputed arguments and changing position with dragging was difficult to implement. Making hover detection (isMouseOn) to only read the button but still able to select the slider while not on the button took some thinking.');
  print('I implemented many p5 methods I discovered while looking through the library in my attempts to improve the interaction between the user and the grid. I had to think and learn about how to write many of my methods by looking the p5.js libraries and color testing sites.');
  print('Although there is much more that could be done, I would be happy to add this project to my portfolio since it familarized me to p5.js and js as a whole. The project also improved my use of objects and my class creation skills.');
}

function draw() {
	background(BGC);
	if (!isPaused) {
		grid.updateNeighborCounts();
		grid.updatePopulation();
	}
	grid.draw();
	liveCounter.offTxt = 'Live Cell Count: ' + grid.liveCellCount;
	liveCounter.onTxt = 'Dead Cell Count: ' + grid.deadCellCount;
	/* // dual display option where instead of switching display the data is displayed on top of one another
	liveCounter = new Displaybox(255, 215, 0, 165, 25, 420, 100, 15,('Live Cell Count: ' + grid.liveCellCount));
	deadCounter = new Displaybox(255, 215, 0, 165, 25, 420, 140, 15,('Dead Cell Count: ' + grid.deadCellCount));
	deadCounter.draw();
	*/
	generationCount = new Displaybox(205, 114, 19, 165, 25, 420, 170, 15, ('Generation: ' + grid.liveGenerationCount));
	pauseButton.draw();
	randomizeButton.draw();
	clearButton.draw();
	liveCounter.draw();
	generationCount.draw();
	fpsSlider.onTxt = 'Speed (FPS): ' + fps;
	fpsSlider.draw();
	rgbSlider.draw();
	BGCSlider.draw();
	hueSlider.draw();
	saturationSlider.draw();
	brightnessSlider.draw();
	colorResetButton.draw();
	pentaButton.draw();
	gliderButton.draw();
}

function mousePressed() {
	var cellColumn = floor(mouseX / grid.cellSize);
	var cellRow = floor(mouseY / grid.cellSize);
	if (pauseButton.isMouseOn()) {
		isPaused = !isPaused;
		if (!pauseButton.toggleOn) {
			pauseButton.toggleOn = true;
		} else if (pauseButton.toggleOn) {
			pauseButton.toggleOn = false;
		}
	}

	if (randomizeButton.isMouseOn()) {
		grid.randomize();
	}
	if (liveCounter.isMouseOn()) {
		if (!liveCounter.toggleOn) {
			liveCounter.toggleOn = true;
		} else if (liveCounter.toggleOn) {
			liveCounter.toggleOn = false;
		}
	}

	if (clearButton.isMouseOn()) {
		grid.clear();
	}

	if (colorResetButton.isMouseOn()) {
		BGC = color(54, 54, 116);
		grid.cellColor = color(255, 0, 0);
	}

	if (pentaButton.isMouseOn()) {
		if (!pentaButton.toggleOn) {
			pentaButton.toggleOn = true;
		} else if (pentaButton.toggleOn) {
			pentaButton.toggleOn = false;
		}
	}

	if (pentaButton.toggleOn) {
		if (grid.isValidPosition(cellColumn, cellRow) && grid.isValidPosition(cellColumn + 9, cellRow + 2)) {
			grid.makePentadecathlon(cellColumn, cellRow);
		}
	}

	if (gliderButton.isMouseOn()) {
		if (!gliderButton.toggleOn) {
			gliderButton.toggleOn = true;
		} else if (gliderButton.toggleOn) {
			gliderButton.toggleOn = false;
		}
	}

	if (gliderButton.toggleOn) {
		if (grid.isValidPosition(cellColumn, cellRow) && grid.isValidPosition(cellColumn + 2, cellRow + 2)) {
			grid.makeGlider(cellColumn, cellRow);
		}
	}

	if (isPaused && !pentaButton.toggleOn && !gliderButton.toggleOn) {
		if (grid.isValidPosition(cellColumn, cellRow)) {
			grid.cells[cellColumn][cellRow].isAlive = !grid.cells[cellColumn][cellRow].isAlive;
		}
	}
}

function mouseDragged() {
	fpsSlider.slide();
	fps = floor(map(fpsSlider.x, fpsSlider.sliderBarX - fpsSlider.slideSizeX / 20, fpsSlider.sliderBarX + fpsSlider.slideSizeX, 1, 60, true));
	frameRate(fps);
	if (rgbSlider.isMouseOn()) {
		rgbSlider.slide();
		grid.cellColor = rgbSlider.sliderColor();
	}
	if (BGCSlider.isMouseOn()) {
		BGCSlider.slide();
		BGC = BGCSlider.sliderColor();
	}
	colorMode(HSB);
	if (hueSlider.isMouseOn()) {
		hueSlider.slide();
		BGC = color(hueSlider.sliderValue(0, 360), saturationSlider.sliderValue(0, 100), brightnessSlider.sliderValue(0, 100));
	}
	if (brightnessSlider.isMouseOn()) {
		brightnessSlider.slide();
		BGC = color(hueSlider.sliderValue(0, 360), saturationSlider.sliderValue(0, 100), brightnessSlider.sliderValue(0, 100));
	}
	if (saturationSlider.isMouseOn()) {
		saturationSlider.slide();
		BGC = color(hueSlider.sliderValue(0, 360), saturationSlider.sliderValue(0, 100), brightnessSlider.sliderValue(0, 100));
	}
	colorMode(RGB);

	return false;
}


class Grid {
	constructor(cellSize) {
		// update the contructor to take cellSize as a parameter
		this.cellSize = cellSize;

		//use cellSize and canvas size to assign valuse for numberOfColumns and numberOfRows
		this.numberOfColumns = 400 / cellSize;
		this.numberOfRows = 400 / cellSize;

		//creates an array called cells
		this.cells = new Array(this.numberOfColumns);

		//making 2D array
		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i] = new Array(this.numberOfRows);
		}
		for (var column = 0; column < this.numberOfColumns; column++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				this.cells[column][row] = new Cell(column, row, cellSize);
			}
		}
		//print(this.cells);
		// inits liveCellCount and liveGenerationCount at 0
		this.liveCellCount = 0;
		this.liveGenerationCount = 0;
		this.cellColor = color(255, 0, 0);
	}

	randomize() {
		this.liveCellCount = 0;
		this.deadCellCount = 0;
		this.liveGenerationCount = 0;
		for (var column = 0; column < this.numberOfColumns; column++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				this.cells[column][row].setIsAlive(floor(random(2)) == 1);
			}
		}
	}

	//pauses the simulation and clears the board by setting all cells to death
	clear() {
		isPaused = true;
		//fix this plz
		pauseButton.toggleOn = false;
		this.liveGenerationCount = 0;
		for (var column = 0; column < this.numberOfColumns; column++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				this.cells[column][row].setIsAlive(false);
			}
		}
	}

	getNeighbors(currentCell) {
		var neighbors = [];
		for (var xOffset = -1; xOffset <= 1; xOffset++) {
			for (var yOffset = -1; yOffset <= 1; yOffset++) {
				var neighborColumn = currentCell.column + xOffset;
				var neighborRow = currentCell.row + yOffset;

				if (this.isValidPosition(neighborColumn, neighborRow) && !(currentCell.row == neighborRow && currentCell.column == neighborColumn)) {
					neighbors.push(this.cells[neighborColumn][neighborRow]);
				}
			}
		}
		return neighbors;
	}

	updateNeighborCounts() {
		// for each cell in the grid
		// reset it's neighbor count to 0
		// get the cell's neighbors
		// increase liveNeighborCount by 1 for each neighbor that is alive
		for (var column = 0; column < this.numberOfColumns; column++) {
			for (var row = 0; row < this.numberOfRows; row++) {

				this.cells[column][row].liveNeighborCount = 0;

				var neighborCells = this.getNeighbors(this.cells[column][row]);

				for (var i in neighborCells) {
					if (neighborCells[i].isAlive) {
						this.cells[column][row].liveNeighborCount++;
					}
				}

			}
		}

	}
	isValidPosition(column, row) {
		if (column >= 0 && column < this.numberOfColumns && row >= 0 && row < this.numberOfRows)
			return true;
		return false;
	}

	updatePopulation() {
		for (var column = 0; column < this.numberOfColumns; column++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				this.cells[column][row].liveOrDie();
			}
		}
		this.liveGenerationCount++;
	}

	draw() {
		this.liveCellCount = 0;
		this.deadCellCount = 0;
		for (var column = 0; column < this.numberOfColumns; column++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				this.cells[column][row].draw();
				if (this.cells[column][row].isAlive) {
					this.liveCellCount++;
					this.deadCellCount = ((this.numberOfColumns * this.numberOfRows) - this.liveCellCount);
				}
			}
		}
	}
	makePentadecathlon(x, y) {
		this.pentadecathlonArrayColumn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 7];
		this.pentadecathlonArrayRow = [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 2];
		for (var i = 0; i < this.pentadecathlonArrayColumn.length; i++) {

			this.cells[this.pentadecathlonArrayColumn[i] + x][this.pentadecathlonArrayRow[i] + y].setIsAlive(true);
		}
	}

	makeGlider(x, y) {
		this.gliderArrayColumn = [0, 1, 1, 2, 2];
		this.gliderArrayRow = [2, 2, 0, 1, 2];
		for (var i = 0; i < this.gliderArrayColumn.length; i++) {
			this.cells[this.gliderArrayColumn[i] + x][this.gliderArrayRow[i] + y].setIsAlive(true);
		}
	}

}
class Cell {
	constructor(column, row, size) {
		this.column = column;
		this.row = row;
		this.size = size;
		this.isAlive = true;
		this.liveNeighborCount = 0;
	}

	setIsAlive(value) {
		if (value) {
			this.isAlive = true;
		} else {
			this.isAlive = false;
		}
	}

	liveOrDie() {
		if (this.isAlive && (this.liveNeighborCount < 2 || this.liveNeighborCount > 3)) {
			this.isAlive = false;
		} else if (!this.isAlive && this.liveNeighborCount == 3) {
			this.isAlive = true;
		}
	}

	draw() {
		if (this.isAlive) {
			fill(grid.cellColor);
		} else {
			fill(color(240));
		}
		noStroke();
		rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
	}
}
/*
 creates a button that has hover dectection so user know it can be mousePressed
optionally the programmer can add alt text for when a button is toggled
toggle buttons switch colors upon activation and deactivation
clicked buttons can also be made if offTxt is undefined which does not have alt button and
don't have color toggle
All the strange math is to calculate all sizes based on input so that multiple buttons of different dimensions
can be made
*/
class Button {
	constructor(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt, offTxt) {
		if (offTxt === undefined) {
			offTxt = onTxt;
		}

		this.onTxt = onTxt;
		this.offTxt = offTxt;
		this.x = x;
		this.y = y;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.color = color(red, green, blue);
		this.altColor = color(red * .4, green * .4, blue * .4);
		this.textSize = textSize;
		this.toggleOn = false;
	}

	isMouseOn() {
		return ((mouseX > this.x) && (mouseX < this.x + this.sizeX) && (mouseY > this.y) && (mouseY < this.y + this.sizeY));
	}
	// creates rectangles for buttons and changes color based on .isMouseOn() (mousehovering) and .toggleON (button activated)
	draw() {
		noStroke();
		if (this.isMouseOn() || this.toggleOn) {
			fill(this.color);
			rect(this.x - ((this.sizeX * 1.1 - this.sizeX) / 2), this.y - ((this.sizeY * 1.1 - this.sizeY) / 2), this.sizeX * 1.1, this.sizeY * 1.1);
			fill(this.altColor);
			rect(this.x, this.y, this.sizeX, this.sizeY);
		} else {
			fill(this.altColor);
			rect(this.x - ((this.sizeX * 1.1 - this.sizeX) / 2), this.y - ((this.sizeY * 1.1 - this.sizeY) / 2), this.sizeX * 1.1, this.sizeY * 1.1);
			fill(this.color);
			rect(this.x, this.y, this.sizeX, this.sizeY);
		}

		textSize(this.textSize);
		textAlign(CENTER, CENTER);

		// creates and configured for buttons and changes color based on .isMouseOn() (mousehovering) and .toggleON (button activated)
		if (this.isMouseOn()) {
			if (this.toggleOn)
				fill(this.color);
			else
				fill(this.color);
		} else {
			if (this.toggleOn)
				fill(this.color);
			else
				fill(this.altColor);
		}
		if (this.toggleOn)
			text(this.onTxt, this.x, this.y, this.sizeX, this.sizeY);
		else
			text(this.offTxt, this.x, this.y, this.sizeX, this.sizeY);
	}

}

//made displaybox function after button but still using button vairables
class Displaybox extends Button {
	constructor(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt) {
		super(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt);
	}
	//creating a box in the same manner as button but without hover detection and isMouseOn() implmentation
	draw() {
		fill(this.altColor);
		rect(this.x - ((this.sizeX * 1.1 - this.sizeX) / 2), this.y - ((this.sizeY * 1.2 - this.sizeY) / 2), this.sizeX * 1.1, this.sizeY * 1.2);
		fill(this.color);
		rect(this.x, this.y, this.sizeX, this.sizeY);
		fill(this.altColor);
		text(this.offTxt, this.x, this.y, this.sizeX, this.sizeY);
	}
}
//using the button class to make a slider either horizontal
class Slider extends Button {
	constructor(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt) {
		super(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt);
		this.xBorder = ((sizeX * 1.1) - sizeX);
		this.yBorder = ((sizeY * 1.1) - sizeY);
		this.slideX = x;
		this.slideSizeX = sizeX;
		this.sliderBarX = x;
		this.x = this.slideX + (this.sizeX / 2) - (this.sizeX / 20);
		this.sizeX = this.slideSizeX / 10;
	}
	// setting slide position this.x based on where cursor is if mouse is anywhere on the slider (sliderBarX)
	//moving the slider (this.slideX) to same positon to be drawn
	slide() {
		if (this.isMouseOn()) {
			this.slideX = mouseX - (this.slideSizeX / 2);
			this.x = this.slideX + (this.slideSizeX / 2) - (this.slideSizeX / 20);
		}
	}
	//isMouseOn any part of the slider
	isMouseOn() {
		return ((mouseX > this.sliderBarX - this.sizeX / 2) && (mouseX <= this.sliderBarX + this.slideSizeX + this.sizeX / 2) && (mouseY > this.y) && mouseY < this.y + this.sizeY);
	}


	// draws length of bar with x input (this.sliderSizeX) sets height of buttons to this.sizeY
	//draws buttons based on initial inputs
	draw() {
		fill(this.altColor);
		rect(this.sliderBarX - (this.xBorder / 2), this.y - this.sizeY, this.slideSizeX + this.xBorder, this.sizeY * 2);
		fill(this.color);
		rect(this.sliderBarX, this.y + (this.sizeY / 2), this.slideSizeX, this.sizeY / 20);
		//button hovering
		if (super.isMouseOn()) {
			fill(this.color);
			rect(this.slideX + (this.slideSizeX / 2) - (this.slideSizeX / 20) - (this.xBorder / 2), this.y - this.yBorder, this.slideSizeX / 10 + (this.xBorder), this.sizeY + (this.yBorder * 2));
			fill(this.altColor);
			rect(this.slideX + (this.slideSizeX / 2) - (this.slideSizeX / 20), this.y, this.slideSizeX / 10, this.sizeY);
		} else {
			fill(this.altColor);
			rect(this.slideX + (this.slideSizeX / 2) - (this.slideSizeX / 20) - (this.xBorder / 2), this.y - this.yBorder, this.slideSizeX / 10 + (this.xBorder), this.sizeY + (this.yBorder * 2));
			fill(this.color);
			rect(this.slideX + (this.slideSizeX / 2) - (this.slideSizeX / 20), this.y, this.slideSizeX / 10, this.sizeY);
		}

		fill(this.color);
		textSize();
		textSize(this.textSize);
		textAlign(CENTER, TOP);
		text(this.onTxt, this.sliderBarX - (this.xBorder / 2), this.y - this.sizeY, this.slideSizeX + this.xBorder, this.sizeY * 2);


	}

}

class ColorSlider extends Slider {
	constructor(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt) {
		super(red, green, blue, sizeX, sizeY, x, y, textSize, onTxt);
		this.R;
		this.G;
		this.B;
		this.RGB;
		this.defaultColorOn = true;
	}
	//slider that runs in bounds specified and returns current hue based on slider position requires other sliders active to use properly
	sliderValue(startBound, endBound) {
		this.position = floor(map(this.x, this.sliderBarX - fpsSlider.slideSizeX / 20, this.sliderBarX + this.slideSizeX, startBound, endBound, true));

		return this.position;
	}


	//sets RGB values based on the position of the slider given by map() only full saturation though
	sliderColor() {
		colorMode(RGB);
		this.RGB = this.sliderValue(0, 1530);
		if (this.RGB >= 0 && this.RGB <= 255) {
			this.R = 255;
			this.G = this.RGB;
			this.B = 0;
		} else if (this.RGB >= 255 && this.RGB <= 510) {
			this.R = 255 - (this.RGB - 255);
			this.G = 255;
			this.B = 0;
		} else if (this.RGB >= 255 && this.RGB <= 765) {
			this.R = 0;
			this.G = 255;
			this.B = this.RGB - 255 * 2;
		} else if (this.RGB >= 765 && this.RGB <= 1020) {
			this.R = 0;
			this.G = 255 - (this.RGB - 255 * 3);
			this.B = 255;
		} else if (this.RGB >= 1020 && this.RGB <= 1275) {
			this.R = this.RGB - 255 * 4;
			this.G = 0;
			this.B = 255;
		} else if (this.RGB >= 1275 && this.RGB <= 1530) {
			this.R = 255;
			this.G = 255 - (this.RGB - 255 * 5);
			this.B = 0;
		}
		this.color = color(this.R, this.G, this.B);
		return color(this.R, this.G, this.B);

	}
}