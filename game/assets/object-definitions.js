function drawRoom(s) {
    //Bed group
    var room_bed_image = s.image("table.jpg", 550, 620, 230, 100);
    var room_bed = s.group(room_bed_image);

    //Door group
    var room_door_image = s.image("smiley.png", 0, 220, 10, 500);
    var room_door = s.group(room_door_image);

    /* TEST ANIMATION
    room_door.node.onclick = function () {
        room_door_image.animate({ width: 140 }, 1000, function () {
            room_door_image.animate({ width: 10 }, 1000);
        });   
    } */

    //Window group
    var room_window_image = s.image("smiley.png", 600, 100, 230, 150);
    var room_window = s.group(room_window_image);

    //Bathroom group
    var room_bathroom_image = s.image("smiley.png", 300, 220, 150, 500);
    var room_bathroom = s.group(room_bathroom_image);

    //Desk group
    var room_desk_image = s.image("table.jpg", 1130, 320, 150, 400);
    var room_desk = s.group(room_desk_image);
}

function drawComputer(s) {
    //Background group
    var computer_background_image = s.image("dorkhenge.jpg", 0, 0, 1280, 720);

    //Games icon group
    var computer_games_icon = s.image("vapor.jpg", 1000, 400, 100, 100);

    //Surveys icon group
    var computer_surveys_icon = s.image("surveyquest.jpg", 200, 200, 100, 100);

    //Facebook icon group
    var computer_facebook_icon = s.image("facadebook.jpg", 640, 400, 100, 100);

    //Chat icon group
    var computer_chat_icon = s.image("aohhell.jpg", 200, 200, 100, 100);
}