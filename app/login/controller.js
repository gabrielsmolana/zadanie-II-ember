import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { inject as service} from '@ember/service'
import { storageFor } from 'ember-local-storage'

export default class LoginController extends Controller{
    @service store;

    @storageFor('logged-as') loggedAs;

    @tracked loginValue;
    @tracked passwordValue;

    @action
    onLoginChange({ target: { value }} ){
        this.loginValue = value
    }

    @action
    onPasswordChange({ target: { value }} ){
        this.passwordValue = value
    }

    @action
    async onSubmit(event){
        event.preventDefault();

        const users = await this.store.query('user' , { filter: { username: this.loginValue, password: this.passwordValue }})
        
        const isUserExist = !!users.length

        if(!isUserExist){
            return
        }

        const user = await users.firstObject
        this.loggedAs.set('id', user.id);

        window.location.href = '/'
    }
}