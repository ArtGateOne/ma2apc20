//ma2apc20 by ArtGateOne v 1.2
var easymidi = require('easymidi');
var W3CWebSocket = require('websocket')
    .w3cwebsocket;
var client = new W3CWebSocket('ws://localhost:80/'); //U can change localhost(127.0.0.1) to Your console IP address


//config 
page_mode = 1;   //set page select mode - 0-off, 1-only exec buttons(5), 2-exec buttons and faders together
midi_in = 'Akai APC20';     //set correct midi in device name
midi_out = 'Akai APC20';    //set correct midi out device name
display_mode = 1;   //display mode 1 = default, 2 = dark green



//global variables
var encodernr = 0;
var encoderenabled = 0;
var blackout = 1; //1 off, 2 on
var grandmaster = 100;
var wing = 1;
var pageIndex = 0;  //exec buttons page
var pageIndex2 = 0; //fader page
var request = 0;
var session = 0;
var faderValue = [0, 0, 0, 0, 0.002, 0.006, 0.01, 0.014, 0.018, 0.022, 0.026, 0.03, 0.034, 0.038, 0.042, 0.046, 0.05, 0.053, 0.057, 0.061, 0.065, 0.069, 0.073, 0.077, 0.081, 0.085, 0.089, 0.093, 0.097, 0.1, 0.104, 0.108, 0.112, 0.116, 0.12, 0.124, 0.128, 0.132, 0.136, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.4, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.8, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1, 1];





if (wing == 1) {
    var buttons53 = [100, 101, 102, 103, 104, 105, 106, 107];
    var buttons54 = [110, 111, 112, 113, 114, 115, 116, 117];
    var buttons55 = [120, 121, 122, 123, 124, 125, 126, 127];
    var buttons56 = [130, 131, 132, 133, 134, 135, 136, 137];
    var buttons57 = [140, 141, 142, 143, 144, 145, 146, 147];
    var buttons52 = [150, 151, 152, 153, 154, 155, 156, 157];
    var buttons51 = [160, 161, 162, 163, 164, 165, 166, 167];

    var buttons = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 175, 176, 177, 178, 179, 180, 181, 182, 160, 161, 162, 163, 164, 165, 166, 167, 145, 146, 147, 148, 149, 150, 151, 152, 130, 131, 132, 133, 134, 135, 136, 137, 115, 116, 117, 118, 119, 120, 121, 122, 100, 101, 102, 103, 104, 105, 106, 107];
} else if (wing == 2) {
    var buttons = [7, 8, 9, 10, 11, 12, 13, 14, 7, 8, 9, 10, 11, 12, 13, 14, 182, 183, 184, 185, 186, 187, 188, 189, 167, 168, 169, 170, 171, 172, 173, 174, 152, 153, 154, 155, 156, 157, 158, 159, 137, 138, 139, 140, 141, 142, 143, 144, 122, 123, 124, 125, 126, 127, 128, 129, 107, 108, 109, 110, 111, 112, 113, 114];
} else if (wing == 3) {
    faderValueMem[56] = 1;
    var buttons = [15, 16, 17, 18, 19, 20, 21, 22, 15, 16, 17, 18, 19, 20, 21, 22, 180, 181, 182, 183, 184, 185, 186, 187, 170, 171, 172, 173, 174, 175, 176, 177, 160, 161, 162, 163, 164, 165, 166, 167, 150, 151, 152, 153, 154, 155, 156, 157, 140, 141, 142, 143, 144, 145, 146, 147, 130, 131, 132, 133, 134, 135, 136, 137];
}



//sleep function
function sleep(time, callback) {
    var stop = new Date()
        .getTime();
    while (new Date()
        .getTime() < stop + time) {
        ;
    }
    callback();
}


//interval send data to server function
function interval() {
    if (session > 0) {
        if (wing == 1) {
            client.send('{"requestType":"playbacks","startIndex":[100],"itemsCount":[90],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[0],"itemsCount":[10],"pageIndex":' + pageIndex2 + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        else if (wing == 2) {
            client.send('{"requestType":"playbacks","startIndex":[100],"itemsCount":[90],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[0],"itemsCount":[15],"pageIndex":' + pageIndex2 + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
        }
        else if (wing == 3) {
            client.send('{"requestType":"playbacks","startIndex":[130],"itemsCount":[60],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}')
            client.send('{"requestType":"playbacks","startIndex":[15],"itemsCount":[10],"pageIndex":' + pageIndex2 + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');

        }
    }
}


//midi clear function
function midiclear() {
    for (i = 0; i < 90; i++) {
        output.send('noteon', { note: i, velocity: 0, channel: 0 });
        //sleep(10, function () { });
    }
    for (i = 0; i < 7; i++) {
        output.send('noteon', { note: 48, velocity: 0, channel: i });
        output.send('noteon', { note: 49, velocity: 0, channel: i });
        output.send('noteon', { note: 50, velocity: 0, channel: i });
        output.send('noteon', { note: 51, velocity: 0, channel: i });
        output.send('noteon', { note: 52, velocity: 0, channel: i });
        output.send('noteon', { note: 53, velocity: 0, channel: i });
        output.send('noteon', { note: 54, velocity: 0, channel: i });
        output.send('noteon', { note: 55, velocity: 0, channel: i });
        output.send('noteon', { note: 56, velocity: 0, channel: i });
        output.send('noteon', { note: 57, velocity: 0, channel: i });
    }
    return;
}


//clear terminal
//console.log('\033[2J');

//display info
console.log("Akai APC 20 MA2 WING " + wing);
console.log(" ");

//display all midi devices
console.log("Midi IN");
console.log(easymidi.getInputs());
console.log("Midi OUT");
console.log(easymidi.getOutputs());

console.log(" ");

console.log("Connecting to midi device " + midi_in);

//open midi device
var output = new easymidi.Output(midi_out);
output.send('sysex', [0xF0, 0x47, 0x7F, 0x7B, 0x60, 0x00, 0x04, 0x42, 0x08, 0x02, 0x01, 0xF7]); //APC20 mode2
output.close();

var input = new easymidi.Input(midi_in);
var output = new easymidi.Output(midi_out);

//sleep 1000
sleep(1000, function () {
    // executes after one second, and blocks the thread
});



//turn on page select buttons
if (page_mode > 0) {
    output.send('noteon', { note: 82, velocity: 1, channel: 0 });
    output.send('noteon', { note: 83, velocity: 0, channel: 0 });
    output.send('noteon', { note: 84, velocity: 0, channel: 0 });
    output.send('noteon', { note: 85, velocity: 0, channel: 0 });
    output.send('noteon', { note: 86, velocity: 0, channel: 0 });
}




//input.on('noteon', msg => console.log('noteon', msg.note, msg.velocity, msg.channel));
input.on('noteon', function (msg) {



    if (msg.note == 53) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons53[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 54) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons54[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 55) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons55[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 56) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons56[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 57) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons57[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 52) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons52[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 51) {
        if (encoderenabled === 1) {
            if (msg.channel < 4) {
                encodernr = msg.channel;
            }
        } else {
            client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons51[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
        }
    }
    if (msg.note == 50) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"buttonId":2,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 49) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"buttonId":1,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 48) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }



    if (msg.note >= 82 && msg.note <= 86) {//page select
        if (page_mode > 0) {
            output.send('noteon', { note: (pageIndex + 82), velocity: 0, channel: 0 });
            pageIndex = msg.note - 82;
            output.send('noteon', { note: (msg.note), velocity: blackout, channel: 0 });
        }
        if (page_mode == 2) {
            pageIndex2 = pageIndex;
        }
    }



    if (msg.note == 80) {//Encoder_enabled
        if (encoderenabled === 0) {
            output.send('noteon', { note: 80, velocity: 2, channel: 0 });
            encoderenabled = 1;
        } else {
            output.send('noteon', { note: 80, velocity: 0, channel: 0 });
            encoderenabled = 0;
        }
        output.send('noteon', { note: (pageIndex + 82), velocity: blackout, channel: 0 });
    }

    /*
    if (msg.note == 81) {//Display_mode
        if (display_mode == 1) {
            output.send('noteon', { note: 81, velocity: 1, channel: 0 });
            display_mode = 2;
        } else {
            output.send('noteon', { note: 81, velocity: 0, channel: 0 });
            display_mode = 1;
        }
    }
    */

});


input.on('noteoff', function (msg) {


    if (msg.note == 53) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons53[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 54) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons54[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 55) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons55[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 56) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons56[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 57) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons57[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 52) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons52[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 51) {
        if (encoderenabled === 1) {

        } else {
            client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons51[msg.channel] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
        }
    }
    if (msg.note == 50) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"buttonId":2,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 49) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"buttonId":1,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }
    if (msg.note == 48) {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }


});

input.on('cc', function (msg) {

    if (msg.controller == 7) {//fader_1_8
        client.send('{"requestType":"playbacks_userInput","execIndex":' + msg.channel + ',"pageIndex":' + pageIndex2 + ',"faderValue":' + faderValue[msg.value] + ',"type":1,"session":' + session + ',"maxRequests":0}');
    }

    if (msg.controller == 14) {//grand_master
        grandmaster = faderValue[msg.value] * 100;
        if (grandmaster === 100) {
            blackout = 1;
        } else {
            blackout = 2;
        }

        client.send('{"command":"SpecialMaster 2.1 At ' + grandmaster + '","session":' + session + ',"requestType":"command","maxRequests":0}');
        output.send('noteon', { note: (pageIndex + 82), velocity: blackout, channel: 0 });
    }

    if (msg.controller == 47) {//encoder
        if (encoderenabled === 1) {
            if (msg.value > 1 && msg.value < 64) {
                client.send('{"command":LUA "gma.canbus.encoder(' + encodernr + ',2,pressed)","session":' + session + ',"requestType":"command","maxRequests":0}');
            } else if (msg.value > 64 && msg.value < 127) {
                client.send('{"command":LUA "gma.canbus.encoder(' + encodernr + ',-2,pressed)","session":' + session + ',"requestType":"command","maxRequests":0}');
            }
        }
    }

});




console.log("Connecting to grandMA2 ...");
//WEBSOCKET-------------------
client.onerror = function () {
    console.log('Connection Error');
};

client.onopen = function () {
    console.log('WebSocket Client Connected');
};

client.onclose = function () {
    console.log('Client Closed');
    midiclear();
    input.close();
    output.close();
    process.exit();
};

client.onmessage = function (e) {

    request = request + 1;

    if (request >= 9) {
        client.send('{"session":' + session + '}');
        client.send('{"requestType":"getdata","data":"set,clear,solo,high","session":' + session + ',"maxRequests":1}');
        request = 0;
    }

    if (typeof e.data === 'string') {


        obj = JSON.parse(e.data);


        if (obj.status == "server ready") {
            console.log("SERVER READY");
            client.send('{"session":0}')
        }
        if (obj.forceLogin == true) {
            console.log("LOGIN ...");
            session = (obj.session);
            client.send('{"requestType":"login","username":"apc20","password":"2c18e486683a3db1e645ad8523223b72","session":' + session + ',"maxRequests":10}')
        }

        if (obj.session == 0) {
            console.log("CONNECTION ERROR");
            client.send('{"session":' + session + '}');
        }

        if (obj.session) {
            if (obj.session == -1) {
                console.log("Please turn on Web Remote, and set Web Remote password to \"remote\"");
                midiclear();
                input.close();
                output.close();
                process.exit();
            } else {
                session = (obj.session);
            }
        }

        if (obj.text) {
            console.log(obj.text);
            text = obj.text;
        }

        if (obj.responseType == "login" && obj.result == true) {
            setInterval(interval, 100);//80
            console.log("...LOGGED");
            console.log("SESSION " + session);
        }

        if (obj.responseType == "login" && obj.result == false) {
            console.log("...LOGIN ERROR");
            console.log("SESSION " + session);
        }

        if (obj.responseType == "presetTypeList") {
            //console.log("Preset Type List");
        }

        if (obj.responseType == "presetTypes") {
            //console.log("Preset Types");
        }

        if (obj.responseType == "getdata") {
            //console.log("Get Data");
        }

        if (obj.responseType == "playbacks") {

            if (obj.responseSubType == 3) {//Button LED
                if (wing == 1) {
                    if (display_mode == 1) {
                        var j = 53;
                        var l = 0;
                        for (k = 0; k < 5; k++) {

                            for (i = 0; i < 5; i++) {
                                var m = 3;
                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                else if ((obj.itemGroups[0].items[l][i].i.c) == "#000000") { m = 0; }
                                else { m = 5; }
                                output.send('noteon', { note: j, velocity: m, channel: i });
                            }
                            l++;
                            for (i = 0; i <= 2; i++) {
                                var m = 3;
                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                else if ((obj.itemGroups[0].items[l][i].i.c) == "#000000") { m = 0 }
                                else { m = 5; }
                                output.send('noteon', { note: j, velocity: m, channel: i + 5 });
                            }
                            l++;
                            j++;
                        }
                        j = 52
                        for (k = 0; k < 2; k++) {

                            for (i = 0; i < 5; i++) {
                                var m = 0;
                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                output.send('noteon', { note: j, velocity: m, channel: i });
                            }
                            l++;
                            for (i = 0; i < 3; i++) {
                                var m = 0;
                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                output.send('noteon', { note: j, velocity: m, channel: i + 5 });
                            }
                            l++;
                            j--;
                            if (encoderenabled === 1) {
                                for (i = 0; i < 8; i++) {
                                    m = 0;
                                    if (i === encodernr) {
                                        m = 1;
                                    }
                                    output.send('noteon', { note: j, velocity: m, channel: i });
                                }
                                break;
                            }
                        }
                    } else if (display_mode == 2) {
                        var j = 53;
                        var l = 0;
                        for (k = 0; k < 5; k++) {

                            for (i = 0; i < 5; i++) {

                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                else { m = 0; }
                                output.send('noteon', { note: j, velocity: m, channel: i });
                            }
                            l++;
                            for (i = 0; i <= 2; i++) {
                                var m = 3;
                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                else { m = 0; }
                                output.send('noteon', { note: j, velocity: m, channel: i + 5 });
                            }
                            l++;
                            j++;
                        }
                        j = 52
                        for (k = 0; k < 2; k++) {

                            for (i = 0; i < 5; i++) {

                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                else { m = 0; }
                                output.send('noteon', { note: j, velocity: m, channel: i });
                            }
                            l++;
                            for (i = 0; i < 3; i++) {

                                if (obj.itemGroups[0].items[l][i].isRun == 1) { m = 1; }
                                else { m = 0; }
                                output.send('noteon', { note: j, velocity: m, channel: i + 5 });
                            }
                            l++;
                            j--;
                            if (encoderenabled === 1) {
                                for (i = 0; i < 8; i++) {
                                    m = 0;
                                    if (i === encodernr) {
                                        m = 1;
                                    }
                                    output.send('noteon', { note: j, velocity: m, channel: i });
                                }
                                break;
                            }
                        }
                    }

                }
            }

            if (obj.responseSubType == 2) {//Fader LED
                if (wing == 1) {
                    if (display_mode == 1) {//default color
                        j = 0;
                        for (var i = 0; i < 5; i++) {
                            m = 0;
                            if ((obj.itemGroups[0].items[0][i].i.c) != "#000000") { m = 1; }
                            if (i == 0 && wing == 1 && pageIndex2 == 0) { m = 1; }
                            output.send('noteon', { note: 49, velocity: m, channel: i });
                            if (obj.itemGroups[0].items[0][i].isRun) { m = 1; }
                            else { m = 0; }
                            output.send('noteon', { note: 50, velocity: m, channel: i });
                            output.send('noteon', { note: 48, velocity: m, channel: i });
                            j++;
                        }

                        for (var i = 0; i < 3; i++) {
                            if ((obj.itemGroups[0].items[1][i].i.c) == "#000000") { m = 0; }
                            else { m = 1; }
                            output.send('noteon', { note: 49, velocity: m, channel: i + 5 });
                            if (obj.itemGroups[0].items[1][i].isRun) { m = 1; }
                            else { m = 0; }
                            output.send('noteon', { note: 50, velocity: m, channel: i + 5 });
                            output.send('noteon', { note: 48, velocity: m, channel: i + 5 });
                            j++;
                        }
                    } else if (display_mode == 2) {//dark green
                        j = 0;
                        for (var i = 0; i < 5; i++) {
                            output.send('noteon', { note: 49, velocity: 0, channel: i });
                            if (obj.itemGroups[0].items[0][i].isRun) { m = 1; }
                            else { m = 0; }
                            output.send('noteon', { note: 50, velocity: m, channel: i });
                            output.send('noteon', { note: 48, velocity: 0, channel: i });
                            j++;
                        }

                        for (var i = 0; i < 3; i++) {
                            output.send('noteon', { note: 49, velocity: 0, channel: i + 5 });
                            if (obj.itemGroups[0].items[1][i].isRun) { m = 1; }
                            else { m = 0; }
                            output.send('noteon', { note: 50, velocity: m, channel: i + 5 });
                            output.send('noteon', { note: 48, velocity: 0, channel: i + 5 });
                            j++;
                        }
                    }
                }
            }
        }
    }
};
