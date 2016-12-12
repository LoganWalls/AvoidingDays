// Old jQuery version.
// function newCanvas(width, height){
//     return $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9" \
//                          preserveAspectRatio="xMidYMin meet"></svg>')
//                         .width(width)
//                         .css("max-width", "100%")
//                         .height("auto")
//                         .css("max-height", height);
// }

String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};


class Renderer {
    constructor(width, height){
        this.viewport = Snap.select("#viewport");

        // Create canvases for both of the screens.
        this.room = Snap(width, height).remove();
        this.computer = Snap(width, height).remove();
        this.intro = Snap(width, height).remove();
        this.activeCanvas = null;    

        this.menuOptions = {
            width: 220,
            height: 60,
            rx: 10,
            ry: 10,
            vMargin: 10
        }
    }

    // Displays a given canvas in the viewport.
    setDisplay(canvas){
        if(this.activeCanvas != null){
            this.activeCanvas.remove();
        }
        this.activeCanvas = canvas;
        this.viewport.append(canvas);
    }

    showRandomDialogue(pool, replacement){
        var i = Math.floor(Math.random()*pool.length);
        alert(pool[i]);
        if (!replacement && pool.length > 1){
            pool.splice(i);
        }
    } 


    // Displays a menu with the given actions
    // at location x, y on the screen.
    // actions = [
    //    {name: "action1",
    //     callback: functionToExecute},
    //    {name: "action2",
    //     callback: functionToExecute2},
    //    ...
    // ]
    showMenu(canvas, x, y, actions){
        var mWidth = this.menuOptions.width,
            mHeight = this.menuOptions.height,
            mrx = this.menuOptions.rx,
            mry = this.menuOptions.ry,
            vMargin = this.menuOptions.vMargin;

        // For testing
        // var actions = [
        //    {name: "Bathe",
        //     callback: function(){alert('Bath!');}
        //     },
        //    {name: "Eat",
        //     callback: function(){alert('Food!');}
        //     }
        // ]

        var menu = canvas.g().transform("translate({0},{1})".format(x, y));
        // Populate the menu with options.
        actions.forEach(function(action, i){
            var y = i * (mHeight + vMargin);
            var button = canvas.rect(0, y, mWidth, mHeight, mrx, mry)
                         .addClass("menu-item");
            var buttonBBox = button.getBBox();
            var label = canvas.text(0, 0, action.name)
                         .addClass("menu-text");
            var labelBBox = label.getBBox();
            label.attr({
                x: buttonBBox.cx - (labelBBox.width / 2),
                y: buttonBBox.cy + (labelBBox.height / 4)
            });
            var option = canvas.group(button, label);
            option.node.onclick = function(){action.callback(menu);};
            menu.add(option);
        })
    }
}


class Game {
  constructor() {
    this.view = new Renderer(1280, 720);
    this.state = {
        daysPassed: 0, // How many days have passed since the game began?
        morale: 1,     // How much morale does the player have (-1,1)?
        stomach: 0.3,    // Reflects how hungry the player is:
                       // (1 is bloated, 0 is satisfied, -1 is starvation)
        rest: 1,       // How rested the player is (0,1).
        timeLeftToday: 10,     // How much time is there left before the day ends?
        bankBalance: 10000.00, // How much money does the player have?
        drowsy: 0, // How likely is the player to fall asleep unintentionally? (0,1).
        ///////////////////////
        hungerRate: 0.025, // The amount of hunger generated per time unit.
        exhuastionRate: 0.05 // How fast the rest from sleep wears off.
    };

    this.roomMenuTemplate = [
        ACTIONS.bathe,
        ACTIONS.eat,
        ACTIONS.wait,
        ACTIONS.computer
    ];

    this.eatMenu = [
        ACTIONS.chips,
        ACTIONS.ramen,
        ACTIONS.cook
    ];

    this.computerMenu = [
        ACTIONS.survey,
        ACTIONS.facadebook,
        ACTIONS.harmony,
        ACTIONS.vidgame
     ];



    this.roomMenu = this.roomMenuTemplate.slice();
  }

  tryAction(cost) {
    if (cost <= this.state.timeLeftToday){
        if (Math.random() < game.state.drowsy){
            this.view.showRandomDialogue(DIALOGUE.sleepyFlavor, true);
            this.sleep(3);
            return "fellAsleep";
        }
        return "success";
    }else{
        return "notEnoughTime";
    }
  }

  adjustStomach(amount){
    // Adjust stomach, keeping it between the bounds.
    this.state.stomach = Math.max(-1, Math.min(this.state.stomach + amount,1))
    // If the player is very hungry.
    if (this.state.stomach <= 0){
        this.view.showRandomDialogue(DIALOGUE.hungryFlavor, true);
        // How severe is the hunger?
        var hunger = -this.state.stomach;
        var severity = Math.ceil(hunger / 0.3);

        var eatInd = this.roomMenuTemplate.indexOf(ACTIONS.eat);
        // Choose some random indices from the menu depending on how severe...
        var indices = [];
        for (var i = 0; i < severity; i++){
            // Select a random menu item which is not
            // the "eat" item, and which has not already been selected...
            var candidate = Math.floor(Math.random() * this.roomMenuTemplate.length);
            while (candidate == eatInd || 
                  (indices.indexOf(candidate) > 0 && indices.length < this.roomMenuTemplate.length - 2)){
                candidate = Math.floor(Math.random() * this.roomMenuTemplate.length);
            }
            indices.push(candidate);
        }
        this.roomMenu = [];
        // Reconstruct the room menu, replacing those indices with "eat"
        for (var i = 0; i < this.roomMenuTemplate.length; i++){
            if (indices.indexOf(i) >= 0){
                this.roomMenu.push(ACTIONS.eat);
            }else{
                this.roomMenu.push(this.roomMenuTemplate[i]);
            }
        }
    
    }else{
        // Reset the menu
        this.roomMenu = this.roomMenuTemplate.slice();
    }
    // If the player is very full...
    if (this.state.stomach > 0.5){
        this.view.showRandomDialogue(DIALOGUE.bloatedFlavor, true);
        var fullness = this.state.stomach - 0.5;
        // Make them drowsy-er.
        this.state.drowsy += fullness;
        // Reduce their morale for over-eating.
        this.state.morale -= fullness / 2;
    }
  }

  adjustRest(amount){
    // Adjust rest, keeping it between the bounds.
    this.state.rest = Math.max(0, Math.min(this.state.rest + amount,1));
    // If the player is tired...
    if (this.state.rest < 0.4){
        // Make them drowsy-er.
        this.state.drowsy += this.state.rest - 0.4;
    }
  }

  adjustMorale(amount){
    // Adjust the morale, keeping it between the bounds.
    this.state.morale = Math.max(0, Math.min(this.state.morale + amount,1));

  }

  updateOptions(){
    console.log(this.state);
  }

  sleep(time){
    alert('You slept for {0} hours...'.format(time * 3));
    this.state.drowsy = 0;
    this.passTime(time);
  }

  passTime(time){
    this.state.timeLeftToday -= time;
    this.adjustStomach(-(this.state.hungerRate * time));
    this.adjustRest (-(this.state.exhuastionRate * time));
    this.updateOptions();

    if (this.state.timeLeftToday == 0){
        this.advanceDay();
    }
  }

  advanceDay(){
    this.state.timeLeftToday = 10;
    this.state.daysPassed += 1;
  }

}


window.onload = function(){
    window.game = new Game();
	game.view.setDisplay(window.game.view.room);
	//game.view.showMenu(game.view.room, 500, 50, game.roomMenu);
	drawRoom(window.game.view.room);
	drawComputer(window.game.view.computer);
}
