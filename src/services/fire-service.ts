import { DataService } from './data-service';
import { LoginPage } from './../pages/login/login';
import { Injectable } from "@angular/core";
import { Events, AlertController } from 'ionic-angular';
import { GooglePlus, Facebook } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import localForage from "localforage";
import * as firebase from 'firebase';

@Injectable()
export class FireService {
    user: any;
    constructor(public events: Events, public af: AngularFire, public alertCtrl: AlertController,
                public data: DataService){}
    
    getUser():any{
        return this.user;
    }
    
    loginWithFacebook(){
        Facebook.login(['user_friends', 'public_profile', 'email'])
        .then(userFacebook => {
            let userFire = firebase.auth().currentUser;
            if(userFire){
                alert('Usuário já está logado como '+userFire.displayName); 
                this.events.publish('login-event', userFire);                                       
            }
            else{
                console.log('Fazendo Login...');
                let credential = firebase.auth.FacebookAuthProvider.credential(userFacebook.authResponse.accessToken);
                firebase.auth().signInWithCredential(credential).then(userFire =>{
                    this.events.publish('login-event', firebase.auth().currentUser);
                }, error =>{
                    if(error['code'] == 'auth/account-exists-with-different-credential'){
                        let pendingCred = error['credential'];
                        let email = error['email'];
                        firebase.auth().fetchProvidersForEmail(email).then(providers => {
                            GooglePlus.login({'webClientId': '229381592184-qa2h78jodk2ecm7e9k2qjv3lp9sifkk3.apps.googleusercontent.com'})
                            .then(userGoogle => {
                                let credential = firebase.auth.GoogleAuthProvider.credential(userGoogle.idToken);
                                firebase.auth().signInWithCredential(credential).then(usuarioLogado => {
                                    firebase.auth().currentUser.link(pendingCred).then(userLink =>{
                                        firebase.auth().signInWithCredential(pendingCred).then(user => {
                                            console.log("Sign In Success", user);
                                        }, erro => {
                                            console.log("Sign In Error", erro);
                                        });
                                        console.log('Account linking success');
                                        this.events.publish('login-event',firebase.auth().currentUser);
                                    }, function(error) {
                                        console.log("Account linking error", error);
                                    });;
                                }, error => {
                                    console.log('signInWithCredential google: '+error);
                                });
                            }, error =>{
                                console.log('getUserIdToken: '+error);
                            });
                        }, error => {
                            console.log('fetchProvidersForEmail: '+error);
                        });
                    }
                    console.log(error);
                });
            }  
        }, error => {
            console.log(error);
        });
    }

    loginWithGoogle(){  
        GooglePlus.login({'webClientId': '229381592184-qa2h78jodk2ecm7e9k2qjv3lp9sifkk3.apps.googleusercontent.com'})
        .then(userGoogle => {
            let userFire = firebase.auth().currentUser;
            if(userFire){
                alert('Usuário já está logado como '+userFire.displayName); 
                this.events.publish('login-event', userFire);                                       
            }
            else{
                console.log('Fazendo Login...');
                let credential = firebase.auth.GoogleAuthProvider.credential(userGoogle.idToken);
                firebase.auth().signInWithCredential(credential).then(userFire =>{
                    this.events.publish('login-event', firebase.auth().currentUser);
                }, error =>{
                    if(error['code'] == 'auth/account-exists-with-different-credential'){
                        let pendingCred = error['credential'];
                        let email = error['email'];
                        firebase.auth().fetchProvidersForEmail(email).then(providers => {
                            Facebook.login(['user_friends', 'public_profile', 'email'])
                            .then(userFacebook => {
                                let credential = firebase.auth.FacebookAuthProvider.credential(userFacebook.authResponse.accessToken);
                                firebase.auth().signInWithCredential(credential).then(usuarioLogado => {
                                    firebase.auth().currentUser.link(pendingCred).then(function(user) {
                                        firebase.auth().signInWithCredential(pendingCred).then(user => {
                                            console.log("Sign In Success", user);
                                        }, erro => {
                                            console.log("Sign In Error", erro);
                                        });
                                        console.log("Account linking success", user);
                                        this.events.publish('login-event',firebase.auth().currentUser);
                                    }, function(error) {
                                        console.log("Account linking error", error);
                                    });
                                }, error => {
                                    console.log('signInWithCredential facebook: '+error);
                                });
                            }, error => {
                                console.log('Facebook.login: '+error);
                            });
                        }, error => {
                            console.log('fetchProvidersForEmail: '+error);
                        });
                    } 
                    console.log(error);
                });
            }       
        }, error =>{
            console.log(error);
        });   
    }

    loginWithEmailAndPassword(email:string, senha){
        firebase.auth().signInWithEmailAndPassword(email, senha).then(result =>{
        }, error =>{
            if(error.message == "The password is invalid or the user does not have a password."){
                //this.events.publish('login-erro', "A senha é inválida ou o usuário não possui senha cadastrada.");
                this.showAlert('A senha é inválida ou o usuário não possui senha cadastrada.');
            }
            else if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
                //this.events.publish('login-erro', "Nenhum usuário encontrado com este endereço de email.");
                this.showAlert('Não há registro de usuário correspondente a esse endereço de email.');
            }
            else if(error.message == "We have blocked all requests from this device due to unusual activity. Try again later."){
                //this.events.publish('login-erro', "Nenhum usuário encontrado com este endereço de email.");
                this.showAlert('Bloqueamos todas as requisições deste dispositivo devido a uma atividade incomum. Tente mais tarde.');
            }
            else{
                //this.events.publish('login-erro', ""+error.message);
                this.showAlert(error.message);
            }
        })        
    }

    logout():firebase.Promise<any> {
        localForage.setItem('qrcode', "").then(result => {
        }, error => {
        })
        return firebase.auth().signOut();
    }

    //refatorar depois
    showAlert(mensagem:string){
        let alert = this.alertCtrl.create({
            title: 'Erro de autenticação',
            subTitle: ''+mensagem,
            buttons: ['OK']
        });
        alert.present();
    }
}