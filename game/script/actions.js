function optionWrapper(callback, cost){
    return function(menu){
        var outcome = game.tryAction(cost);
        if (outcome === "success"){
            menu.remove();
            game.passTime(cost);
            callback();
        }else if (outcome === "notEnoughTime"){
            alert("You don't have enough time to do that.");
        }else{
            alert("You can't do that.")
        }
    }
}


var ACTIONS = {
    eat: {
        name: 'Eat',
        callback: optionWrapper(function(){
                alert("Food!");
            }, 1)
        },
    bathe: {
        name: 'Bathe',
        callback: optionWrapper(function(){
                alert("Clean!");
            }, 1)
        },
    wait: {
        name: 'Wait',
        callback: optionWrapper(function(){
                alert("Wow, waiting!");
            }, 11)
        }
};