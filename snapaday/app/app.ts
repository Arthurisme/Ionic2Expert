import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar,LocalNotifications} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Data} from './providers/data/data';
import {SimpleAlert} from './providers/simple-alert/simple-alert'


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      if(platform.is('cordova')){
        LocalNotifications.isScheduled(1).then((scheduled) =>{
          if(!scheduled){
            let firstNotificationTime =new Date();
            firstNotificationTime.setMinutes(firstNotificationTime.getMinutes()+1);

            LocalNotifications.schedule({
              id: 1,
              title: 'Snapaday',
              text: 'Have you taken your sanp today?',
              at: firstNotificationTime,
              every:'hour'
            });
          }
        });
      }

    });
  }
}

ionicBootstrap(MyApp, [Data, SimpleAlert]);
