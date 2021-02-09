C:\Users\boho\Desktop\program\ffmpeg\ffmpeg.exe -r 25 -i "http://mu01cz.okcomputer.club:8880/private"  -t 600 -vsync 1 -acodec copy -vcodec copy -preset medium "C:\Users\boho\Desktop\program\input_videos\Antena1 1080p %DATE%.mp4"  1> "C:\Users\boho\Desktop\program\logs\%DATE% ffmpegLog Antena1.log"  2>&1

timeout 120

python.exe C:\Users\boho\Desktop\program\python_scripts\process.py "C:\Users\boho\Desktop\program\input_videos\Antena1 1080p %DATE%.mp4" "C:\Users\boho\Desktop\program\samples\antena1" "C:\inetpub\wwwroot\Cumevremea\videos\antena1\1.mp4"  1> "C:\Users\boho\Desktop\program\logs\%DATE% pythonLog Antena1.log" 2>&1 

Rem http://u3mpFodhfDNMVsxRXY.c2e3n4te5r6.me/live/cra4.php?z=111&ui=97153&s=CT4D7NCMUP&id=60637&h=61d56728c45a1a53ff38910ef1f98a157fbdc58c&n=1609171050
Rem http://u3m5mXjb8NdzBM60AI.c2e3n4te5r6.me/live/cra4.php?z=111&ui=97153&s=CT4D7NCMUP&id=60633&h=412e0edf6ad3f7011eec8b5b1968acdeb6f8b4b6&n=1610206522 