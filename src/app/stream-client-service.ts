import { Injectable } from '@angular/core';
// import stream = require('getstream');
import * as stream from 'getstream';

import { StreamActivity } from './models/stream-activity';
const APP_TOKEN = 'ejafvxbtfbz6'; 
const APP_ID = '24870';
const FEED_GROUP = 'conversation';
const FEED_ID = 'conversation_9876'
const FEED_TOKEN = 'qkrJTwSrK9-a1ZSmiGVJniWeTtY'; 

// const APP_TOKEN ='v2xnbrp28uxd'; 
// const APP_ID =  '40556'; 
// const FEED_GROUP = 'user';
// const FEED_ID = 'rahul';
// const FEED_TOKEN = 'ztcjtkn8a37dyk46hg6v9btb3w8pxp3sjxhfbz5y9vjpdgens4fzd5ddcm8tyytq';

// const APP_TOKEN ='pvjukxquhwfy'; 
// const APP_ID =  '29337'; 
// const FEED_GROUP = 'framework_feeds';
// const FEED_ID = 'angular';
// const FEED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
//     'eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiJyZW' +
//     'FkIiwiZmVlZF9pZCI6ImZyYW1ld29ya19mZWVk' +
//     'c2FuZ3VsYXIifQ.vv0tJHc-B9ojS4CyN2tUxJZ' +
//     'yNdu58LtN_CsBXEHPwfc'

@Injectable()
export class StreamClientService {
  client: stream.Client;

  constructor() {
    // Instantiate a new client (client side)
    this.client = stream.connect(APP_TOKEN, null, APP_ID);
  }

  getFeed(params): Promise<StreamActivity[]> {
    // Instantiate the feed via factory method
    console.log('here in getFeed');
   const feed = this.client.feed(FEED_GROUP, FEED_ID,FEED_TOKEN);
    console.log(feed);

    // Fetch the feed and pick the results property off the response object
    return feed.get(params).then(response => response['results'])
  }

  addActivity(activity: StreamActivity): Promise<string> {
    // Instantiate the feed via factory method
    const feed = this.client.feed(FEED_GROUP, FEED_ID,FEED_TOKEN);
    const addActivityPromise = feed.addActivity(activity)
      .then(response => response['id']);

    // return the promise resolution
    return Promise.resolve(addActivityPromise);
  }

  updateActivity(activity){
    const feed = this.client.feed(FEED_GROUP, FEED_ID,FEED_TOKEN);
    // console.log(this.client.__proto__,feed);
    this.client.updateActivities(activity,function(){
      
    });
      // .then(response => response['id']);

    // return the promise resolution
    // return Promise.resolve(addActivityPromise);
  }
}