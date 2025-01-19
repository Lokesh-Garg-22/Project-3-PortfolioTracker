#!/bin/bash
grep . ./dockerContainerId.txt| docker stop
docker build -t portfolio-tracker ./backend/
docker run -d --rm -p 8080:8080 portfolio-tracker > dockerContainerId.txt