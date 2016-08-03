import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {

  constructor(public nav: NavController){

  }

  goToHome(): void {
    this.nav.setRoot(HomePage);
  }
}