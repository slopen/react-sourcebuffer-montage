# react-sourcebuffer-montage example

## install

```
$ git clone git@github.com:slopen/react-sourcebuffer-montage.git
$ cd react-sourcebuffer-montage/example
$ npm i
```

## bootstrap videos

```
$ cd data && mkdir videos
$ chmod 777 *.sh
$ sh bootstrap.sh
```

will download `blender/demo/movies/Sintel.2010.720p.mkv` and slice to 10 `.webm` files

## start

```
$ npm start
```

open http://localhost:9090 in browser

## usage

* [example component](src/components/content/montage/index.js)
* [less variables override](src/styles/components/editor.less)
* [bootstrapped data example](data/videos.js)
* [creating segmented .webm](data/videos.sh)

