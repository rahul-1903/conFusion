import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { DishdetailPage } from '../dishdetail/dishdetail';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  feedback: FormGroup;
  comment: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder: FormBuilder,
    public viewCtrl: ViewController) {

      this.feedback = this.formbuilder.group({
        rating: 5,
        author: ['', Validators.required],
        comment: ['', Validators.required],
      });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    this.comment = this.feedback.value;
    this.comment.date = new Date().toISOString();
    console.log("feedback: ", this.comment);
    this.viewCtrl.dismiss(this.comment);
  }

}
