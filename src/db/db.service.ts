import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from 'src/types/interfaces';
import { Album, Artist, Favorites, Track, User } from 'src/types/types';
import { deleteMusic } from 'src/utils/deleteMusic';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const userId = this.users.findIndex((user) => user.id === id);
    return this.users[userId];
  }

  addNewUser(newUser: User): void {
    this.users.push(newUser);
  }

  deleteUser(id: string): void {
    const idUser = this.users.findIndex((user) => user.id === id);
    this.users.splice(idUser, 1);
  }

  updateUserPassword(userData: User, id: string): void {
    const idUser = this.users.findIndex((user) => user.id === id);
    this.users[idUser] = userData;
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
    const trackId = this.tracks.findIndex((track) => track.id === id);
    return this.tracks[trackId];
  }

  addNewTrack(newTrack: Track): void {
    this.tracks.push(newTrack);
  }

  deleteTrack(id: string): void {
    const trackId = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(trackId, 1);
  }

  updateTrack(trackData: Track, id: string): void {
    const trackId = this.tracks.findIndex((track) => track.id === id);
    this.tracks[trackId] = trackData;
  }

  getArtists(): Artist[] {
    return this.artists;
  }

  getArtist(id: string): Artist {
    const artistId = this.artists.findIndex((artist) => artist.id === id);
    return this.artists[artistId];
  }

  addNewArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }

  deleteArtist(id: string): void {
    const artistId = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistId, 1);

    deleteMusic(this.tracks, id);
    deleteMusic(this.albums, id);
  }

  updateArtist(artistData: Artist, id: string): void {
    const artistId = this.artists.findIndex((artist) => artist.id === id);
    this.artists[artistId] = artistData;
  }

  getAlbums(): Album[] {
    return this.albums;
  }

  getAlbum(id: string): Album {
    const albumId = this.albums.findIndex((album) => album.id === id);
    return this.albums[albumId];
  }

  addNewAlbum(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }

  deleteAlbum(id: string): void {
    const albumId = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(albumId, 1);

    deleteMusic(this.tracks, id);
  }

  updateAlbum(albumData: Album, id: string) {
    const albumId = this.albums.findIndex((album) => album.id === id);
    this.albums[albumId] = albumData;
  }

  getFavs() {
    const allFavs: FavoritesResponse = { artists: [], tracks: [], albums: [] };

    allFavs.artists = this.artists.filter((elem) =>
      this.favorites.artists.includes(elem.id),
    );
    allFavs.tracks = this.tracks.filter((elem) =>
      this.favorites.tracks.includes(elem.id),
    );
    allFavs.albums = this.albums.filter((elem) =>
      this.favorites.albums.includes(elem.id),
    );

    return allFavs;
  }

  addToFavs(id: string, data: string): void {
    this.favorites[data].push(id);
  }

  deleteFromFavs(id: string, data: string): void {
    const favsId = this.favorites[data].findIndex((elem) => elem.id === id);
    this.favorites[data].splice(favsId, 1);
  }
}
