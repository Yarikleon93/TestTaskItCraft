export interface Users {
    message: Array<{
      id:string;
      name:string;
      login:string;
      password:string;
      salt:string;
    }>
  }