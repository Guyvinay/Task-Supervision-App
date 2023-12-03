import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private profileService: ProfileService){
    profileService.getAllProfiles()
                  .subscribe(
                    (response)=>{
                      // console.log(response);
                      this.allAvailableUsers = response.users;
                      console.log(this.allAvailableUsers);
                    },
                    (error)=>{

                    }
                  )
  }

  allAvailableUsers: any[]=[];




}
