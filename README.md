# SENG3011-minions
Our SENG3011 project

GlobeUs is an analytics platform that is visually compelling. It consists of an interactive globe in the centre of the screen, that displays data relating to COVID-19. Our analytics platform uses many data sources and external APIs, supplying COVID-19-cases, vaccination, death rates, and economic data by country. 

# Installation of Deps
pip3 install -r requirements.txt

# Runner the linter
autopep8 --in-place --aggressive --aggressive *.py

# Frontend stuff

Go into working directory or app dir

yarn install

yarn start - if in working dir

yarn dev - if in app dir

Running in linux VM with node v14.18.1


Running production read app for demos / deployment

in PHASE_2/app folder run the following

yarn build

yarn global add serve

serve -s build
