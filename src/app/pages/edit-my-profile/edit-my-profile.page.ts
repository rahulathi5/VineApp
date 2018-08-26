import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { UserRegistrationService } from '../../registration-service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { AlertController } from 'ionic-angular';
@Component({
	providers:[UserRegistrationService],
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.page.html',
  styleUrls: ['./edit-my-profile.page.scss'],
})
export class EditMyProfilePage implements OnInit {
	userData;
  hasLocation;
  emailPattern;
  updatingImage;
  showMsg;
  toast;
  toastElem;
  constructor(
  	private userRegistrationService : UserRegistrationService,
    private router: Router,
    public db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private alertCtrl: AlertController
  	) { }

   ngOnInit() {    
   	this.hasLocation = 'n/a';
    this.emailPattern=/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
  	this.userData = JSON.parse(localStorage.getItem('vineUserData'));    
  	console.log(this.userData);    
  }

    updateProfile(editProfileForm){
      console.log(this.userData,editProfileForm);
      if(!editProfileForm.valid){
        Object.keys(editProfileForm.controls).forEach(key =>{
          let errors = editProfileForm.controls[key].errors;
          console.log(errors);
          if(errors){
            editProfileForm.controls[key].markAsDirty();
          }
        });
      }else{
        if(this.userData.location){
          this.hasLocation = 'yes';
          var ref = this.db.object("users/"+this.userData.id);
          ref.update(this.userData);              
          localStorage.setItem('vineUserData',JSON.stringify(this.userData));  
          this.presentToast() ;  
        }else{
          this.hasLocation = 'no';
        } 
      }    
  }

  locationChange(){
    console.log('here');
    this.hasLocation = 'yes';
  }

  changeProfilePhoto(event){
    this.updatingImage=true;
    const file = event.target.files[0];
    const filePath = this.userData.id+'-dp';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
    console.log(uploadSnapshot);
      uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log(downloadURL);  
      this.userData.photoURL = downloadURL;
      var ref = this.db.object("users/"+this.userData.id);
        ref.update(this.userData);              
        localStorage.setItem('vineUserData',JSON.stringify(this.userData));        
      this.updatingImage=false;
    //       this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
    })
  })
}

  presentToast() {
    let me =this;
    this.alertCtrl.create({
    message: 'Profile updated successfully.',
    buttons: [{
      text:'OK',
       handler: () => {
          console.log('Cancel clicked');
          me.toastElem.style.display ='none';
        }
    }],
    cssClass: 'alertDanger',
    // duration: 1800
  }).then(function(res){
    me.toastElem = res;
    console.log(res.children[0].className);
     me.toastElem.children[0].style.opacity = 0.875;
     me.toastElem.children[1].style.opacity = 1;
    // setTimeout(() => { 
    //   res.style.display ='none';
    //   res.children[0].style.opacity = 0;
    //   res.children[1].style.opacity = 0;
    //   }, 2000);
  })
  // .present();
  // this.showMsg = true;
  // var me=this; setTimeout(() => { me.showMsg = false;  }, 2500);
}


}




