#--------------------------------------------------

# np.set_printoptions(threshold=np.nan)
ffmpeg_path='ffmpeg'

dtype = np.complex64
n_fft=2048
hz_count = int(1 + n_fft // 2) # 1025 (Hz buckets)
win_length = n_fft
hop_length = int(win_length // 4)
sample_rate = 22050
sample_crop_start = 5 # The first 4 seem to get damaged
sample_crop_end = 2
sample_warn_allowance = 3

match_any_sample = True

def writeOutputVideos(videoPath,p1,p2,p3,p4,p5):
    if not os.path.exists(videoPath): #if no video was recorded and if no-video.mp4 doesnt exist.
        print('Missing no-video-recorded/final output file file')
        sys.exit()
    else:
        print('Adding last video to the server')   
        if not os.path.exists(p1[:-5]):
            os.makedirs(p1[:-5])
        if os.path.exists(p5):
            os.remove(p5)
        if os.path.exists(p4):
            os.rename(p4,p4[:-5]+'5.mp4')
        if os.path.exists(p3):
            os.rename(p3,p3[:-5]+'4.mp4')
        if os.path.exists(p2):
            os.rename(p2,p2[:-5]+'3.mp4')
        if os.path.exists(p1):
            os.rename(p1,p1[:-5]+'2.mp4')    
        shutil.copyfile(videoPath,p1)
    return 0  
        
    #if os.path.exists(videoPath): #if video has been recorded from iptv
    #    os.rename(videoPath,p1[:-5]+'1.mp4')
    #else:
    #    shutil.copyfile(videoPath,p1[:-5]+'1.mp4')
#--------------------------------------------------

def pcm_data(path, sample_rate):

    devnull = open(os.devnull)
    #proc = subprocess.Popen(['E:/Desktop/ffmpeg-2020-10-07-git-a086b73e1f-full_build/bin/ffmpeg.exe', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(sample_rate), '-'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    proc = subprocess.Popen([ffmpeg_path, '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(sample_rate), '-'], stdout=subprocess.PIPE, stderr=devnull)
    devnull.close()
    #print('errors',proc.stderr.read())
    
    #print('proc=', proc)
    scale = 1./float(1 << ((8 * 2) - 1))
    #print('scale=',scale)
    y = scale * np.frombuffer(proc.stdout.read(), '<i2').astype(np.float32)
    print('y=',y)
    return y

#--------------------------------------------------

def stft_raw(series, sample_rate, win_length, hop_length, hz_count, dtype):

    #--------------------------------------------------
    # Config

    window = 'hann'
    pad_mode='reflect'

    #--------------------------------------------------
    # Get Window

    fft_window = scipy.signal.get_window(window, win_length, fftbins=True)

    #--------------------------------------------------
    # Pad the window out to n_fft size... Wrapper for
    # np.pad to automatically centre an array prior to padding.

    axis = -1

    n = fft_window.shape[axis]

    lpad = int((n_fft - n) // 2)

    lengths = [(0, 0)] * fft_window.ndim
    lengths[axis] = (lpad, int(n_fft - n - lpad))

    if lpad < 0:
        raise ParameterError(('Target size ({:d}) must be at least input size ({:d})').format(n_fft, n))

    fft_window = np.pad(fft_window, lengths, mode='constant')

    #--------------------------------------------------
    # Reshape so that the window can be broadcast

    fft_window = fft_window.reshape((-1, 1))

    #--------------------------------------------------
    # Pad the time series so that frames are centred

    #print('------------')
    print('series: ',series)
    series = np.pad(series, int(n_fft // 2), mode=pad_mode)

    #--------------------------------------------------
    # Window the time series.

        # Compute the number of frames that will fit. The end may get truncated.
    frame_count = 1 + int((len(series) - n_fft) / hop_length) # Where n_fft = frame_length

        # Vertical stride is one sample
        # Horizontal stride is `hop_length` samples
    frames_data = np.lib.stride_tricks.as_strided(series, shape=(n_fft, frame_count), strides=(series.itemsize, hop_length * series.itemsize))

    #--------------------------------------------------
    # how many columns can we fit within MAX_MEM_BLOCK

    MAX_MEM_BLOCK = 2**8 * 2**10
    n_columns = int(MAX_MEM_BLOCK / (hz_count * (dtype(0).itemsize)))

    #--------------------------------------------------
    # Return

    return (frames_data, fft_window, n_columns)
