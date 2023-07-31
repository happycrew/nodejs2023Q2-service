import { Album, Track } from 'src/types/types';

export const deleteMusic = (data: Track[] | Album[], id: string) => {
  data.forEach((element) => {
    if (element.artistId === id) element.artistId = null;
  });

  data.forEach((element) => {
    if (element.albumId === id) element.albumId = null;
  });
};
