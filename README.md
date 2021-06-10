# ma2apc20
Nodejs code to control grandMA2 use APC20 midi controller - free - led feedback


Control grandMA2 use AKAI APC20 controller



Download my code and unarchive to C:

Download and instal NODEJS version 14.17  from https://nodejs.org/en/


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

100 - 108

110 - 118

120 - 128

130 - 138

140 - 148


150 - 158

160 - 168



FADER BUTTONS
1 - 8

FADERS

1 - 8


--------------

BUTTONS ON THE RIGHT SIDE (SCENE LAUCH)

select page from 1 to 5

(only executor buttons - but U can turn off or turn on for all (executors and faders)

--------------

SCHIFT BUTTON

Display View change - from default to dark mode

--------------

MASTER BUTTON

Black Out


-------------

last fader 

Grand master


--------------

ENCODER - not programed
