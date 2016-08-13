import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController,NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the SlideshowPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/slideshow/slideshow.html',
})
export class SlideshowPage {

  @ViewChild('imagePlayer') imagePlayer: ElementRef;

  imagePlayerInterval: any;
  photos: any;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
      this.photos=this.navParams.get ('photos');
  }

  ngAfterViewInit(){
    this.playPhotos();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  playPhotos(){
    let imagePlayer = this.imagePlayer.nativeElement;
    let i = 0;

    clearInterval(this.imagePlayerInterval);

    this.imagePlayerInterval = setInterval(() => {
      if(i<this.photos.length){
        imagePlayer.src = this.photos[i].image;
        i++;
      }
      else{
        clearInterval(this.imagePlayerInterval);
      }
    }, 500);
  }

}
