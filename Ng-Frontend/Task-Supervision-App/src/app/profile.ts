export interface Profile {

}
export interface LoginCreds {
    username:'',
    password:''
}

export interface RegisterProfile {
    name:'',
    email:'',
    password:'',
    profile_picture:'',
}

export interface LoggedInProfile {
    id:'',
    name:'',
    email:'',
    password:'',
    profile_picture:'',
    token:'',
}
