# ma2apc20
Nodejs code to control grandMA2 use APC20 midi controller - free - led feedback


Control grandMA2 use AKAI APC20 controller



Download my code and unarchive to C:

Download and instal NODEJS version 14.17  from https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi


---------------

Run MA2 on PC

ADD user "apc20" password "remote"

Turn on web remote (Global settings/ remote/ login enable


Start my code from CMD line

node ma2apc20



--------------------

Program on start schows all available midi devices MIDI IN & MIDI OUT


If You APC have diferent number (default 0 IN, 1 OUT) U need open ma2apc20.js in notepad & change to correct numbers.

--------------------


If U want connect to console or other ON PC - U can change default (localhost) to Console IP Addres

open ma2apc20.js use notepad

find line

var client = new W3CWebSocket('ws://localhost:80/');


change "localhost" to ip addres. 


--------------------

CONTROL SURFACE


SET WIEW TO 2 ROWS EXECUTOR VIEW IN MA2


EXECUTOR BUTTONS

101 - 109

111 - 119

121 - 129

131 - 139

141 - 149

151 - 159

161 - 169 (if encoder is enabled - select encoder)



FADER BUTTONS

1 - 8


FADERS

1 - 8


--------------

BUTTONS ON THE RIGHT SIDE (SCENE LAUCH)

select page from 1 to 5 (for executors)

--------------

SCHIFT BUTTON

not used

--------------

MASTER BUTTON

Enable Encoder (ON / OFF)

When encoder is enabled - u can control all 4 encoder - select encoder (master 1 2 3 4)


-------------



Master fader 

Grand master


--------------

ENCODER - control encoders

-----------------

!!! Program not work with old ma2onpc

!! Program not work - if any executor have more then 1 row ! (thx Philipp Darpe)
