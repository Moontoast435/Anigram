#!/usr/bin/env bash

set -o errexit

pipenv install -r requirements.txt --python 3.6

python manage.py collectstatic --no-input
python manage.py migrate