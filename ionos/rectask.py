import sys
import os
import glob
import subprocess
import schedule
import time

ffmpeg_path='E:/Desktop/ffmpeg-2020-10-07-git-a086b73e1f-full_build/bin/ffmpeg.exe'



#exec(open(os.path.dirname(os.path.realpath(__file__)) + '/process.py').read())

def job(t):
    print("I'm working...", t)
    return

def intermediary():
    subprocess.Popen([ffmpeg_path, '-nostdin', '-i', 'iptv-direct-stream-of-tv-channel.m3u8', '-acodec', 'copy', '-vcodec', 'copy', '-t', '10', sys.argv[1]])
    
    #audioDetect() #sys.argv[0]='.../process.py', sys.argv[1]='E:\Desktop\licenta\Pro-Tv 1080p %DATE%.mp4'
    

schedule.every().monday.at("19:20").do(intermediary)
schedule.every().tuesday.at("19:20").do(intermediary)
schedule.every().wednesday.at("20:58").do(intermediary)
schedule.every().thursday.at("19:20").do(intermediary)
schedule.every().friday.at("19:20").do(intermediary)

schedule.every().saturday.at("18:50").do(intermediary)
schedule.every().sunday.at("18:50").do(intermediary)

schedule.every(10).seconds.do(job,"10 fucking seconds")



while True:
    schedule.run_pending()
    time.sleep(10) # wait one minute



