/**
 * Created by Kyle on 15/06/10.
 */

"use strict";

//
// Initialization
//==============================================================


// Shortcut to SVG namespace
var SVG_NS = "http://www.w3.org/2000/svg";

// Stage size (number of rectangles)
var ROWS = 20, COLS = 10;

// Rectangle size (px)
var RECT_SIZE = 40;

// Fall speed (ms)
var DIFFICULTY = 2000;

// Declare block pattern
var SHAPES_PATTERN = [
    {
        // Square
        id: 0,
        pattern: [
            [ [0,0], [1,0], [0,1], [1,1] ]
        ]
    },
    {
        // L
        id: 1,
        pattern: [
            [ [0,0], [0,1], [1,0], [2,0] ],
            [ [0,0], [1,0], [1,1], [1,2] ],
            [ [0,1], [1,1], [2,1], [2,0] ],
            [ [0,0], [0,1], [0,2], [1,2] ]
        ]
    },
    {
        // Reverse L
        id: 2,
        pattern: [
            [ [0,0], [1,0], [2,0], [2,1] ],
            [ [1,0], [1,1], [1,2], [0,2] ],
            [ [0,0], [0,1], [1,1], [2,1] ],
            [ [0,0], [1,0], [0,1], [0,2] ]
        ]
    },
    {
        // Long Bar
        id: 3,
        pattern: [
            [ [0,0], [1,0], [2,0], [3,0] ],
            [ [0,0], [0,1], [0,2], [0,3] ]
        ]
    },
    {
        // Z
        id: 4,
        pattern: [
            [ [0,0], [1,0], [1,1], [2,1] ],
            [ [1,0], [1,1], [0,1], [0,2] ]
        ]
    },
    {
        // Reverse Z
        id: 5,
        pattern: [
            [ [1,0], [2,0], [0,1], [1,1] ],
            [ [0,0], [0,1], [1,1], [1,2] ]
        ]
    },
    {
        // T
        id: 6,
        pattern: [
            [ [0,0], [0,1], [0,2], [1,1] ],
            [ [0,0], [1,0], [2,0], [1,1] ],
            [ [1,0], [1,1], [1,2], [0,1] ],
            [ [0,1], [1,1], [2,1], [1,0] ]
        ]
    }
];

// Initialize variables
var blockCounter = 0;
var currentBlock;
var timer;
var stage;
var dataBoard;
var viewBoard = "stage";









function gameStart() {

    dataBoard = _.chain(new Array(ROWS * COLS))
        .fill(null)
        .chunk(COLS)
        .value();

    stage = new Stage();

    //createNewBlock();
    ////resetTimer();

}







function Stage() {
    this.view = document.getElementById(viewBoard);
}


Stage.prototype.render = function() {

    // Clear all DOMs that are already rendered.
    while(this.view.hasChildNodes()) this.view.removeChild(this.view.lastChild);

    dataBoard.forEach(function(row){
        row.forEach(function(col){

            // Expected col is a Rect object, otherwise must be null object.
            if (col !== null) {

                // Check the all of dataBoard cells, if they are not NULL then create rectangles(via Rect.prototype.set()) and insert to DOM.
                this.view.appendChild(col.set());
            }

        }, this);
    }, this);

};






//function Rect(color, x, y) {
//    this.className_ = "rect-color-" + color;
//    this.x = x;
//    this.y = y;
//    this.blockId = blockCounter;
//}
//
//Rect.prototype.set = function() {
//    var rect = document.createElementNS(SVG_NS, "rect");
//    rect.setAttribute("class", "rect " + this.className_);
//    rect.setAttribute("width", RECT_SIZE);
//    rect.setAttribute("height", RECT_SIZE);
//    rect.setAttribute("x", this.x * RECT_SIZE);
//    rect.setAttribute("y", this.y * RECT_SIZE);
//    rect.setAttribute("data-block-id", this.blockId);
//
//    return rect;
//};
//
//
//
//
//
//
//function Block(type) {
//    this.color_ = type.id;
//    this.pattern_ = type.pattern;
//    this.currentPattern_ = 0;
//
//    // Keep the current set of Rect objects.
//    this.currentRects = this.pattern_[this.currentPattern_].map(function(coords){
//        return new Rect(this.color_, coords[0], coords[1]);
//    }, this);
//}
//
//
//
//// For renewing position of the current block.
//Block.prototype.set = function() {
//
//    // Renew dataBoard cells
//    dataBoard = dataBoard.map(function(row){
//        return row.map(function(col){
//
//            if(col !== null && col.blockId == blockCounter){
//
//                // Clear cells if they are occupied by the current block.
//                return null;
//
//            }
//
//            return col;
//        });
//    });
//
//    // Assign current set of Rect objects to dataBoard.
//    this.currentRects.forEach(function(rect){
//        dataBoard[rect.y][rect.x] = rect;
//    });
//};






//function createNewBlock() {
//
//    currentBlock = new Block(SHAPES_PATTERN[Math.floor(Math.random() * SHAPES_PATTERN.length)]);
//
//    //var i = 0;
//    //
//    //// Check dataBoard cells whether the positions of the new block are already occupied.
//    //while(i < currentBlock.currentRects.length){
//    //    if(dataBoard[currentBlock.currentRects[i].y][currentBlock.currentRects[i].x] !== null) {
//    //        // if yes terminate game.
//    //        return gameOver();
//    //    }
//    //    i ++;
//    //}
//
//    currentBlock.set();
//
//    stage.render();
//
//}




//// For moving right
//Block.prototype.moveRight = function() {
//
//    // Make an object that includes the information of next block.
//    var expects = this.currentRects.map(function(rect){
//        return {
//            x: rect.x + 1,
//            y: rect.y
//        };
//    });
//
//    // Throw the expected object to the function for validating.
//    if(this.checkExpected(expects)){
//
//        // If passed validation, overwrite the currentBlock.
//        this.currentRects.forEach(function(rect){
//            rect.x += 1;
//        });
//
//    }
//
//
//    return this;
//};
//
//
//// For moving left
//Block.prototype.moveLeft = function() {
//
//    // Make an expected object.
//    var expects = this.currentRects.map(function(rect){
//        return {
//            x: rect.x - 1,
//            y: rect.y
//        };
//    });
//
//    // Validating the expected objects.
//    if(this.checkExpected(expects)){
//
//        // If passed validation, overwrite the currentBlock.
//        this.currentRects.forEach(function(rect){
//            rect.x -= 1;
//        });
//
//    }
//
//    return this;
//};
//
//
//// For moving down
//Block.prototype.moveDown = function() {
//
//    // Make an expected object.
//    var expects = this.currentRects.map(function(rect){
//        return {
//            x: rect.x,
//            y: rect.y + 1
//        };
//    });
//
//    // Validating the expected objects.
//    if(this.checkExpected(expects)){
//
//        // If passed validation, overwrite the currentBlock.
//        this.currentRects.forEach(function(rect){
//            rect.y += 1;
//        });
//
//    } else {
//
//        // If didn't passed validation, that means some blocks already exist below,
//        // therefore need to fix the current block.
//        this.fix();
//        return null;
//
//    }
//
//    return this;
//};
//
//
//// For rotation
//Block.prototype.rotate = function() {
//
//    // Change block pattern
//    this.currentPattern_ = this.currentPattern_ + 1 < this.pattern_.length ? this.currentPattern_ + 1 : 0;
//
//    // Make an expected object
//    var expects = this.pattern_[this.currentPattern_].map(function(element, i){
//
//        // Set the origin of rotation to left-top.
//        var originX = _.min(this.currentRects, "x").x;
//        var originY = _.min(this.currentRects, "y").y;
//
//        return {
//            x: element[0] + originX,
//            y: element[1] + originY
//        };
//
//    }, this);
//
//    // Validating the expected objects.
//    if(this.checkExpected(expects)){
//
//        // If passed validation, overwrite the currentBlock.
//        this.currentRects = this.pattern_[this.currentPattern_].map(function(coords, i){
//            var originX = _.min(this.currentRects, "x").x;
//            var originY = _.min(this.currentRects, "y").y;
//            return new Rect(this.color_, coords[0] + originX, coords[1] + originY);
//        }, this);
//
//    }
//
//    return this;
//};
//




//
//// For validation of expected objects.
//Block.prototype.checkExpected = function(expected){
//
//    var i = 0;
//    var c;
//    while (i < expected.length) {
//
//        // If the row number of next block exceeds maximum row number, then return false.
//        if(expected[i].y >= ROWS){
//            return false;
//        }
//
//        // Just a shortcut of stupidly long param name.
//        c = dataBoard[expected[i].y][expected[i].x];
//
//        // If some parts of the next block run off the edge, then return false.
//        if(typeof c === "undefined") {
//            return false;
//        }
//
//        // If some parts of the next block overlap the other blocks, then return false.
//        if(c !== null && c.blockId !== this.currentRects[0].blockId) {
//            return false;
//        }
//
//        i ++;
//    }
//
//    // If passed all the tests then return true.
//    return true;
//
//};
//
//
//// For fixing the current block.
//Block.prototype.fix = function() {
//
//    // Delete the completed lines
//    deleteLine();
//
//    // Set a new block ID
//    blockCounter += 1;
//
//    // Insert a new block
//    createNewBlock();
//
//};









//function gameOver() {
//
//    alert("Game Over!");
//
//    gameStart();
//
//}


//function resetTimer() {
//
//    clearInterval(timer);
//
//    timer = setInterval(shapeMoveToDown, DIFFICULTY);
//
//}




//function deleteLine() {
//    dataBoard.forEach(function(y, index){
//
//        // If all of cells in a row are null
//        if(_.indexOf(y, null) === -1){
//
//            // Delete the row
//            _.remove(dataBoard, y);
//
//            // Move down the blocks above the removed line
//            dataBoard.forEach(function(y, _index){
//                if(_index < index){
//                    y.forEach(function(x){
//                        if(x !== null){
//                            x.y += 1;
//                        }
//                    });
//                }
//            });
//
//            // Prepend a new row to dataBoard
//            dataBoard.unshift(_.fill(new Array(COLS), null));
//
//            // Render to view
//            stage.render();
//        }
//    });
//}






//
//
////
//// Control Interfaces
////==============================================================
//
//function shapeMoveToLeft(event) {
//    event.preventDefault();
//
//    // Trigger Block.prototype.moveLeft()
//    var next = currentBlock.moveLeft();
//
//    next.set();
//    stage.render();
//}
//
//
//function shapeRotate(event) {
//    event.preventDefault();
//
//    // Trigger Block.prototype.rotate()
//    var next = currentBlock.rotate();
//
//    next.set();
//    stage.render();
//}
//
//
//function shapeMoveToRight(event) {
//    event.preventDefault();
//
//    // Trigger Block.prototype.moveRight()
//    var next = currentBlock.moveRight();
//
//    next.set();
//    stage.render();
//}
//
//
//function shapeMoveToDown(event) {
//    if(event){
//        event.preventDefault();
//    }
//
//    // Trigger Block.prototype.moveDown()
//    var next = currentBlock.moveDown();
//
//    if(next !== null){
//
//        // If the current block is not going to be fixed, then continue process.
//        next.set();
//        stage.render();
//
//    }
//}
//
//
//// Register event listeners
//var controlHandler = function(event) {
//    switch (event.keyCode) {
//        case 37: return shapeMoveToLeft(event);
//        case 38: return shapeRotate(event);
//        case 39: return shapeMoveToRight(event);
//        case 40: return shapeMoveToDown(event);
//    }
//};
//
//document.body.addEventListener("keydown", controlHandler);
//






//
// Start!
//==============================================================

gameStart();