import { Artist, Album, Track } from './types';

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface CreateTrackDto {
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
}

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface CreateAlbumDto {
  year: number;
  name: string;
  artistId: string | null;
}
