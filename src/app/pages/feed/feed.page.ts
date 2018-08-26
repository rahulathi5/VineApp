import { Component, OnInit } from '@angular/core';

import { StreamClientService } from '../../stream-client-service';

import { StreamActivity } from '../../models/stream-activity';

import { Router } from '@angular/router';
declare var localStorage: any;
@Component({
	providers:[StreamClientService],
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
userData
 activities: StreamActivity[] = [];
newActivity:StreamActivity;
loadingActivity:Boolean;
  constructor(private streamClient: StreamClientService,
    private router: Router
    ) {

  }

  ngOnInit(){
    console.log('StreamFetchFeedComponent initializing...');   
    this.getCurrentUser();
    this.newActivity = new StreamActivity();
    this.newActivity.actor = this.userData.name;
    this.newActivity.object = '';
    this.newActivity.verb = 'message';
    this.newActivity.vineUserId = this.userData.id;
    this.newActivity.vineUserImage = this.userData.photoURL
    this.newActivity.like = 0;
    
    this.getFeed(); 
  }


  getFeed(): void {
      console.log('[method] getFeed called', this.streamClient);
      this.loadingActivity = true;
      this.streamClient.getFeed({}).then(activities => {
        this.activities = activities.filter(function(each){
          return each.vineUserId;
        })
        this.loadingActivity = false;
        console.log('Service promise resolved: ', this.activities);
      });
  }  

  addActivity() {
    console.log('[method] addActivity called', this.streamClient,this.newActivity);

    this.streamClient.addActivity(this.newActivity).then(activity_id => {
      console.log('Service promise resolved: ', activity_id);
      this.newActivity.object = '';
      this.getFeed(); 
    });
  }

  updateActivity(activity){
    activity.like = activity.like+1;
     this.streamClient.updateActivity([activity]);
  }


  getCurrentUser(){
    this.userData = JSON.parse(localStorage.getItem('vineUserData'));
    console.log('current user: ',this.userData);
  }

  visitProfile(activity){
    if(activity.vineUserId===this.userData.id){
      this.router.navigateByUrl('my-profile');
    }else{      
      this.router.navigateByUrl('/others-profile/'+activity.vineUserId);
    }
  }

}
