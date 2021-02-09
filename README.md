# Cumevremea
Web application for extracting weather forecast from IPTV streams.

This project uses the audio-detect project made by @craigfrancis, found at: https://github.com/craigfrancis/audio-detect

The project has been published on the website: www.cumevremea.ro, with quick info on how it works on www.cumevremea.ro/despre.html



IPTV streams are .m3u files that contain network streams to tv channels, they were bought from aliexpress.
FFMPEG is used for recording the above mentioned IPTV streams.

The modified version of audio detect is then used to look for the intro and the ending of the recorded stream, then adding the file with the name 1.mp4 to the web server folder.

The whole process is hosted on Microsoft Azure Virtual Machine, published on the web using Azure Internet Information Services (IIS), website build from zero using HTML, CSS and JavaScript.

