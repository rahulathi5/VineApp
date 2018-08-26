import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import { StreamClientService } from '../../stream-client-service';

import { StreamActivity } from '../../models/stream-activity';

@Component({
	providers:[StreamClientService],
  selector: 'app-others-profile',
  templateUrl: './others-profile.page.html',
  styleUrls: ['./others-profile.page.scss'],
})
export class OthersProfilePage implements OnInit {

  	userId;
  	profileData;
  	loadingActivity;
    loadingProfile;
  	activities: StreamActivity[] = [];
  constructor(private route: ActivatedRoute,
  public db: AngularFireDatabase,
  private streamClient: StreamClientService
   ) { }

  ngOnInit() {
  	let self = this;
     this.route.params.forEach(function(param:any){
        self.userId = param['id'];
     });
     this.userId = self.userId;
     this.getUserProfile();
     this.getFeed()
  }


  getUserProfile(){    
  	var me = this;
    me.loadingProfile = true;
    var ref = this.db.object("users/"+this.userId);           
    console.log(ref);        
    ref.snapshotChanges()
    .forEach(function(changes){   
    	me.profileData = changes.payload.val();
      me.loadingProfile = false;
    })
  }

  getFeed(): void {
  	var me=this
      console.log('[method] getFeed called', this.streamClient);
      this.loadingActivity = true;
      this.streamClient.getFeed({}).then(activities => {
      	console.log(activities);
        this.activities = activities.filter(function(each){
          return each.vineUserId === me.userId;
        })
        this.loadingActivity = false;
        console.log('Service promise resolved: ', this.activities);
      });
  }  

}
