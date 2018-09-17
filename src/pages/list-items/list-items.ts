import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ItemDetailsPage } from '../item-details/item-details';
/**
 * Generated class for the ListItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const KEY = 'top-secret';

@IonicPage()
@Component({
  selector: 'page-list-items',
  templateUrl: 'list-items.html',
})
export class ListItemsPage {
  private dataList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpers: HelpersProvider) {
    this.dataList = this.navParams.get('data');
  }

  ionViewDidLoad() {
    this.dataList = this.helpers.get_data(KEY);
    console.log('ionViewDidLoad ListItemsPage');

    this.dataList.sort((a, b) => {
      let _a = a.name.toLowerCase();
      let _b = b.name.toLowerCase();
      if(_a < _b){
        return -1;
      }else if(_a > _b){
        return 1;
      }else{
        return 0;
      }
    });
  }

  onDetails(selectedItem: any){
    console.log("onDetails handler for " + JSON.stringify(selectedItem));
    console.log(">>> ItemDetailsPage");
    this.navCtrl.push(ItemDetailsPage, {data: selectedItem});
  }
}
