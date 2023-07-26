export type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

export type Artist = {
  id: string;
  name: string;
  grammy: boolean;
};

export type Track = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

export type Album = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

export type Favorites = {
  artists: string[];
  albums: string[];
  tracks: string[];
};
