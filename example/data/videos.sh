#!/usr/bin/env bash

QUALITY=40
FOLDER=videos
SOURCE=video.mkv

thumbnail () {
	local file=${1};

	./ffmpeg -i "$FOLDER/$file.webm" -vf "thumbnail" -frames:v 1 "$FOLDER/$file.png" -y;
}

transcode () {
 	local file=${1};
    local start=${2};
    local length=${3};

    ./ffmpeg -ss $start -i "$FOLDER/$SOURCE" -t $length -filter:v scale="720:-1" -threads 4 \
    	-f webm -vcodec vp8 -keyint_min 24 -r 24 -g 1 \
    	-force_key_frames "expr:gte(t,n_forced*2)" \
    	-qmin $QUALITY -qmax $QUALITY -crf $QUALITY -c:a libvorbis "$FOLDER/$file.webm" -y;

    thumbnail $file;
}

transcode "video-0" 31 10;
transcode "video-1" 62 20;
transcode "video-2" 92 15;
transcode "video-3" 183 25;
transcode "video-4" 224 5;
transcode "video-5" 250 10;
transcode "video-6" 338 20;
transcode "video-7" 445 10;
transcode "video-8" 776 5;
transcode "video-9" 801 15;