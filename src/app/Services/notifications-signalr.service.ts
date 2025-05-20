import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { RayahenService } from './rayahen.service';
import { UserData } from '../shared/userData';
import { General } from '../shared/general';

@Injectable({
  providedIn: 'root'
})
export class NotificationsSignalrService {

  constructor(
    private rayahenService: RayahenService,
    private usrData: UserData,
    private general: General
  ) {}
  private hubConnection!: signalR.HubConnection;

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://your-backend-url.com/') // Replace with Ticket URL
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then()
      .catch();
  }

  getNotification(){
    this.rayahenService.getNotification(this.usrData.userData.UserId).subscribe({
      next: (res) => {
        this.general.notifications = res.body;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addListener(): void {
    this.hubConnection.on('ReceiveMessage', () => {
     this.getNotification()
      // Trigger actions or update components
    });
  }
}


