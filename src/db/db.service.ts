import { Injectable } from '@nestjs/common';
import { Artist, Track, User } from 'src/types/types';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];

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
}
