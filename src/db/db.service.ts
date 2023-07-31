import { Injectable } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/types/types';
import { deleteMusic } from 'src/utils/deleteMusic';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];

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
}
