PWD := $(shell pwd)
PATH := ${PWD}/node_modules/.bin:$(PATH)
.SILENT: build clean install release watch
all: install build watch

clean:
	rm -rf dist/debug node_modules

install:
	if [ ! -d node_modules ]; then npm ci; fi

build:
	sass -s compressed --no-charset --no-source-map src/sass:dist/debug
	css2userstyle --no-userscript dist/debug/theme.css

release:
	sass -s compressed --no-charset --no-source-map src/sass:dist/release
	postcss dist/release/theme.css --use autoprefixer cssnano --replace --no-map
	css2userstyle --no-userscript dist/release/theme.css

watch:
	chokidar src/sass -c 'make -s build' & \
		browser-sync start --config bs-config.js & \
		wait
