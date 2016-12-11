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
            width: 160,
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
        morale: 1,     // How much morale does the player have (-1, 1)?
        timeLeftToday: 10, // How much time is there left before the day ends?
        bankBalance: 10000.00 // How much money does the player have?
    };
    this.roomMenu = [
        ACTIONS.bathe,
        ACTIONS.eat,
        ACTIONS.wait
    ];
  }

  tryAction(cost) {
    if (cost <= this.state.timeLeftToday){
        return "success";
    }else{
        return "notEnoughTime"
    }
  }

  passTime(time){
    this.state.timeLeftToday -= time;
    if (this.state.timeLeftToday == 0){
        this.advanceDay();
    }
  }

  advanceDay(){
    this.state.timeLeftToday = 10;
    this.daysPassed += 1;
  }

}


window.onload = function(){
    window.game = new Game();
}
