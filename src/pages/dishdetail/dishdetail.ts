import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  comment: Comment;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider) {
      this.dish = navParams.get('dish');
      this.favorite = this.favoriteservice.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);

      // this.comment = navParams.get('comment');
      // this.dish.comments.push(this.comment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            console.log('adding to comment');
            let modal = this.modalCtrl.create(CommentPage);
            modal.onDidDismiss(data => {
              console.log(data);
              this.dish.comments.push(data);
            })
            modal.present();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log("closing the action sheet");
          }
        }
        
      ]
    }); 
    actionSheet.present();
  }

}
