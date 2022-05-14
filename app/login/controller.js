import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { inject as service} from '@ember/service'

export default class LoginController extends Controller{
    @service store;

    @tracked loginValue
    @tracked passwordValue

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
        console.log(users.length)
    }
}