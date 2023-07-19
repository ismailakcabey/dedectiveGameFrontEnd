export interface IClue{
    createdAt:string,
    updatedAt:string,
    id:string;
    imageUrl:string;
    text:string;
    name:string;
}

export interface IClueDto{
    name?:string;
    text?:string;
    imageBase64Url?:string;
    event?:number;
}

export interface IClueResponse{
    data:IClue[];
    count:number;
}