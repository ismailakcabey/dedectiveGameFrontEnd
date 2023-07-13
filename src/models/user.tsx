export interface IUser{
createdAt: Date;
updatedAt: Date;
    id:number;
    userName:string;
    email:string;
    password:string;
    phoneNumber:string;
    birthDate:Date;
    isVerify:boolean;
    role:Role
}

export interface IUserParams{
        userName: string,
        email: string,
        password: string,
        phoneNumber: string,
        birthDate: string,
        role: string
}

  

export enum Role{
    ADMIN = "admin",
    USER = "user",
}