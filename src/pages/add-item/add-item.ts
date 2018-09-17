import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

const KEY = 'top-secret';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  public newItem: Object;
  public allItems: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public helpers: HelpersProvider, public platform: Platform) {
    if(this.platform.is('mobileweb')){
      this.allItems = this.helpers.get_dummy_data();  
    }else{
      this.allItems = this.helpers.get_data(KEY);
    }

    this.newItem = {
      name: '',
      city: '',
      age: 21,
      jobTitle: '',
      shortBio: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
    console.log("All items: " + JSON.stringify(this.allItems));
  }

  onAdd(){
    let newData = this.allItems.slice();
    try{
      newData.push(this.newItem);
    }catch(error){
      console.error(error);
    }

    console.log("Data after addition: " + JSON.stringify(newData));
    this.helpers.set_data(KEY, newData);
    this.navCtrl.pop();
  }
}
