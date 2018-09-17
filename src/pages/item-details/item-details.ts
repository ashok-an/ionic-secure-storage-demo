import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const KEY = 'top-secret';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  public curItem: any;
  public allItems: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public helpers: HelpersProvider, public platform: Platform) {
    console.log("In ItemDetails::constuctor ...");
    this.curItem  = this.navParams.get('data');

    console.log("Current item: " + JSON.stringify(this.curItem));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
    if(this.platform.is('mobileweb')){
      this.allItems = this.helpers.get_dummy_data();  
    }else{
      this.allItems = this.helpers.get_data(KEY);
    }
    console.log("All Items: " + JSON.stringify(this.allItems));
  }

  onUpdate(){
    console.log("onUpdate(): " + JSON.stringify(this.curItem) + " from " + JSON.stringify(this.allItems));

    let newData = this.allItems.slice();
    try{
      this.allItems.forEach((item) => {
        if(item.name == this.curItem.name){
          newData.city = this.curItem.city;
          newData.age  = this.curItem.age;
          newData.jobTitle = this.curItem.jobTitle;
          newData.shortBio = this.curItem.shortBio;
        }
      });
    }catch(error){
      console.error(error);
    }

    console.log("Updated data: " + JSON.stringify(newData));
    this.helpers.set_data(KEY, newData);
    
    this.navCtrl.pop();
  }

  onDelete(){
    console.log("onDelete(): " + JSON.stringify(this.curItem) + " from " + JSON.stringify(this.allItems));
      
    let newData = [];
    try{
      newData = this.allItems.filter(item => (item.name != this.curItem.name));
    }catch(error){
      console.error(error);
    }
    
    console.log("Data after delete: " + JSON.stringify(newData));
    this.helpers.set_data(KEY, newData);
    
    this.navCtrl.pop();
  }
}
