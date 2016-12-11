function actionWrapper(callback, cost){
    return function(menu){
        var outcome = game.tryAction(cost);
        if (outcome === "success"){
            menu.remove();
            callback();
            game.passTime(cost);
            game.view.showMenu(game.view.room, 500, 50, game.roomMenu)
        }else if (outcome === "notEnoughTime"){
            alert("You don't have enough time to do that.");
        }else{
            alert("You can't do that.")
        }
    }
}

function submenuWrapper(actions){
    return function(menu){
        var mX = menu.x,
            mY = menu.y;
            menu.remove();
            game.view.showMenu(game.view.activeCanvas, mX, mY, actions);
    }
}

var ACTIONS = {
    eat: {
        name: 'Eat',
        callback: function(menu){
                menu.remove();
                game.view.showMenu(game.view.activeCanvas, 500, 50, game.eatMenu);
            }
        },
    bathe: {
        name: 'Bathe',
        callback: actionWrapper(function(){
                alert("Clean!");
                game.adjustMorale(0.2);
            }, 1)
        },
    wait: {
        name: 'Wait',
        callback: actionWrapper(function(){
                alert("You wait for half of a day...");
            }, 5)
        },
    // FOOD OPTIONS
    chips: {
        name: 'Potato Chips',
        callback: actionWrapper(function(){
                alert("Munch munch!");
                game.adjustStomach(0.1);
            }, 1)
        },
    ramen: {
        name: 'Niban Ramen',
        callback: actionWrapper(function(){
                alert("Slurp slurp!");
                game.adjustStomach(0.3);
                game.adjustMorale(-0.05);
            }, 1)
        },
    cook: {
        name: 'Cook Stirfry',
        callback: actionWrapper(function(){
                alert("You cut those carrots on a bias, like a culinary-badass!");
                game.adjustStomach(0.4);
                game.adjustMorale(0.2);
                game.adjustRest(-0.2);
            }, 2)
        },

};