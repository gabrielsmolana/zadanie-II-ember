import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service} from '@ember/service'

export default class RegisterController extends Controller{
    @service store;

    @action
    onUsernameChange(){

    }

    @action
    onEmailChange(){

    }

    @action
    onPasswordChange(){

    }

    @action
    onPhotoURLChange(){

    }

    @action
    async onSubmit(event){
        event.preventDefault();
    }
}