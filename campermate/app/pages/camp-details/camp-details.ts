import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/camp-details/camp-details.html',
})
export class CampDetailsPage {

  campDetailsForm: ControlGroup;

  constructor(public nav: NavController, public formBuilder: FormBuilder,
              public dataService: Data
  ) {

    this.campDetailsForm = formBuilder.group({
      gateAccessCode: [''],
      ammenitiesCode: [''],
      wifiPassword: [''],
      phoneNumber: [''],
      departure: [''],
      notes: ['']
    });

    // this.dataService.getCampDetails().then((details) => {
    //
    //   let savedDetails: any = false;
    //
    //   if(typeof(details) != "undefined"){
    //     savedDetails = JSON.parse(details);
    //   }
    //
    //   let formControls: any = this.campDetailsForm.controls;
    //
    //   if(savedDetails){
    //     formControls.gateAccessCode.updateValue(savedDetails.gateAccessCode);
    //     formControls.ammenitiesCode.updateValue(savedDetails.ammenitiesCode);
    //     formControls.wifiPassword.updateValue(savedDetails.wifiPassword);
    //     formControls.phoneNumber.updateValue(savedDetails.phoneNumber);
    //     formControls.departure.updateValue(savedDetails.departure);
    //     formControls.notes.updateValue(savedDetails.notes);
    //   }
    //
    // });

  }

  saveForm(): void {
    let data = this.campDetailsForm.value;
    // this.dataService.setCampDetails(data);
  }

}
