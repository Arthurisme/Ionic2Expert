import {Injectable} from '@angular/core';
import {Alert} from 'ionic-angular';

@Injectable()
export class SimpleAlert {

  createAlert(title: string, message: string): Alert {
    return Alert.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
  }

}