# CKEditor TeXZilla Plugin
# Copyright (C) 2014  Raniere Silva
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

## ############################### Variables ################################

## CKEDITORPATH    : path to CKEditor
CKEDITORPATH?=ckeditor
## TeXZilla        : the name of TeXZilla file
TeXZilla = TeXZilla.js

PLUGINPATH=/plugins/texzilla

SRCFILES=src/interface.js \
	 src/dialogs/interface.js

PLUGINFILES= src/icons/texzilla.png  \
	     src/plugin.js \
	     src/dialogs/texzilla.js

RELEASEFILES= AUTHORS \
	      COPYING \
	      README.md \
	      THANKS \
	      ${PLUGINFILES} \
	      src/samples/index.html

## 
## ################################ Commands ################################

## help            : print this text
help:
	@grep -e '^##' Makefile | sed 's/## //'

# Run JS Beautifier
beautifier: ${SRCFILES}
	js-beautify -r --config .js-beautifyrc ${SRCFILES}

lint: ${SRCFILES}
	jshint ${SRCFILES}

## check           : run JS Beautifier and JSHint
check: beautifier lint

# Build the icon from svg
src/icons/texzilla.png: src/icons/texzilla.svg
	convert -background none -density 512x512 $< -resize 16x16 $@

src/plugin.js: src/interface.js
	cat $^ > $@

${TeXZilla}:
	wget https://raw.githubusercontent.com/fred-wang/TeXZilla/TeXZilla-0.9.7/TeXZilla.js \
	    -O ${TeXZilla}

src/dialogs/texzilla.js: ${TeXZilla} src/dialogs/interface.js
	cat $^ > $@

## build           : Build the plugin
build: src/icons/texzilla.png src/plugin.js src/dialogs/texzilla.js

## deploy          : copy the plugin into ${CKEDITORPATH}
deploy: build
	if test ! -h $(CKEDITORPATH)$(PLUGINPATH); then \
	    mkdir -p $(CKEDITORPATH)$(PLUGINPATH); \
	    cp -r src/* $(CKEDITORPATH)$(PLUGINPATH); \
	fi

## link            : link src to ${CKEDITORPATH}
link: build
	if test ! -e $(CKEDITORPATH)$(PLUGINPATH); then \
	    ln -s $(PWD)/src $(CKEDITORPATH)$(PLUGINPATH); \
	fi

release: build
	zip ckeditor-texzilla.zip ${RELEASEFILES}

clean:
	rm -f src/plugin.js \
	    src/dialogs/texzilla.js

cleanall: clean
	rm -f src/icons/texzilla.png
	rm -rf $(CKEDITORPATH)$(PLUGINPATH)
