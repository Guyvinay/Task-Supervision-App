import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInProfile, LoginCreds, RegisterProfile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {



  // private baseUrl = 'http://localhost:8888/api/profile';
  private baseUrl = 'https://task-supervision-app.onrender.com/api/profile';


  currentLoggedInProfile!: LoggedInProfile;

  isDashboardDataShown = true;

  constructor(private http : HttpClient) { }



  loginUser(loginCreds:LoginCreds) : Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const loginData = {
      username:loginCreds.username,
      password:loginCreds.password
    }

    return this.http.post<any>(this.baseUrl+"/postSignIn" , loginData,httpOptions);

  }


  registerProfile(profileData: RegisterProfile): Observable<any> {
    const registerData = {
      name: profileData.name,
      email: profileData.email,
      password: profileData.password,
      role: "admin",
      profilePic: profileData.profile_picture
    };
    return this.http.post<any>(this.baseUrl+"/createProfile",registerData);
  }


  setLoggedInProfile(loggedProfile:LoggedInProfile){
    this.currentLoggedInProfile=loggedProfile;
  }

  getLoggedInProfile(){
    return this.currentLoggedInProfile;
  }



  ngOnInit(): void {

  }


}
