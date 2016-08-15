import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


import {Storage, SqlStorage} from 'ionic-angular';




@Injectable()
export class Data {

  storage: Storage;

  constructor(){
    this.storage = new Storage(SqlStorage, {name:'campermate'});
  }

  setMyDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('mydetails', newData);
  }



  setCampDetails(data: Object): void {
    let newData = JSON.stringify(data); this.storage.set('campdetails', newData);
  }


  setLocation(data: Object) : void {
    let newData = JSON.stringify(data);
    this.storage.set('location', newData);
  }

  getMyDetails():Promise<any> {
    return this.storage.get('campdatails');
  }

  getCampDetails(): Promise<any> {
    return this.storage.get('campdetails');
  }
  getLocation(): Promise<any> {
    return this.storage.get('location');
  }


  getData(): Promise<any> {
    return this.storage.get('checklists');
  }

  save(data: any): void {

    let saveData = [];

    //Remove observables
    data.forEach((checklist) =>{
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });
    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }

}
