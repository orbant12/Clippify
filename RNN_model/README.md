# RNN - Speech To Text 

## Dataset 

LJSpeech Dataset: https://keithito.com/LJ-Speech-Dataset/

    data_url = "https://data.keithito.com/data/speech/LJSpeech-1.1.tar.bz2"
    data_path = keras.utils.get_file("LJSpeech-1.1", data_url, untar=True)
    wavs_path = data_path + "/wavs/"
    metadata_path = data_path + "/metadata.csv"
    
    # Read metadata file and parse it
    metadata_df = pd.read_csv(metadata_path, sep="|", header=None, quoting=3)
    metadata_df.columns = ["file_name", "transcription", "normalized_transcription"]
    metadata_df = metadata_df[["file_name", "normalized_transcription"]]
    metadata_df = metadata_df.sample(frac=1).reset_index(drop=True)
    metadata_df.head(3)
    
    ## Splitting and Validating Data
    split = int(len(metadata_df) * 0.90)
    df_train = metadata_df[:split]
    df_val = metadata_df[split:]
    
    print(f"Size of the training set: {len(df_train)}")
    print(f"Size of the training set: {len(df_val)}")
    
---

## Model Architecture

<img width="683" alt="Screenshot 2024-07-05 at 00 16 28" src="https://github.com/orbant12/Clippify/assets/124793231/86fd4e1d-a500-4b58-8df3-965ab2bc9b92">

---

![ASR Neaural Network (4)](https://github.com/orbant12/Automatic_Speech_Recognition-CNN/assets/124793231/21e48621-5b8c-4319-a3b2-e1ade8dc4817)
