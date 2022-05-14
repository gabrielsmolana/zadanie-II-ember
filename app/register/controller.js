import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service} from '@ember/service'

export default class RegisterController extends Controller{
    @service store;
    @service router

    @action
    onUsernameChange({target : { value }}){
        this.model.username = value;
    }

    @action
    onEmailChange({target : { value }}){
        this.model.email = value;

    }

    @action
    onPasswordChange({target : { value }}){
        this.model.password = value;
    }

    @action
    onPhotoURLChange({target : { value }}){
        this.model.photoURL = value;
    }

    @action
    async onSubmit(event){
        event.preventDefault();

        await this.model.save()

        this.router.transitionTo('login')
    }
}