import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


import {Storage, SqlStorage} from 'ionic-angular';




@Injectable()
export class Data {

  storage: Storage;

  constructor(){
    this.storage = new Storage(SqlStorage, {name:'photos'});
  }

  getData(): Promise<any> {
    return this.storage.get('photos');
  }

  save(data): void {
    let newData = JSON.stringify(data);
    this.storage.set('photos', newData);
  }

}
