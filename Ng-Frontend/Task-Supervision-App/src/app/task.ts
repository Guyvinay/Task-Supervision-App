
export interface Task {
    id: number;
    taskTitle: string;
    taskDesc: string;
    status: string;
    createdAt:string
  }
  
  export interface ReqTask {
    taskTitle: string;
    taskDesc: string;
    status: string;
    profileId:string;
  }