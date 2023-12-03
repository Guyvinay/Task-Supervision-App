import { Component, OnInit } from '@angular/core';
import { LoggedInProfile } from 'src/app/profile';
import { ProfileService } from 'src/app/profile.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  curentLoggedInPRofile:LoggedInProfile = {
    id: '',
    name: '',
    email: '',
    password: '',
    profile_picture: '',
    token: ''
  }

  message: string="";
  messages: any[] = [];

  chatMessages:any[]=[];

  constructor(
    private webSocketService : WebSocketService,
    private profileService : ProfileService,
  ){}

  ngOnInit(): void {

    const storedUserData = localStorage.getItem('loggedInUserData');

    if(storedUserData){
      this.curentLoggedInPRofile = JSON.parse(storedUserData);
    }else{
      this.curentLoggedInPRofile = this.profileService.getLoggedInProfile();
    }

    this.webSocketService.connect('vinay@gmail.com');

    this.webSocketService.getMessages().subscribe(
      (message) =>{
        this.messages.push(message);
        console.log(this.messages);
      } ,
      (error) => console.error(error),
      () => console.log('WebSocket closed')
    );

  }

  sendMessage(): void {
    this.webSocketService.sendMessage({ content: this.message});
    this.message = '';
  }


}
