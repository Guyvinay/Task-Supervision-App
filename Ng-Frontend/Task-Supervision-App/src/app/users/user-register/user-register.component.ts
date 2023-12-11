import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { RegisterProfile } from 'src/app/profile';
import { ProfileService } from 'src/app/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {


  constructor(
    private profileService: ProfileService,
    private router : Router,
    private fireStorage:AngularFireStorage
  ){}

  registerProfile : RegisterProfile={
    name: '',
    email: '',
    password: '',
    profile_picture: ''
  }
  profile_pic:string='';

  async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `yt/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      this.registerProfile.profile_picture = url;
    }
  }

  onSubmitRegisterUser(){
    this.profileService.registerProfile(this.registerProfile)
                          .subscribe(
                            (response)=>{
                              console.log(response);
                              setTimeout(()=>{
                                this.router.navigate(['/login']);
                              },3500);
                              Swal.fire({
                                icon: 'success', // Set the alert icon (success, error, warning, info, etc.)
                                title: 'Registration Success!',
                                text: 'Successfully Registered, Now You can Login',
                                showConfirmButton: false, // Automatically close the alert after a short delay
                                timer: 2500, // Adjust the duration (in milliseconds) for the alert to disappear
                              });
                            },
                            (error)=>{
                              console.log(error);
                              Swal.fire({
                                icon: 'error', // Set the alert icon (success, error, warning, info, etc.)
                                title: 'Registration Failed',
                                text: 'Registration Failed, Try Again!',
                                showConfirmButton: false, // Automatically close the alert after a short delay
                                timer: 1500, // Adjust the duration (in milliseconds) for the alert to disappear
                              });
                            }
                          )

  }

}
