# ma2apc20
Nodejs code to control grandMA2 use APC20 midi controller - free - led feedback


Control grandMA2 use AKAI APC20 controller



Download my code and unarchive to C:

Download and instal NODEJS version 14.17  from https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi


---------------

Run MA2 on PC

ADD user "apc20" password "remote"

Turn on web remote (Global settings/ remote/ login enable

Run my code - open ma2apc20 with node.exe (set is as default open tool for .js files)



Or tart my code from CMD line

node ma2apc20



--------------------

Program on start schows all available midi devices MIDI IN & MIDI OUT

--------------------

CONTROL SURFACE


WING 1 - mode

buttons 101 - 108
faders 1 - 8

-------

WING 2
Buttons 108 -115
Faders 8-15

----

RED 1 2 3 4 (PLAY STOP REC MIDI...) is encoder selector

use encoder to control on screen encoder

MASTER Button is BO

------------

Master Fader = Grand Master
---------------------------


When set WING 0 (in file config)

SET VIEW TO 2 ROWS EXECUTOR VIEW IN MA2


EXECUTOR BUTTONS

101 - 109

111 - 119

121 - 129

131 - 139

141 - 149

151 - 159

161 - 169 (if encoder is enabled - select encoder)



FADER BUTTONS 2 ROWS

FADERS

1 - 8


--------------

BUTTONS ON THE RIGHT SIDE (SCENE LAUCH)

select page from 1 to 5 (only for executors if page_select mode is 1)

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

! If U see on window Undefined 1 - Your MA2 is not supported (too old)
