#!/usr/bin/env bash

mkdir -p videos;

wget --header="Accept: text/plain,*/*;q=0.8" \
	"http://ftp.nluug.nl/pub/graphics/blender/demo/movies/Sintel.2010.720p.mkv" \
	-O "videos/video.mkv";

unzip -o -qq ffmpeg.zip && rm -rf __MACOSX;

sh ./videos.sh;

rm ffmpeg;