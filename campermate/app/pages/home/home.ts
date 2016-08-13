import {Component} from '@angular/core';
import {LocationPage} from '../location/location';
import {MyDetailsPage} from '../my-details/my-details';
import {CampDetailsPage} from '../camp-details/camp-details';
// import {QuickListsHomePage} from '../quicklistshome/quicklistshome';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  // tab4Root: any;

  constructor(){
    this.tab1Root = LocationPage;
    this.tab2Root = MyDetailsPage;
    this.tab3Root = CampDetailsPage;
    // this.tab4Root = QuickListsHomePage;
  }

}
