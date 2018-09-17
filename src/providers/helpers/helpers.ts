import { Injectable } from '@angular/core';

import { Platform, ToastController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const STORAGE = 'secure-storage-app';

@Injectable()
export class HelpersProvider {

  private storageObj: SecureStorageObject;
  private storedData: any;
  private isPlatformReady: boolean;

  constructor(public platform: Platform, 
    public ss: SecureStorage, public toastCtrl: ToastController) {
    console.log('Service::In constructor ...');
    this.isPlatformReady = false;
    this.storageObj = null;
    this.storedData = {};

    this.initialize();
  }

  is_web(){
    return (this.platform.is('mobileweb'));
  }

  error_handler(prelude: string, error: string) {
    console.error(prelude + '::' + error);
  }

  get_dummy_bio(){
    return "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text" ;
  }

  get_dummy_data(){
    let data = [];
    data.push({name: 'Ant Man', age: 38, city: 'Texas', jobTitle: 'Ant sized superhero'});
    data.push({name: 'Black Widow', age: 80, city: 'Russia', jobTitle: 'Highly trained assasin'});
    data.push({name: 'Captain America', age: 80, city: 'Queens', jobTitle: 'Super Solider'});
    data.push({name: 'Doctor Strange', age: 45, city: 'Tibet', jobTitle: 'Master of mystic arts'});
    data.push({name: 'Ghost Rider', age: 300, city: 'Los Angeles', jobTitle: 'Destroyer of Evil'});
    data.push({name: 'Incredible Hulk', age: 47, city: 'New York City', jobTitle: 'Strongest Avenger'});
    data.push({name: 'Iron Man', age: 45, city: 'New York', jobTitle: 'The Genius'});
    data.push({name: 'Wolverine', age: 40, city: 'America', jobTitle: 'Reluctant superhero'});
    data.push({name: 'Spiderman', age: 40, city: 'America', jobTitle: 'Friendly neighborhood hero'});
    data.push({name: 'Thor Odinson', age: 40, city: 'America', jobTitle: 'God of Thunder'});
    data.push({name: 'Deadpool', age: 40, city: 'America', jobTitle: 'Merc with a mouth'});
    data.push({name: 'Professor X', age: 40, city: 'America', jobTitle: 'Leader of X-Men'});
    data.push({name: 'Bucky Barnes', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Jean Grey', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Scarlet Witch', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Hawk Eye', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Falcon', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Black Panther', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'War Machine', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Vision', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Captain Marvel', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Nick Fury', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Maria Hill', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'DareDevil', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Punisher', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Sentry', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Cable', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Domino', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Beta Ray Bill', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Hank Pym', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Wasp', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Jessica Jones', age: 40, city: 'America', jobTitle: 'Marvel Superhero'});
    data.push({name: 'Howard the Duck', age: 40, city: 'New Stork City', jobTitle: 'Most unlikely of the Marvel Superheroes'});

    data.forEach((item) => {
      item['shortBio'] = this.get_dummy_bio();
    })
    return data;
  }

  show_toast(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  initialize(){
    console.log("Service::initialize ...");
    if(this.is_web()){
      return;
    }

    this.platform.ready().then(() => {
      console.log("Service::Platform is ready");
      this.isPlatformReady = true;
      this.ss.create(STORAGE).then((obj: SecureStorageObject) => {
        console.log("Service::Secure storage created successfully");
        this.storageObj = obj;
      }).catch((error) => {
        console.error("Service::Unable to create secure storage. Error: " + error);
      });
    }).catch((error) => {
      console.error("Service::Platform not ready. Error: " + error);
    });
  }

  refresh_data(keyName: string): any {
    if(this.is_web()){
      return;
    }

    if(! this.isPlatformReady){
      console.error("Service::refresh_data platform is not ready")
    }else if(this.storageObj == null){
      console.error("Service::refresh_data storageObj is NULL");
    }else{
      this.storageObj.get(keyName).then((data) => {
        this.storedData[keyName] = JSON.parse(data);
        this.show_toast('Data updated successully');
      }).catch((error) => {
        console.error("Service::Unable to refresh data from storage. Error:" + error);
      });
    }
  }

  get_data(keyName: string): any {
    if(this.is_web()){
      return this.get_dummy_data();
    }

    if(keyName in this.storedData){
      console.log("Service::get_data(" + keyName + "): " + JSON.stringify(this.storedData[keyName]));
      return this.storedData[keyName];
    }else{
      console.error("Service::get_data no data for key=" + keyName);
      return [];
    }
  }

  set_data(keyName: string, data: any): any {
    if(this.is_web()){
      return;
    }

    if(! this.isPlatformReady){
      console.error("Service::set_data platform is not ready")
    }else if(this.storageObj == null){
      console.error("Service::set_data storageObj is NULL");
    }else{
      this.storageObj.set(keyName, JSON.stringify(data)).then((response) => {
        console.log("Service::set_data successful");
        this.refresh_data(keyName);
      }).catch((error) => {
        console.error("Service::set_data failed. Error: " + error);
      });
    }
  }
}
