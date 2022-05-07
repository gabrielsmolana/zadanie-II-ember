import Model, { attr }  from '@ember-data/model';

export default class UserModel extends Model {
    @attr id;
    @attr username;
    @attr password;
    @attr email;
    @attr isDeleted;
    @attr isAdmin;
        
}
