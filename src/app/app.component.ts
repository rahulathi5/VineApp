import { Component } from '@angular/core';

import { Platform,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Feed',
      url: '/feed',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/my-profile',
      icon: 'contact'
    }
  ];
  toastElem;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){

    localStorage.removeItem('vineUserData');
    this.router.navigateByUrl('/login');
    
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  presentToast() {
    this.menuCtrl.close();
    var me=this;
    this.alertCtrl.create({
    message: 'Are you sure you want to log out?',
    buttons: [{
      text:'No',
      handler: () => {
        // console.log('no clicked');
        me.hideToast();
      }   
    },{
      text:'Yes',
      handler: () => {
        // console.log('yes clicked');
        me.logout();
        me.hideToast();
        }        
      },
    ],
    cssClass: 'alertDanger',
  }).then(function(res){
      console.log(res.children);
       me.toastElem = res;
      me.toastElem.children[0].style.opacity = 0.875;
      me.toastElem.children[1].style.opacity = 1;      
    })
  }

  hideToast(){
    this.toastElem.style.display='none';    
  }
}
