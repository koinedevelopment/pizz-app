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
    constructor(public events: Events, public af: AngularFire){}
    
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

    logout():firebase.Promise<any> {
        localForage.setItem('qrcode', "").then(result => {
        }, error => {
        })
        return firebase.auth().signOut();
    }
}