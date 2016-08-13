import {NavController, Platform, AlertController} from 'ionic-angular';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {GoogleMaps} from '../../providers/google-maps/google-maps';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/location/location.html',
  providers: [GoogleMaps]
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;

  constructor(public nav: NavController, public maps: GoogleMaps, public platform: Platform,
              public dataService: Data,
              public alertCtrl: AlertController) {

  }

  // ngAfterViewInit(): void {
  //
  //   this.dataService.getLocation().then((location) => {
  //
  //     let savedLocation: any = false;
  //
  //     if(typeof(location) != "undefined"){
  //       savedLocation = JSON.parse(location);
  //     }
  //
  //     let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
  //
  //     if(savedLocation){
  //       this.latitude = savedLocation.latitude;
  //       this.longitude = savedLocation.longitude;
  //
  //       mapLoaded.subscribe(update => {
  //         this.maps.changeMarker(this.latitude, this.longitude)
  //       });
  //
  //     }
  //
  //   });
  //
  // }




  // setLocation(): void {
  //
  //   Geolocation.getCurrentPosition().then((position) => {
  //
  //     this.latitude = position.coords.latitude;
  //     this.longitude = position.coords.longitude;
  //
  //     this.maps.changeMarker(position.coords.latitude, position.coords.longitude);
  //
  //     let data = {
  //       latitude: this.latitude,
  //       longitude: this.longitude
  //     };
  //
  //     this.dataService.setLocation(data);
  //
  //     let alert = this.alertCtrl.create({
  //       title: 'Location set!',
  //       subTitle: 'You can now find your way back to your camp site from anywhere by clicking the button in the top right corner.',
  //       buttons: [{text: 'Ok'}]
  //     });
  //
  //     alert.present();
  //
  //   });
  //
  // }

  // takeMeHome(): void {
  //
  //   if(!this.latitude || !this.longitude){
  //
  //     let alert = this.alertCtrl.create({
  //       title: 'Nowhere to go!',
  //       subTitle: 'You need to set your camp location first. For now, want to launch Maps to find your own way home?',
  //       buttons: ['Ok']
  //     });
  //
  //     alert.present();
  //   }
  //   else {
  //
  //     let destination = this.latitude + ',' + this.longitude;
  //
  //     if(this.platform.is('ios')){
  //       window.open('maps://?q=' + destination, '_system');
  //     } else {
  //       let label = encodeURI('My Campsite');
  //       window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
  //     }
  //
  //   }
  //
  // }

}
