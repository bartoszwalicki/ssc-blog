---
title: "Converting QTVR panoramas to cubic and equirectangular"
date: "2020-11-19"
updatedDate: "2021-01-19"
abstract: "Get rid of legacy VR format and gain some Docker skills!"
---

## tl;dr

To convert QTVR .mov panorama to any other format use [panorama-tools Docker image](https://github.com/bartoszwalicki/panorama-tools) and proceed with README.

## Backstory

When I was younger I made a lot of spherical panoramas. I was not aware of keeping source photos, I only stored rendered panoramas in QTVR format. It was a mistake, huge mistake. QTVR is legacy QuickTime virtual reality format in `.mov` container.

I found only one tool that provides converter from QTVR to cube faces format - [freepv](http://freepv.sourceforge.net/) opensource panorama viewer, that have in toolset `qtvr2img`. That tool was my only hope. Project was not buildable due to legacy Mozilla development package dependency. I decided to not surrender. I found that someone already fixed this package in Gentoo repository [media-gfx/freepv at Gentoo](https://packages.gentoo.org/packages/media-gfx/freepv). I am not familiar with Gentoo and I could not get along with Emerge package manager, so the only way for me was to port it to Arch Linux.

After few trials I was able to successfully build it on Arch, patched version is available in mine repository: [freepv - buildable on Arch Linux](https://github.com/bartoszwalicki/freepv). It was not enough, I willed to provide ready to use tool for everyone who is stucked with QTVR panoramas. I created ready to use [panorama-tools Docker image](https://github.com/bartoszwalicki/panorama-tools), binary image is also pushed to [Dockerhub](https://hub.docker.com/repository/docker/bartoszwalicki/panorama-tools). _Panorama-tools_ docker image provides not only `qtvr2img` but also a lot of others command line tools for panoramas.

I would like to provide some step by step instruction for converting QTVR panaramas for folks that are not familliar with whole Docker stuff, let's begin!

## Requirements

- Docker for your platform - everything explained [here](https://docs.docker.com/get-docker/).
- Some test QTVR panorama in `.mov` file.
- Basic understanding of Linux shell or command line is recommended.

## Running panorama-tools Docker image

Open console. On Linux with GUI and MacOs it is usally `Terminal`, on Windows it is called `Command Prompt - cmd.exe` and execute following command:

```
docker pull bartoszwalicki/panorama-tools
```

it will download Docker image on your system. Docker image is a small encapsulated Linux virtual system.

Spinned Docker images are named _Containers_. We need it running. To create container you have to execute:

```
docker run -ti -v /local/folder/with/panoramas:/panoramas bartoszwalicki/panorama-tools:latest /bin/bash
```

parameters (in following order):

- `run` - creates container
- `-ti` - allows you to log into panorama-tools virtual system
- `-v localPath:remotePath` mounts folder from your system to panorama-tools virtual system
- `iamgeName` - in our case `panorama-tools` with version

after executing above commands you will log in directly to `panorama-tools` container. Now we can convert QTVR panoramas!

## Convert .mov QTVR to cubic face images.

After logging into container you should see something like that (root@someRandomNumber):

```
[root@74d4b1268437 /]#
```

We should change our working directory to `/panoramas`, execute:

```
cd ./panoramas/
```

let's check do we have our local folder with panoramas properly mapped, we can use command `ls` - list directory:

```
ls
```

in my case command resulted with following result:

```
[root@6df10172258e panoramas]# ls
pakm.mov
```

I have QTVR panorama named `pakm.mov` available.

To convert it to cube faces we will use `qtvr2img` tool:

```
qtvr2img pakm.mov
```

tool will generate six cube faces as a result in format \*.pnm, you can convert it in any desired extension using your favourite image manipulation program.

## Convert cube faces to equirectangular

We have also in our stack tool to convert cube faces to equirectangular image.

```
cubic2erect pano_0.pnm pano_1.pnm pano_2.pnm pano_3.pnm pano_4.pnm pano_5.pnm equirectangular.tif
```

## Goodies - batch conversion

`panorama-tools` have some pre-baked scripts for batch conversion

- convertAllQtvrToCubeFaces - converts all \*.mov QTVR to cube faces and moves result to separate folder
- convertAllPnmToJpg - converting all \.pnm to \.jpg with 85% quality and max side side 4096px. For this script works firstly must be run _convertAllQtvrToCubeFaces_.

Both scripts must be run in `/panoramas` directory.

<!-- alsaloop -C hw:Extigy -P softvol -r 48000 -f S16_LE -t 50000 -S 1
sudo alsactl restore -->
