import AsyncStorage from '@react-native-async-storage/async-storage';

const FormatMusic = (music) => {
  return {
    track : {
      id: music.track.id,
      name : music.track.name,
      album : {
        images: music.track.album.images,
      },
      artists: music.track.artists,
      preview_url: music.track.preview_url,
    }
  };
};

export const LikeMusic = async (music) => {
  music = FormatMusic(music);
  let newList = [];

  try {
    const list = await AsyncStorage.getItem("list");

    if (list) {
      newList = [...JSON.parse(list), music];

    } else {
      newList = [music];
    }

    await AsyncStorage.setItem("list", JSON.stringify(newList));

  } catch (error) {
    console.error('Erro ao adicionar música:', error);
  }
};

export const DeslikeMusic = async (music) => {
  music = FormatMusic(music);

  try {
    const list = JSON.parse(await AsyncStorage.getItem("list"));

    if (list) {
      const newList = list.filter(item => item.track.id !== music.track.id);

      await AsyncStorage.setItem("list", JSON.stringify(newList));
    }

  } catch (error) {
    console.error('Erro ao remover música:', error);
  }
};

export const CheckMusic = async (music) => {
  music = FormatMusic(music);
  // await AsyncStorage.removeItem("list")
  
  try {
    const list = await AsyncStorage.getItem("list");
    if (list) {
      return JSON.parse(list).some(item => item.track.id === music.track.id);
    }

    return false;

  } catch (error) {
    console.error('Erro ao verificar música:', error);
    return false;
  }
};