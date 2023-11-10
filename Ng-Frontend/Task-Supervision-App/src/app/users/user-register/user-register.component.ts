import { Component } from '@angular/core';
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
  ){}

  registerProfile : RegisterProfile={
    name: '',
    email: '',
    password: '',
    profile_picture: ''
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
