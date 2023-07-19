export interface IExpression{
    createdAt:string,
    updatedAt:string,
    id:string;
    declaration:string;
    expressionDate:string;
    fatherName:string;
    guilty:boolean;
    identityNumber:string;
    imageUrl:string;
    learnStatus:string;
    martialStatus:string;
    motherName:string;
    personName:string;
    phoneNumber:string;
    place:string;
    placeOfBirth:string;
    text:string;
}

export interface IExpressionDto{
    declaration:string;
    expressionDate:string;
    fatherName:string;
    guilty:boolean;
    identityNumber:string;
    imageBase64:string;
    learnStatus:string;
    martialStatus:string;
    motherName:string;
    personName:string;
    phoneNumber:string;
    place:string;
    placeOfBirth:string;
    text:string;
}

export interface IExpressionResponse{
    data:IExpression[];
    count:number
}