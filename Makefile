# CKEditor TeXZilla Plugin
# Copyright (C) 2014  Raniere Silva
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

CKEDITORPATH?=ckeditor
PLUGINPATH=/plugins/texzilla

help:
	@echo 'make help'
	@echo '  Print this text.'
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

# Build the icon from svg
src/icons/texzilla.png: src/icons/texzilla.svg
	convert -background none -density 512x512 $< -resize 16x16 $@

# Build the parser from TeXZilla
src/parse.js:
	$(MAKE) -C texzilla build

# Join the TeXZilla with the CKEditor plugin interface
src/plugin.js: texzilla/TeXZilla.js src/interface.js
	cat $^ > $@

src/dialogs/texzilla.js: texzilla/TeXZilla.js src/dialogs/interface.js
	cat $^ > $@

build: src/icons/texzilla.png src/plugin.js src/dialogs/texzilla.js

deploy: build
	mkdir -p $(CKEDITORPATH)$(PLUGINPATH)
	if test -d $(CKEDITORPATH)$(PLUGINPATH); then \
	    cp -r src/* $(CKEDITORPATH)$(PLUGINPATH); \
	fi

link: build
	if test ! -e $(CKEDITORPATH)$(PLUGINPATH); then \
	    ln -s $(PWD)/src $(CKEDITORPATH)$(PLUGINPATH); \
	fi

clean:
	rm -rf $(CKEDITORPATH)$(PLUGINPATH)

cleanall: clean
	rm -f src/icons/texzilla.png
