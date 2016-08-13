import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

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
