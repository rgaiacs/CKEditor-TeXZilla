# CKEditor TeXZilla Plugin
# Copyright (C) 2014  Raniere Silva
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

CKEDITORPATH?=ckeditor
PLUGINPATH=/plugins/texzilla
SRCFILES=src/interface.js \
	 src/dialogs/interface.js

help:
	@echo 'make help'
	@echo '  Print this text.'
	@echo ''
	@echo 'make check'
	@echo '  Run JS Beautifier and JSHint.'
	@echo ''
	@echo 'make build'
	@echo '  Build the plugin.'
	@echo ''
	@echo 'make deploy'
	@echo '  Copy the plugin into `ckeditor/plugins/texzilla`'
	@echo ''
	@echo 'make deploy CKEDITORPATH=/path/to/ckeditor'
	@echo '  Copy the plugin into `/path/to/ckeditor/plugins/texzilla`'
	@echo ''
	@echo 'make link'
	@echo '  Link `src` to `ckeditor/plugins/texzilla`'
	@echo ''
	@echo 'make link CKEDITORPATH=/path/to/ckeditor'
	@echo '  Link `src` to `/path/to/ckeditor/plugins/texzilla`'

# Run JS Beautifier
beautifier: ${SRCFILES}
	js-beautify -r --config .js-beautifyrc ${SRCFILES}

lint: ${SRCFILES}
	jshint ${SRCFILES}

check: beautifier lint

# Build the icon from svg
src/icons/texzilla.png: src/icons/texzilla.svg
	convert -background none -density 512x512 $< -resize 16x16 $@

# Build the parser from TeXZilla
src/parse.js:
	$(MAKE) -C texzilla build

# Join the TeXZilla with the CKEditor plugin interface
src/plugin.js: src/interface.js
	cat $^ > $@

texzilla/TeXZilla.js:
	make -C texzilla build

src/dialogs/texzilla.js: texzilla/TeXZilla.js src/dialogs/interface.js
	cat $^ > $@

build: src/icons/texzilla.png src/plugin.js src/dialogs/texzilla.js

deploy: build
	if test ! -h $(CKEDITORPATH)$(PLUGINPATH); then \
	    mkdir -p $(CKEDITORPATH)$(PLUGINPATH); \
	    cp -r src/* $(CKEDITORPATH)$(PLUGINPATH); \
	fi

link: build
	if test ! -e $(CKEDITORPATH)$(PLUGINPATH); then \
	    ln -s $(PWD)/src $(CKEDITORPATH)$(PLUGINPATH); \
	fi

clean:
	rm -f src/plugin.js \
	    src/dialogs/texzilla.js

cleanall: clean
	rm -f src/icons/texzilla.png
	rm -rf $(CKEDITORPATH)$(PLUGINPATH)
