export class User{
    constructor(public displayName?:string, public photoURL?:string, public email? :string,
                public telefone?:string){ 
                    this.telefone = "";
                }
    
}