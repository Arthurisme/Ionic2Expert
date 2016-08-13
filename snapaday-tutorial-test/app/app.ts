import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Data} from './providers/data/data';
import {SimpleAlert} from './providers/simple-alert/simple-alert';
import {LocalNotifications} from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {

      if(platform.is('cordova')){

        LocalNotifications.isScheduled(1).then( (scheduled) => {

          if(!scheduled){

            let firstNotificationTime = new Date();
            firstNotificationTime.setHours(firstNotificationTime.getHours()+24);

            LocalNotifications.schedule({
              id: 1,
              title: 'Snapaday',
              text: 'Have you taken your snap today?',
              at: firstNotificationTime,
              every: 'day'
            });

          }

        });

      }
      
    });
  }
}

ionicBootstrap(MyApp, [Data, SimpleAlert]);