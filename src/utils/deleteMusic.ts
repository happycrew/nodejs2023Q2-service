import { Track } from 'src/types/types';

export const deleteMusic = (data: Track[], id: string) => {
  data.forEach((element) => {
    if (element.artistId === id) element.artistId = null;
  });
};
