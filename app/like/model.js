import Model, { attr, belongsTo } from '@ember-data/model';

export default class LikeModel extends Model {
  @belongsTo('user') owner;
  @belongsTo('post') post;
  @attr('date', { defaultValue: () => new Date() }) createdAt;
}
