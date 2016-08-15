import {Injectable} from '@angular/core';
import {Connectivity} from '../../providers/connectivity/connectivity';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  // browser key:
  // apiKey: string = 'AIzaSyAGeI1KbDtd5ipMxo0xJuzQNdhTviZ0iqw';
  //ios key:
  apiKey: string = 'AIzaSyDzguSKcBYG4DzhjNbLwzzK6vFw_fJURS0';

  constructor(public connectivityService: Connectivity) {

  }

  init(mapElement: any, pleaseConnect: any): any {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    this.mapLoaded = Observable.create(observer => {
      this.mapLoadedObserver = observer;
    });

    this.loadGoogleMaps();

    return this.mapLoaded;

  }

  loadGoogleMaps(): void {

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivityService.isOnline()){

        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    }
    else {

      if(this.connectivityService.isOnline()){
        this.initMap();
        this.enableMap();
      }
      else {
        this.disableMap();
      }

    }

    this.addConnectivityListeners();

  }

  initMap(): void {

    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement, mapOptions);
      this.mapLoadedObserver.next(true);

    });

  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  changeMarker(lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    if(this.currentMarker){
      this.currentMarker.setMap(null);
    }

    this.currentMarker = marker;

  }

}
