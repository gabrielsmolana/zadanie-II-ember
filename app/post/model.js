import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string', { defaultValue: undefined }) owner;
  @attr('string') title;
  @attr('string') body;
  @attr('boolean', { defaultValue: false }) isDeleted;
}
