export interface IMessage{
    createdAt:string,
    updatedAt:string,
    id:string;
    receiver:string;
    sender:string;
    messages:[
        {
            person:string,
            text:string
        }
    ]
}

export interface IMessageDto{
    receiver:string;
    sender:string;
    messages:[
        {
            person:string,
            text:string
        }
    ]
}

export interface IMessageResponse{
    data:IMessage[];
    count:number;
}