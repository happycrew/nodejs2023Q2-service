import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export type User = InMemoryDBEntity & {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

export type Artist = InMemoryDBEntity & {
  id: string;
  name: string;
  grammy: boolean;
};

export type Track = InMemoryDBEntity & {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

export type Album = InMemoryDBEntity & {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

export type Favorites = InMemoryDBEntity & {
  artists: string[];
  albums: string[];
  tracks: string[];
};
