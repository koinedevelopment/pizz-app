import { DataService } from './../../services/data-service';
import { FireService } from './../../services/fire-service';
import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  nome = "";
  email = "";
  senha = "";
  repetirSenha = "";
  erroRepetirSenha = false;

  form: FormGroup;
  submitAttempt: boolean = false;

  constructor(public nav: NavController, public data: DataService, public alertCtrl: AlertController,
              public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
        nome: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(60), Validators.required])],
        senha: ['', Validators.compose([Validators.maxLength(16), Validators.required])],
        repetirSenha: ['', Validators.compose([Validators.maxLength(16), Validators.required])]
    });
  }

  // register and go to home page
  register() {
    if(this.senha == this.repetirSenha){
      this.erroRepetirSenha = false;
      console.log(this.erroRepetirSenha);
      firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
        .then(result =>{
          result.sendEmailVerification();         
          this.data.createUser = true;   
          this.login();      
          result.updateProfile({
            displayName: this.nome
          }).then(function() {         
          }, function(error) {
          });        
        }, error => {
          if(error.message == 'Password should be at least 6 characters'){
            alert('A senha deve ter pelo menos 6 caracteres.'); 
          }
          else if(error.message == 'The email address is already in use by another account.'){
            alert('O endereço de email já está em uso por outra conta.'); 
          }
          else if(error.message == 'The email address is badly formatted.'){
            alert('Endereço de email está em um formato inválido.'); 
          }
          else{
            console.log('erro cadastro: '+error);     
          } 
        })
    }
    else{
      this.erroRepetirSenha = true;
      console.log(this.erroRepetirSenha);
    }
  }
  
  login() {
    this.nav.setRoot(LoginPage);
  }

  //refatorar depois
  showAlert(mensagem:string){
      let alert = this.alertCtrl.create({
          title: 'Dados inválidos:',
          subTitle: ''+mensagem,
          buttons: ['OK']
      });
      alert.present();
  }

  register2(){
 
    this.submitAttempt = true;
 
    if(!this.form.valid){
      console.log("error!")
    } 
    else {
        console.log("success!")
        console.log(this.form.value);
    }
  }
}
