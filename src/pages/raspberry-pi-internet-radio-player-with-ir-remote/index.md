---
title: "Remote control with Raspberry Pi and ir-keytable"
date: "2021-01-09"
updatedDate: "2021-02-06"
abstract: "Using generic IR receiver, ir-keytable, mpd + mpc and triggerhappy."
---

## Backstory

My home audio set contains of two studio monitors and DAC that is connected via USB to Raspberry Pi 3B+ in the headless configuration. Music was played mainly by Spotify backed by [raspotify package](https://github.com/dtcooper/raspotify) and controlled by another device with the Spotify app. I was looking for some solution for adding Internet radio capabilities to RPi that would be easy to control. Nothing compares to physical buttons, so good ol' IR remote control came in mind first. After research and a few trials I came to a solution that is built upon:

- TSOP31236 IR receiver module (you can use any other IR module - 3.3V compatible)
- `ir-keytable` package, as LIRC is now deprecated
- `mpd` with `mpc` control as Internet radio stream player
- `triggerhappy` to map IR remote control keys to commands
- any IR remote controller

## Preparation

Connect speakers or headphones to your Raspberry Pi and open Terminal. Find some working IR remote controller, you can test it by directing it to your phone camera. Press some button and when it is working you should see blueish light.

## Test your audio setup first

Without a working audio setup, you won't move further. There is a handy command `speaker-test` that helps to quickly check if everything is in shape.

```
speaker-test -c 2 -t wav
```

It will play sound in a loop using the default device on 2 channels - stereo (`-c 2`) using more human sound (`-t wav`). If you don't hear anything, resolve your problems with ALSA first, good luck!

## Connect and configure IR receiver module

There is no point in writing everything again as [peppe8o described everything in that matter perfectly](https://peppe8o.com/setup-raspberry-pi-infrared-remote-from-terminal/). Execute every step there, if everything will be working, get back here and proceed to the next step.

Tip:

Some keycodes are actually assigned in Raspberry Pi, in example `KEY_POWER`. When you map them and press the button Raspberry Pi will instantly power down. The best is to use keycodes that reflects your usage. Here is my toml mapping file:

```toml
# Author: Bartosz Walicki
# Date: 21.12.2020
# Version: 1.0

[[protocols]]
name = "Egreat"
protocol = "nec"
variant = "necx"

[protocols.scancodes]
0xbd08 = "KEY_EXIT"
0xbd18 = "KEY_VOLUMEUP"
0xbd1c = "KEY_VOLUMEDOWN"
0xbd41 = "KEY_0"
0xbd15 = "KEY_1"
0xbd16 = "KEY_2"
0xbd17 = "KEY_3"
0xbd19 = "KEY_4"
0xbd1a = "KEY_5"
0xbd1b = "KEY_6"
0xbd1d = "KEY_7"
0xbd1e = "KEY_8"
0xbd1f = "KEY_9"
0xbd5c = "KEY_PAUSE"
0xbd5d = "KEY_STOP"
0xbd54 = "KEY_PREVIOUS"
0xbd02 = "KEY_NEXT"
```

## Configure mpd and mpc

`mpd` available in raspbain repository is deprecated, we will use alternative repository to get current version. Perform steps in [this instruction](https://www.musicpd.org/download-unoff-debian/).

[Music Player Daemon (MPD)](https://www.musicpd.org/) is a flexible, powerful, server-side application for playing music. I've made through few popular command-line music players and `mpd` works the best. `mpd` itself is only a deamon, to control it you will need some additional layer, command line client. The best for me is [mpc](https://www.musicpd.org/clients/mpc/). `mpc` is available in official repositories, it is not most recent version, but it will fit our needs. Install it directly:

```
sudo apt-get install mpc
```

### Add plyalist

By default playlists are stored in `/var/lib/mpd/playlists`, I like to create playlist myself. Create file:

```
touch radio_stations.m3u
```

edit it with your favourite editor. Here is mine playlist:

```
#EXTM3U

#EXTINF:-1, PR Jedynka
http://mp3.polskieradio.pl:8900/

#EXTINF:-1, PR Dwojka
http://mp3.polskieradio.pl:8902/

#EXTINF:-1, PR Trojka
http://mp3.polskieradio.pl:8904/

#EXTINF:-1, RMF FM
http://195.150.20.242:8000/rmf_fm

#EXTINF:-1, RADIO ZET
http://radiozetmp3-01.eurozet.pl:8400/

#EXTINF:-1, MC Radio
https://stream4.nadaje.com:8625/mcradio

#EXTINF:-1, Antyradio
http://ant-kat-01.cdn.eurozet.pl:8604/

#EXTINF:-1, Melodario
https://ml.cdn.eurozet.pl/mel-net.mp3

#EXTINF:-1, Afera
http://radio.afera.com.pl/afera128.mp3

#EXTINF:-1, Triple J
http://live-radio02.mediahubaustralia.com/2TJW/mp3/

```

General format:

```
#EXTINF:-1, RadioStationName
StreamUrl
```

where `-1` means that stream have no length.

Load playlist by command:

```
mpc load radio_stations
```

verify if playlist is loaded properly by executing command `mpc playlist`:

```
$ mpc playlist
PR Jedynka
PR Dwojka
PR Trojka
RMF FM
RADIO ZET
MC Radio
Antyradio
Melodario
Afera
Triple J
```

After executing `mpc play 1` you should hear first radiostation in playlist. Stop it with `mpc stop`.

## triggerhappy - create action on remote command

Firstly, there is a bug in triggerhappy causing that commands are not executed with proper user. In my Rapsbian 10 release it was not fixed. I created a [PR with solution at project on Github](https://github.com/wertarbyte/triggerhappy/pull/30), maybe it will be merged someday. Until that you have to fix it yourself.

Edit `triggerhappy.service` file:

```
sudo vim /etc/systemd/system/multi-user.target.wants/triggerhappy.service
```

and remove hardcoded `--user nobody` code. `triggerhappy.service` after edit:

```
[Unit]
Description=triggerhappy global hotkey daemon
After=local-fs.target

[Service]
Type=notify
ExecStart=/usr/sbin/thd --triggers /etc/triggerhappy/triggers.d/ --socket /run/thd.socket --deviceglob /dev/input/event*

[Install]
WantedBy=multi-user.target
```

_Disclaimer_
_I am aware that running services as root is not recommended and I should not do this in production environment. However, mine RPi is running in local environment whithout acces to outer world, so I should be safe._

Set user for service:

```
sudo vim /etc/default/triggerhappy
```

and uncomment last line, set user to root:

```
# Defaults for triggerhappy initscript
# sourced by /etc/init.d/triggerhappy
# installed at /etc/default/triggerhappy by the maintainer scripts

#
# This is a POSIX shell fragment
#

# Additional options that are passed to the Daemon.
# DAEMON_OPTS=""

# The Triggerhappy daemon (thd) drops its root privileges after
# startup and becomes "nobody". If you want it to retain its root
# status (e.g. to run commands only accessible to the system user),
# uncomment the following line or specifiy the user option yourself:
#
DAEMON_OPTS="--user root"
```

At last, configure triggers. Trigger config is located at `/etc/triggerhappy/triggers.d/`, create there file with name that will reflect your triggers, in my case it was `audio.conf`.

Config file defines mapping between key code (pressed key) and executed command. As you can see I have 10 Internet streams defined in playlist, so I mapped 10 keys on mine remote control and some additional volume control of `Master` device. The number between defines trigger action: `0 - release, 1 - single press, 2 - press and hold`.

```
KEY_1		1		mpc play 1
KEY_2		1		mpc play 2
KEY_3		1		mpc play 3
KEY_4		1		mpc play 4
KEY_5		1		mpc play 5
KEY_6		1		mpc play 6
KEY_7		1		mpc play 7
KEY_8		1		mpc play 8
KEY_9		1		mpc play 9
KEY_0		1		mpc play 10
KEY_VOLUMEUP	1		/usr/bin/amixer set Master 1%+ > /dev/null
KEY_VOLUMEUP	2		/usr/bin/amixer set Master 1%+ > /dev/null
KEY_VOLUMEDOWN	1		/usr/bin/amixer set Master 1%- > /dev/null
KEY_VOLUMEDOWN	2		/usr/bin/amixer set Master 1%- > /dev/null
KEY_EXIT	1		mpc stop
```

Restart triggerhappy: `sudo systemctl restart triggerhappy` and enjoy your remote control Rpi!

## Resources

- [peppe8o IR control blog post](https://peppe8o.com/setup-raspberry-pi-infrared-remote-from-terminal/)
- [gordonturner's solution for RPi ir receiver](https://blog.gordonturner.com/2020/05/31/raspberry-pi-ir-receiver/)
- [TSOP31236 receiver datasheet](https://www.vishay.com/docs/82492/tsop312.pdf)
- [ir-keytable manpage](https://linux.die.net/man/1/ir-keytable)
