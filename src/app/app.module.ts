import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SecureStorage } from '@ionic-native/secure-storage' ;

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HelpersProvider } from '../providers/helpers/helpers';
import { AddItemPage } from '../pages/add-item/add-item';
import { ListItemsPage } from '../pages/list-items/list-items';
import { ItemDetailsPage } from '../pages/item-details/item-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemPage,
    ListItemsPage,
    ItemDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemPage,
    ListItemsPage,
    ItemDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HelpersProvider
  ]
})
export class AppModule {}
