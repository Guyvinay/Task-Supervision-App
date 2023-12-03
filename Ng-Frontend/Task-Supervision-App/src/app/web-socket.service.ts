import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$ !: WebSocketSubject<any>;
  constructor() { }

  connect(email: string): void {
    // Update the URL with your WebSocket server endpoint
    // const url = `ws://localhost:8888/chat/${email}`;
    const url = `wss://task-supervision-app.onrender.com/chat/${email}`;
    this.socket$ = webSocket(url);
  }

  sendMessage(message: any): void {
    console.log(message)
    this.socket$.next(message);
  }

  getMessages() {
    return this.socket$;
  }

  closeConnection(): void {
    this.socket$.complete(); // Close the WebSocket connection
  }


}
