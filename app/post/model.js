import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import moment from 'moment';

export default class PostModel extends Model {
  @attr('string') title;
  @attr('string') body;
  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('date', { defaultValue: () => moment() }) createdAt;
  @belongsTo('user', { autoSave: true }) owner;
  @hasMany('like') likes;

  get createdAtInMiliseconds() {
    return new Date(this.createdAt).getTime();
  }

  // get fullDate(){
  //   const date = new Date(this.createdAt);

  //   const day = date.getDate();
  //   const month = date.getMonth()+1;
  //   const year = date.getFullYear();

  //   return `${day}.${month}.${year}`;
  // }
}
