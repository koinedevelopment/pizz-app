import { Sabor } from './../model/sabor';
import { Injectable } from "@angular/core"

@Injectable()
export class DataService {
    sabor: Sabor = new Sabor();
    teste;
    constructor() {        
    }
}