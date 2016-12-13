function drawRoom(s) {
    //Background group
    var room_background_image = s.image("roombackground.png", 0, 0, 1280, 720);

    //Bed group
    var room_bed_image = s.image("bed.png", 550, 620, 330, 100);
    var room_bed = s.group(room_bed_image);

    //Door group
    var room_door_image = s.image("door.png", 0, 320, 10, 400);
    var room_door = s.group(room_door_image);
    room_door_image.node.id = "room_door"; //For grabbing and animating

    //Window group
    var room_window_image = s.image("window.png", 600, 100, 230, 150);
    var room_window = s.group(room_window_image);

    //Fridge group
    var room_fridge_image = s.image("fridge.png", 950, 520, 100, 200);
    var room_fridge = s.group(room_fridge_image);

    //Bathroom group
    var room_bathroom_image = s.image("door.png", 300, 320, 150, 400);
    var room_bathroom = s.group(room_bathroom_image);

    //Desk group
    var room_desk_image = s.image("computer.png", 1130, 420, 150, 300);
    var room_desk = s.group(room_desk_image);

    //Action bindings
    room_bathroom.node.onmouseover = function () { drawMouseOverBox(s, room_bathroom, ACTIONS.bathe); };
    room_desk.node.onmouseover = function () { drawMouseOverBox(s, room_desk, ACTIONS.computer); };
    room_bed.node.onmouseover = function () { drawMouseOverBox(s, room_bed, ACTIONS.sleep); };
    room_window.node.onmouseover = function () { drawMouseOverBox(s, room_window, ACTIONS.wait); };
    room_fridge.node.onmouseover = function () { drawMouseOverBox(s, room_fridge, ACTIONS.eat); };
}

function drawComputer(s) {
    //Background group
    var computer_background_image = s.image("dorkhenge.jpg", 0, 0, 1280, 720);

    //Games icon group
    var computer_games_icon = s.image("vaportransparent.png", 1000, 400, 100, 100);
    var computer_games = s.group(computer_games_icon);

    //Surveys icon group
    var computer_surveys_icon = s.image("surveyquest.png", 200, 200, 100, 100);
    var computer_surveys = s.group(computer_surveys_icon);

    //Facebook icon group
    var computer_facebook_icon = s.image("facadebook.jpg", 640, 400, 100, 100);
    var computer_facebook = s.group(computer_facebook_icon);

    //Chat icon group
    var computer_chat_icon = s.image("harmony.jpg", 200, 550, 100, 100);
    var computer_chat = s.group(computer_chat_icon);

    //Logoff icon group
    var computer_logoff_icon = s.image("logoff.png", 25, 25, 100, 100);
    var computer_logoff = s.group(computer_logoff_icon);

    computer_logoff.node.onclick = function () {
        window.game.view.setDisplay(window.game.view.room);
    };

    //Action bindings
    computer_games.node.onmouseover = function () { drawMouseOverBox(s, computer_games, ACTIONS.vidgame); };
    computer_surveys.node.onmouseover = function () { drawMouseOverBox(s, computer_surveys, ACTIONS.survey); };
    computer_facebook.node.onmouseover = function () { drawMouseOverBox(s, computer_facebook, ACTIONS.facadebook); };
    computer_chat.node.onmouseover = function () { drawMouseOverBox(s, computer_chat, ACTIONS.harmony); };
}

//Draws descriptive box over item that will remove itself when mouse leaves
function drawMouseOverBox(s, group, action) {
    var mouseOverBox = s.rect(group.getBBox().x, group.getBBox().y, group.getBBox().width, group.getBBox().height, 10);
    mouseOverBox.attr({
        "fill-opacity": .5,
        "fill": "lightblue"
    });
    var mouseOverBoxText = s.text(group.getBBox().x, group.getBBox().y, action.name);
    mouseOverBoxText.attr({
        "font-weight": "bolder",
        "font-family":"arial black"
    });
    var mouseOverBoxDescriptionText = s.text(group.getBBox().x, group.getBBox().y + 14, action.description);
    mouseOverBoxDescriptionText.attr({
        "font-family": "arial"
    });
    mouseOverBox.node.id = "mouseoverbox";
    mouseOverBoxText.node.id = "mouseoverboxtext";
    mouseOverBoxDescriptionText.node.id = "mouseoverboxdescriptiontext";

    mouseOverBox.node.onclick = action.callback;

    mouseOverBox.node.onmouseleave = function () {
        s.select("#mouseoverbox").remove();
        s.select("#mouseoverboxtext").remove();
        s.select("#mouseoverboxdescriptiontext").remove();
    };
}

function drawIRLFriend(s) {
    s.select("#room_door").animate({ width: 140 }, 1000, function () {
        //Friend group
        var room_friend_image = s.image("friend.png", 80, 300, 120, 420);
        var room_friend = s.group(room_friend_image);
        room_friend.node.onmouseover = function () { drawMouseOverBox(s, room_friend, ACTIONS.hangout); };
        room_friend.node.id = "roomfriend"; //So it can be removed

        s.select("#room_door").animate({ width: 10 }, 1000);
    });
}