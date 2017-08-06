Run at your own risk

docker build -t zachnedwich/mopidy-nowplaying .
docker create --name=mopidy-nowplaying -p <PORT>:<PORT> zachnedwich/mopidy-nowplaying

