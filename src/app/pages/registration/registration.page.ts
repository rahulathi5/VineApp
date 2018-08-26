import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { UserRegistrationService } from '../../registration-service';
import { Router } from '@angular/router';
declare var localStorage: any;

@Component({
	providers:[UserRegistrationService],
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public db: AngularFireDatabase,
    private userRegistrationService : UserRegistrationService,
    private storage: AngularFireStorage,
    private router: Router,
    ) { }
  userData;
  hasLocation;
  emailPattern;
  updatingImage;
  ngOnInit() {
    if(this.userRegistrationService.getUser()){

  	this.userData = this.userRegistrationService.getUser();
    this.userData.location='New York';
    }else{

    this.userData={
      name:'',
      email:'',
      phoneNumber:'',
      location:'New York',
      address:'',
      photoURL:''
    }
    }
  	console.log(this.userData);
    this.hasLocation = 'n/a';
    this.emailPattern=/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
  }

  completeRegistration(signupForm){
    console.log(this.userData,signupForm);
    if(!signupForm.valid){
      Object.keys(signupForm.controls).forEach(key =>{
        let errors = signupForm.controls[key].errors;
        console.log(errors);
        if(errors){
          signupForm.controls[key].markAsDirty();
        }
      });
    }else{
      if(this.userData.location){
        this.hasLocation = 'yes';
        var me=this;
        var ref = this.db.list("users/");
          console.log('ref',ref);
          ref.push(this.userData).then(function(res){
            console.log(res);
            me.db.object("users/"+res.key)
            .update({
              id:res.key
            })
              me.userData.id = res.key
              localStorage.removeItem('vineRegistrationData');
              localStorage.setItem('vineUserData',JSON.stringify(me.userData));
              me.router.navigateByUrl('/feed');
          })
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
    const filePath = file.name+'-dp';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
    console.log(uploadSnapshot);
      uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log(downloadURL);  
      this.userData.photoURL = downloadURL;
      this.updatingImage=false;      
    })
  })

  }

}
