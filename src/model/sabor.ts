export class Sabor{
    constructor(public descricao?:string, public tipo?:string, public disponivel?:string, 
                public ingredientes?:Array<string>, public imageURL?:string){ 
        descricao = "";
        tipo = "";
        disponivel = "";
        ingredientes = [];
        imageURL = "";
    }
    
}