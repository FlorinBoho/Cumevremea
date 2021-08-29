
# config['source_path']        = './example/source.mp3';
config['source_path_mp4']:    'E:/Desktop/Pro-Tv 1080p 30.10.2020.mp4';

config['source_frame_start'] = 0;    # (x * sample_rate) / hop_length)
config['source_frame_end']   = None; # (x * sample_rate) / hop_length)

config['matching_samples']   = 'E:/Desktop/Protv'; # Could also be a path to a single file.
config['matching_min_score'] = 0.15;
config['matching_skip']      = 0;    # Jump forward X seconds after a match.
config['matching_ignore']    = 0;    # Ignore additional matches X seconds after the last one.

config['output_title']       = None; # Set a title, which creates the files: "X.meta", "X.results", and "X-chapters.mp3"
