import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';

/*
  Generated class for the ChecklistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/checklist/checklist.html',
})

export class ChecklistPage {

  checklist: any;

  constructor(private nav: NavController, public  navParams: NavParams, public alertCtrl: AlertController) {

    this.checklist = this.navParams.get('checklist');
  }

  addItem(): void{


    let prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: 'Enter the name of your new task below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {

            this.checklist.addItem(data.name);

          }
        }
      ]
    });

    prompt.present( );
  }


  toggleItem(item): void{

    this.checklist.toggleItem(item);
  }

  removeItem(item): void{

    this.checklist.removeItem(item);
  }

  renameItem(item): void{


    let prompt = this.alertCtrl.create({
      title: 'Rename Item',
      message: 'Enter the new name of your new task below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {

            this.checklist.renameItem(item);
          }
        }
      ]
    });

    prompt.present( );
  }


  uncheckItems(): void {
    this.checklist.items.forEach((item) =>{
      item.checked = false;
      // if(item.checked){
      //   this.checklist.toggleItem(item);
      // }
      });



  }



}
