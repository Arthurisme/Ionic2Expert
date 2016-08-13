import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Connectivity} from '../../providers/connectivity/connectivity';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';

/*
 Generated class for the GoogleMaps provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement:any;
  pleaseConnect:any;
  map:any;
  mapInitialised:boolean = false;
  mapLoaded:any;
  mapLoadedObserver:any;
  currentMarker:any;
  apiKey:string;

  constructor(public connectivityService:Connectivity) {

  }


  init(mapElement:any, pleaseConnect:any):any {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    this.mapLoaded = Observable.create(observer => {
      this.mapLoadedObserver = observer;
    });

    this.loadGoogleMaps();

    return this.mapLoaded;
  }

  loadGoogleMaps():void {

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps javaScript needs to be loaded.")
      this.disableMap();

      if (this.connectivityService.isOnline()) {

        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }
        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' +
            this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);
      }
    }

    else {
      if (this.connectivityService.isOnline()) {
        this.initMap();
        this.enableMap();
      }
      else {
        this.disableMap();
      }
    }

    this.addConnectivityListeners();

  }

  initMap():void {
  }

  disableMap():void {
  }

  enableMap():void {
  }

  addConnectivityListeners():void {

  }

  changeMarker(lat:number, lng:number):void {

  }


}

