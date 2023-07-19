
export interface ICard{
    createdAt:string,
    updatedAt:string,
    id:string;
    payer:string;
    price:string;
    product:string;
}

export interface ICardDto{
    payer:string;
    price:number;
    product:string;
}

export interface ICardResponse{
    data:ICard;
    counter:number;
}