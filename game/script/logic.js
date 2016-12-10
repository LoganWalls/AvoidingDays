// Old jQuery version.
// function newCanvas(width, height){
//     return $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9" \
//                          preserveAspectRatio="xMidYMin meet"></svg>')
//                         .width(width)
//                         .css("max-width", "100%")
//                         .height("auto")
//                         .css("max-height", height);
// }


class Renderer {
    constructor(width, height){
        this.viewport = Snap("#viewport");

        // Create canvases for both of the screens.
        this.room = Snap(width, height).remove();
        this.computer = Snap(width, height).remove();  
        this.activeCanvas = null;    
    }

    // Initializes all of the objects in the room (eg. desk, chair, fridge, etc.)
    initRoom(canvas){
        // var door = Snap('<g id="door"><rect>\
        //               </rect></g>');

    }
    // Displays a given canvas in the viewport.
    setDisplay(canvas){
        if(this.activeCanvas != null){
            this.activeCanvas.remove();
        }
        this.activeCanvas = canvas;
        this.viewport.append(canvas);
    }
}


class Game {
  constructor() {
    this.view = new Renderer(1280, 720);

    this.state = {
        daysPassed: 0, // How many days have passed since the game began?
        morale: 1,     // How much morale does the player have (-1, 1)?
        timeLeftToday: 10, // How much time is there left before the day ends?
        bankBalance: 10000.00 // How much money does the player have?
    };
  }
}


window.onload = function(){
    window.game = new Game();
}

function testOnClick() {
    alert("Whoa, it works.");
}
