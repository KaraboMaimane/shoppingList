import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { shoppingItem } from '../../models/shopping-item';
import { map } from 'rxjs/operators';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  shoppingListRef: AngularFireList<any>;  
  shoppingItems: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

    // this.shoppingListRef = database.list('/shopping-list/');
    this.shoppingListRef = database.list('shopping-list');
    this.shoppingItems = this.shoppingListRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    )
    console.log(this.shoppingItems);
  }

  addList(page){
    this.navCtrl.push(page);
  }

  selectShoppingItem(shoppingItem: shoppingItem, key: string){
    const actionSheet = this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () =>{
            this.shoppingListRef.remove(key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
          }
        }
      ]
    });
    actionSheet.present();
  }
}
