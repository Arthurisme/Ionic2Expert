import {Component} from '@angular/core';
import {NavController, Alert, Storage, LocalStorage} from 'ionic-angular';
import {ChecklistPage} from '../checklist/checklist'
import {ChecklistModel} from '../../providers/checklist-model/checklist-model'
import {Data} from '../../providers/data/data'
import {IntroPage} from "../intro/intro";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  checklists :ChecklistModel[] = [];
  local: Storage;


  constructor(private nav: NavController, public dataService: Data) {

    this.local = new Storage(LocalStorage);
    this.local.get('introShown').then((result)=>{
      if(!result){
        this.local.set('introShown',true);
        this.nav.setRoot(IntroPage);
      }
    });


    this.dataService.getData().then((checklists) =>
      {

        let savedChecklists: any = false;

        if(typeof(checklists) != "undefined"){
          savedChecklists = JSON.parse(checklists);
        }

        if(savedChecklists){

          savedChecklists.forEach((savedChecklist) => {

            let loadChecklist = new ChecklistModel(savedChecklist.title, savedChecklist.items);
            this.checklists.push(loadChecklist);

            loadChecklist.checklist.subscribe(update => {
              this.save();
            });

          });

        }

      });

  }


  addChecklist(): void {

    let prompt = Alert.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
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
            let newChecklist = new ChecklistModel(data.name, []);
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    this.nav.present(prompt);
  }



  renameChecklist(checklist):void{

    let prompt = Alert.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of the new checklist below',
      inputs:[
        {
          name:'name'
        }
      ],
      buttons:[
        {
          text: 'Cancel'
        },
        {
          text:'Save',
          handler: data =>{
            let index = this.checklists.indexOf(checklist);
            if(index > -1){
              this.checklists[index].setTitle(data.name);
              this.save();

            }
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

  viewChecklist(checklist):void{

    this.nav.push(ChecklistPage,{checklist:checklist});
  }

  removeChecklist(checklist):void{
    let index = this.checklists.indexOf(checklist);
    if(index > -1) {
      this.checklists.splice(index, 1)
      this.save();
    }
  }

  save(): void{

    this.dataService.save(this.checklists);
  }


  goToIntroPage( ):void{

    this.nav.push(IntroPage);
  }


}
