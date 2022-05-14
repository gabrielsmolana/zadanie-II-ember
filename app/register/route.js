import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage' 
import { inject as service } from '@ember/service'

export default class RegisterRoute extends Route {
    @service store
    @service router

    @storageFor('logged-as') loggedAs

    beforeModel(){
        const isLoggedIn = this.loggedAs.get('id') == null ? false : true
        
        if(isLoggedIn){
            this.router.transitionTo('home')
            return
        }
    }

    model(){
        return this.store.createRecord('user')
    }
}
