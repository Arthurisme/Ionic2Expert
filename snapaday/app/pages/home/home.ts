import {Component} from '@angular/core';
import {NavController, Modal, Alert, Platform} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {File} from 'ionic-native';
import {DaysAgo} from '../../pipes/days-ago';
import {Data} from '../../providers/data/data';
import {SimpleAlert} from '../../providers/simple-alert/simple-alert';
import {PhotoModel} from '../../providers/photo-model/photo-model';
import {SlideshowPage} from '../slideshow/slideshow';
import {SocialSharing} from 'ionic-native';

declare var cordova;

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [DaysAgo]
})
export class HomePage {

  loaded: boolean = false;
  photoTaken: boolean = false;
  photos: PhotoModel[] = [];

  constructor(public nav: NavController, public dataService: Data, public platform: Platform, public simpleAlert: SimpleAlert) {

    // Uncomment to use test data
    /*this.photos = [
     new PhotoModel('http://placehold.it/100x100', new Date()),
     new PhotoModel('http://placehold.it/100x100', new Date()),
     new PhotoModel('http://placehold.it/100x100', new Date())
     ];*/

    this.loadPhotos();

    document.addEventListener('resume', () => {

      if(this.photos.length > 0){

        let today = new Date();

        if(this.photos[0].date.getSeconds() === today.getSeconds()){
          // if(this.photos[0].date.setHours(0,0,0,0) === today.setHours(0,0,0,0)){
          this.photoTaken = true;
        } else {
          this.photoTaken = false;
        }
      }

    }, false);

  }

  loadPhotos(): void {


    this.dataService.getData().then((photos) =>{

      let savedPhotos: any = false;

      if (typeof(photos)!= 'undefined'){
        savedPhotos = JSON.parse(photos);
      }

      if(savedPhotos){

        savedPhotos.forEach(savedPhoto => {
          this.photos.push(new PhotoModel(savedPhoto.image, new Date(savedPhoto.date)));
        });
      }

      if(this.photos.length > 0){

        let today = new Date();

        if(this.photos[0].date.getMinutes() === today.getMinutes()){
          this.photoTaken = true;
        }
      }
        this.loaded=true;

    });




  }

  takePhoto(): any {

    if(!this.loaded || this.photoTaken){
      return false;
    }

    if(!this.platform.is('cordova')){
      console.log("You can only take photos on a device!");
      return false;
    }

    let options = {
      quality: 100,
      destinationType: 1, //return a path to the image on the device
      sourceType: 1, //use the camera to grab the image
      encodingType: 0, //return the image in jpeg format
      cameraDirection: 0, //front facing camera
      saveToPhotoAlbum: true //save a copy to the users photo album as well
    };

    Camera.getPicture(options).then(

      (imagePath) => {

        //Grab the file name
        let currentName = imagePath.replace(/^.*[\\\/]/, '');

        //Create a new file name
        let d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";

        if(this.platform.is('ios')){

          //Move the file to permanent storage
          File.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then((success) => {

            this.photoTaken = true;
            this.createPhoto(success.nativeURL);
            this.sharePhoto(success.nativeURL);

          }, (err) => {

            console.log(err);
            let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong.');
            this.nav.present(alert);

          });

        } else {
          this.photoTaken = true;
          this.createPhoto(imagePath);
          this.sharePhoto(imagePath);
        }

      },

      (err) => {
        let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong.');
        this.nav.present(alert);
      }
    );

  }

  createPhoto(photo): void {
    let newPhoto = new PhotoModel(photo, new Date());
    this.photos.unshift(newPhoto);
    this.save();
  }

  removePhoto(photo): void {

    let today = new Date();

    if(photo.date.setHours(0,0,0,0) === today.setHours(0,0,0,0)){
      this.photoTaken = false;
    }

    let index = this.photos.indexOf(photo);

    if(index > -1){
      this.photos.splice(index, 1);
      this.save();
    }

  }

  playSlideshow(): void {


    if(this.photos.length > 1){
      let modal = Modal.create(SlideshowPage,{photos: this.photos});
      this.nav.present(modal);
    }else{
      let alert = this.simpleAlert.createAlert('Oops!', 'You need at least two photos before you can play a slideshow.')
      this.nav.present(alert);
    }

  }

  sharePhoto(image): void {

    let alert = Alert.create({
      title: 'Nice one!',
      message: 'You\'ve taken your photo for today, would you also like to share it?',
      buttons:[
        {
          text:'No, Thanks'
        },
        {
          text:'Share',
          handler: () => {
            SocialSharing.share('I\'m taking a selfie every day with #Snapaday', null, image, null)
          }
        }
      ]
    });
    this.nav.present(alert);

  }

  save(): void {
    this.dataService.save(this.photos);
  }

}
