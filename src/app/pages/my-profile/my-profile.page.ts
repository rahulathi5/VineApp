import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../../registration-service';
import { Router } from '@angular/router';

@Component({
	providers:[UserRegistrationService],
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
	userData;
  constructor(
  	private userRegistrationService : UserRegistrationService,
    private router: Router,
  	) {
    // console.log(this.userData);
     }

   ngOnInit() {
  	this.userData = JSON.parse(localStorage.getItem('vineUserData'));
  	console.log(this.userData);    
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('vineUserData'));
    console.log(this.userData);  
  }

}
