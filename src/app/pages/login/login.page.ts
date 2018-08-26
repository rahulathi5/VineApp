import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';

import { Router } from '@angular/router';

import { UserRegistrationService } from '../../registration-service';
import { AlertController } from '@ionic/angular';

@Component({
  providers:[UserRegistrationService],
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	provider;
	users=[];
  errorMessage;
  toastElem;
  constructor(public db: AngularFireDatabase,
   public auth:AngularFireAuthModule,
   private router: Router,
    private storage: AngularFireStorage,
    private userRegistrationService :UserRegistrationService,
     private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    console.log('in login page');
  	this.getAllUsers();
  }


  getAllUsers(){
    console.log('here in getAll')
    let me =this;
    me.users=[];
    var ref = this.db.list("users");                   
    ref.snapshotChanges()
    .forEach(function(changes){         
      changes.map(function(each){
        me.users.push(each.payload.val());
        console.log(me.users);
      })
    })
  }

  signup(logintype){
  	console.log('here');
    if(logintype===1){
      this.provider = new firebase.auth.FacebookAuthProvider();
    }else if(logintype===2){
      this.provider = new firebase.auth.GoogleAuthProvider();
    }else if(logintype===3){
      this.provider = new firebase.auth.TwitterAuthProvider();
    }
    let me =this;
    console.log('here now');
  	firebase.auth().signInWithPopup(this.provider).then(function(result) {
	  // The signed-in user info.
     console.log(result);
	  var user = result.user;
      console.log(user);

    if(!me.users.length){
      //no user go to signup 
	    console.log(user);
      
      me.userRegistrationService.setUser({
       name: user.displayName,
       email:user.email,
       phoneNumber:user.phoneNumber,
       photoURL:user.photoURL,
       logintype:logintype  ,
       location:'',
       address:''     
      });
      me.router.navigateByUrl('/registration');
    }else{
      console.log(me.users);
      if(me.users.filter(function(each){
        return each.email===user.email;
      }).length){
        console.log('already registered',me.users);
        me.users.forEach(function(each){
          if(each.email===user.email){
            localStorage.setItem('vineUserData',JSON.stringify(each));
          }
        })
        me.router.navigateByUrl('/feed');
      }else{
        console.log('go to signup');
        me.userRegistrationService.setUser({
       name: user.displayName,
       email:user.email,
       phoneNumber:user.phoneNumber,
       photoURL:user.photoURL,
       logintype:logintype   ,
       location:'',
       address:''      
      });
        me.router.navigateByUrl('/registration');
        //go tosignup
      }            
    }
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.

    console.log(error); 
	  var errorCode = error.code;
	  me.errorMessage = error.message;
    me.presentToast(me.errorMessage);
	});
  }

  presentToast(message){
    var me=this;
    this.alertCtrl.create({
    message: message,
    buttons: [{
      text:'Ok',
      handler: () => {
        // console.log('no clicked');
        me.toastElem.style.display='none';
      }   
    }
    ],
    cssClass: 'alertDanger',
    // duration: 1800
  }).then(function(res){
      console.log(res.children);
       me.toastElem = res;
      me.toastElem.children[0].style.opacity = 0.875;
      me.toastElem.children[1].style.opacity = 1;      
    })
  }

}
