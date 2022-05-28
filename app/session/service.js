import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;
  @tracked currentUser;
  @storageFor('logged-as') loggedAs;

  get isUserLoggedIn() {
    return !!this.loggedAs.get('id');
  }

  async loginUser(login, password) {
    const users = await this.store.query('user', {
      filter: { username: login, password: password },
    });

    const isUserExist = !!users.length;

    if (!isUserExist) {
      return;
    }

    const user = await users.firstObject;

    this.loggedAs.set('id', user.id);
    window.location.href = '/';
  }

  logoutUser() {
    this.loggedAs.set('id', null);
    window.location.href = '/';
  }

  async setCurrentUser() {
    const userId = this.loggedAs.get('id');
    const user = await this.store.findRecord('user', userId);

    this.currentUser = user;

    this.loggedAs.set('id', user.id);
  }
}
