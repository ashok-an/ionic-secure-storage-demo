import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListItemsPage } from '../list-items/list-items';
import { AddItemPage } from '../add-item/add-item';
import { Platform } from 'ionic-angular';

import { HelpersProvider } from '../../providers/helpers/helpers';

const KEY = 'top-secret';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private storedData: any;
  private isWebBrowser: boolean;

  constructor(public navCtrl: NavController, public platform: Platform, public helpers: HelpersProvider) {
    console.log("In constructor...");
    this.storedData  = [];
    let data = this.helpers.get_dummy_data();

    if(this.platform.is('mobileweb')){
      this.isWebBrowser = true;
      this.storedData   = data;
      return;
    }else{
      this.isWebBrowser = false;
    }
    //initial delay for the platform to be ready
    setTimeout(() => {
      this.helpers.set_data(KEY, data);
      this.fetch_data();
    }, 3000);
  }

  fetch_data(){
    if(this.isWebBrowser){
      return this.storedData;
    }

    setTimeout(() => {
      let temp = this.helpers.get_data(KEY);
      if (temp != null){
        this.storedData = temp;
      }
    }, 1000);
  }

  ionViewWillEnter(){
    console.log("In ionViewWillEnter...");
    this.helpers.refresh_data(KEY);
    this.fetch_data();
    console.log("Stored Data: " + JSON.stringify(this.storedData));
  }

  onAdd(){
    console.log(">>> to AddItemPage");
    this.navCtrl.push(AddItemPage);
  }

  onList(){
    console.log(">>> to ListItemsPage");
    if(this.storedData.length > 0){
      this.navCtrl.push(ListItemsPage, {data: this.storedData});
    }
  }
}
