import {Component} from '@angular/core';
import {NavController,Modal,Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {FORM_DIRECTIVES,Control} from '@angular/common';
import {SettingsPage} from '../settings/settings';
import {Data} from '../../providers/data/data';
import {InAppBrowser} from 'ionic-native';
import   'rxjs/add/operator/map';
import   'rxjs/add/operator/debounceTime';
import   'rxjs/add/operator/distinctUntilChanged';



@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Data]
})
export class HomePage {

  settings: any;
  loading: boolean = false;
  posts: any = [];
  subreddit: string = 'gifs';
  page: number = 1;
  perPage: number = 15;
  after: string;
  stopIndex: number;
  sort: string = 'hot'
  moreCount: number = 0;
  subredditValue: string;

  subredditControl: Control;



  constructor(public http:Http, public dataService: Data,   private nav: NavController, public dataService:Data) {

    this.subredditControl = new Control();

    this.subredditControl.valueChanges.debounceTime(1500).distinctUntilChanged().subscribe(subreddit => {
      if(subreddit != '' && subreddit){
        this.subreddit = subreddit;
        console.log("test subreddit 1: " + subreddit )

        this.changeSubreddit();
      }
    });


    this.loadSettings();
  }


  fetchData(): void {

    //Build the URL that will be used to access the API based on the users current preferences
    let url = 'https://www.reddit.com/r/' + this.subreddit + '/' + this.sort + '/.json?limit=' + this.perPage;

    //If we aren't on the first page, we need to add the after parameter so that we only get new results
    //this parameter basically says "give me the posts that come AFTER this post"
    if (this.after) {
      url += '&after=' + this.after;
    }

    //We are now currently fetching data, so set the loading variable to true
    this.loading = true;

    //Make a Http request to the URL and subscribe to the response
    this.http.get(url).map(res => res.json()).subscribe(data => {

      let stopIndex = this.posts.length;
      this.posts = this.posts.concat(data.data.children);

      //Loop through all NEW posts that have been added. We are looping through
      //in reverse since we are removing some items.
      for (let i = this.posts.length - 1; i >= stopIndex; i--) {

        let post = this.posts[i];

        //Add a new property that will later be used to toggle a loading animation
        //for individual posts
        post.showLoader = false;

        //Add a NSFW thumbnail to NSFW posts
        if (post.data.thumbnail == 'nsfw') {
          this.posts[i].data.thumbnail = 'images/nsfw.png';
        }

        /*
         * Remove all posts that are not in the .gifv or .webm format and convert the ones that
         * are to .mp4 files.
         */
        if (post.data.url.indexOf('.gifv') > -1 || post.data.url.indexOf('.webm') > -1) {
          this.posts[i].data.url = post.data.url.replace('.gifv', '.mp4');
          this.posts[i].data.url = post.data.url.replace('.webm', '.mp4');

          //If a preview image is available, assign it to the post as 'snapshot'
          if (typeof(post.data.preview) != "undefined") {
            this.posts[i].data.snapshot = post.data.preview.images[0].source.url.replace(/&amp;/g, '&');

            console.log(this.posts[i].data.snapshot);

            //If the snapshot is undefined, change it to be blank so it doesnt use a broken image
            if (this.posts[i].data.snapshot == "undefined") {
              this.posts[i].data.snapshot = "";
            }
          }
          else {
            this.posts[i].data.snapshot = "";
          }
        }
        else {
          this.posts.splice(i, 1);
        }
      }

      //We are done loading now so change the loading variable back
      this.loading = false;

      //Keep fetching more GIFs if we didn't retrieve enough to fill a page
      //But give up after 20 tries if we still don't have enough
      if (data.data.children.length === 0 || this.moreCount > 20) {

        let alert = Alert.create({
          title: 'Oops!',
          subTitle: 'Having trouble finding GIFs - try another subreddit, sort order, or increase the page size in your settings.',
          buttons: ['Ok']
        });

        this.nav.present(alert);

        this.moreCount = 0;
      }
      else {
        this.after = data.data.children[data.data.children.length - 1].data.name;

        if (this.posts.length < this.perPage * this.page) {
          this.fetchData();
          this.moreCount++;
        }
        else {
          this.moreCount = 0;
        }
      }

    }, (err) => {
      //Fail silently, in this case the loading spinner will just continue to display
      console.log("subreddit doesn't exist!");
    });

  }


    loadSettings(): void{

      this.dataService.getData().then((settings) =>{
        if(typeof(settings) != "undefined" ){
          this.settings = JSON.parse(settings);

          if(this.settings.length != 0){
            this.sort = this.settings.sort;
            this.perPage = this.settings.perPage;
            this.subreddit = this.settings.subreddit;
          }
        }
        this.changeSubreddit();
      });
    }


  showComments(post): void{

    InAppBrowser.open('http://reddit.com' + post.data.permalink, '_system', 'location=yes');

  }


  openSettings(): void{

    let settingsModal = Modal.create(SettingsPage,{
      perPage: this.perPage,
      sort:this.sort,
      subreddit: this.subreddit
    });

    settingsModal.onDismiss(settings => {
      if(settings){
        this.perPage = settings.perPage;
        this.sort = settings.sort;
        this.subreddit = settings.subreddit;

        this.dataService.save(settings);

        this.changeSubreddit();
      }
    });
        this.nav.present(settingsModal);

  }


  playVideo(e, post): void {

    let video = e.target;

    post.loaderOffset = e.target.offsetTop + 20 + "px";

    if(video.paused){
      post.showLoader = true;
      video.play();

      video.addEventListener("playing", function(e){
        post.showLoader = false;
      });
    }else {
      video.pause();
    }

     }


  changeSubreddit(): void {

    this.page = 1;
    this.posts = [];
    this.after = null;
    this.fetchData();

  }


  loadMore(): void{

    this.page++;
    this.fetchData();
  }








}
