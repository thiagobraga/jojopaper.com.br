PWD := $(shell pwd)
PATH := ${PWD}/node_modules/.bin:$(PATH)
.SILENT: clean install build release watch
all: clean install build watch

clean:
	rm -rf theme.css node_modules

install:
	if [ ! -d node_modules ]; then yarn; fi

build:
	sass -s compressed --no-charset --no-source-map src/sass:.
	css2userstyle --no-userscript theme.css

release:
	sass -s compressed --no-charset --no-source-map src/sass:.
	postcss theme.css --use autoprefixer cssnano --replace --no-map
	css2userstyle --no-userscript theme.css

watch:
	chokidar src/sass -c 'make -s build' & \
		browser-sync start --config bs-config.js & \
		wait
