---
title: "Editing h265 videos in DaVinci Resolve"
date: "2021-03-19"
updatedDate: "2021-03-19"
abstract: "Quick note about editing h265 videos (in eg. from mobile phone) in DaVinci Resolve on Linux."
---

Linux edition of DaVinci Resolve is not able to edit h265 videos, probably some license issues. The best way to edit it, is to convert it to another format firstly and then use in DaVinci. My solution is to use ProRes coded. FFmpeg will be used to perform conversion.

## Command

```
ffmpeg -i vacation.mp4 -c:v prores_ks -profile:v 3 -qscale:v 9 -c:a pcm_s16le vacation.mov
```

where `-i INPUT_FILE_NAME.mp4` is input and at the end `OUTPUT_FILE_NAME.mov` is output. After converting DaVinci accepts video without any hassle.

## Resources

- [Look to Prores section of ffmpeg docs](http://trac.ffmpeg.org/wiki/Encode/VFX)
