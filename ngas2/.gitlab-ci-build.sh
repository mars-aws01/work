#!/bin/sh
cd /build
echo "pwd" && pwd
pip install -r requirements.txt
python setup.py nosetests --with-xunit --cover-branches --with-coverage --cover-erase --cover-xml --nocapture --cover-package=.
rm -rf ngas2.egg-info/
