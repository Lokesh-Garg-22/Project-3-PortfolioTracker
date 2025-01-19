@echo off

for /f "delims=" %%a in ('Type "dockerContainerId.txt"') do (
    docker stop %%a
)

docker build -t portfolio-tracker .\backend\

docker run -d --rm -p 8080:8080 portfolio-tracker > dockerContainerId.txt
