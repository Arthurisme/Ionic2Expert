import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Alert} from 'ionic-angular';

/*
  Generated class for the SimpleAlert provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SimpleAlert {

  createAlert(title: string, message: string): Alert{
    return Alert.create({
      title: title,
      message:message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

  }


}

