export interface ILoginParams {
    email: string
    password: string
  }
  
  export interface ILoginResult {
    status:boolean,
    token: string
  }
  