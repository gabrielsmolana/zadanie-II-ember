import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
    @attr('string') title;
    @attr('string') body;
    @attr('boolean', { defaultValue: false }) isDeleted; 
    @belongsTo('user') owner;
}
