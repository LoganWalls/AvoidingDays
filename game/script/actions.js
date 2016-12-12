function actionWrapper(callback, cost){
    return function(menu){
        var outcome = game.tryAction(cost);
        if (outcome === "success"){
            //menu.remove();
            callback();
            game.passTime(cost);
            //game.view.showMenu(game.view.room, 500, 50, game.roomMenu)
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
    computer: {
        name: 'Computer',
        callback: function(){
                window.game.view.setDisplay(window.game.view.computer);
            },
            description: 'Money, people, things.'
        },
    eat: {
        name: 'Eat',
        callback: function(menu){
                menu.remove();
                game.view.showMenu(game.view.activeCanvas, 500, 50, game.eatMenu);
            },
            description: 'I guess I should eat something.'
        },
    sleep: {
        name: 'Sleep',
        callback: actionWrapper(function(){
            alert("So tired...");
            game.adjustMorale(0.2);
            game.adjustRest(0.5);
            game.adjustStomach(-0.2);
        }, 4)
        description: 'I could sleep my life away...'
    },
    bathe: {
        name: 'Bathe',
        callback: actionWrapper(function(){
                alert("Clean!");
                game.adjustMorale(0.2);
                game.adjustRest(-0.2);
            }, 1),
            description: 'It is easier than laundry.'
        },
    wait: {
        name: 'Wait',
        callback: actionWrapper(function(){
                alert("You wait for half of a day...");
            }, 5),
        description: '...'
        },
    // FOOD OPTIONS
    chips: {
        name: 'Potato Chips',
        callback: actionWrapper(function(){
                alert("Munch munch!");
                game.adjustStomach(0.1);
            }, 1),
            description: 'Gonna need to clean my fingers'
        },
    ramen: {
        name: 'Niban Ramen',
        callback: actionWrapper(function(){
                alert("Slurp slurp!");
                game.adjustStomach(0.3);
                game.adjustMorale(-0.05);
            }, 1),
            description: 'I can live off of this forever.'
        },
    cook: {
        name: 'Cook Stirfry',
        callback: actionWrapper(function(){
                alert("You cut those carrots on a bias, like a culinary-badass!");
                game.adjustStomach(0.4);
                game.adjustMorale(0.2);
                game.adjustRest(-0.2);
            }, 2),
            description: 'Why should I put in the effort?',
        },
    //Computer options
    survey: {
        name: 'Survey Bananza!',
        callback: actionWrapper(function(){
                alert("You made some money.");
                game.adjustStomach(-0.1);
                game.adjustMorale(-0.2);
                game.adjustRest(-0.1)
            }, 3),
        description: 'I dont have much money left...'
        },
    facadebook: {
        name: 'Log in to Facade Book',
        callback: actionWrapper(function(){
                alert("You posted lies to make people think your life is amazing.");
                game.adjustStomach(-0.1);
                game.adjustMorale(-0.3);
                game.adjustRest(-0.1);
            }, 2),
            description: 'Somebody will like me'
        },
    vidgame: {
        name: 'Play Games',
        callback: actionWrapper(function(){
                alert("You beat your old highscore...again.");
                game.adjustStomach(-0.2);
                game.adjustMorale(-0.2);
                game.adjustRest(-0.2);
            }, 2),
            description: 'Nothing else to do.'
        },
    harmony: {
        name: 'Harmony',
        callback: actionWrapper(function(){
                alert("You chatted with your one person for a while.");
                game.adjustStomach(-0.2);
                game.adjustMorale(-0.2);
                game.adjustRest(-0.2);
        }, 3),
            description: 'Better than meeting in person.'
    }   
};