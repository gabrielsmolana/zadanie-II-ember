import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

// post > show > temp wrzucic do komponentu <Post::Card @posts={{this.model}}>
// user > show > temp wrzucic do komponentu <User::Details @user={{this.model}}>

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@admin.com',
      photoURL:
        'https://funnycat.pl/wp-content/uploads/2020/02/koty-i-pude%C5%82ka-256x256.png',
      isAdmin: true,
    };

    const user2 = {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@user.com',
      photoURL:
        'https://a.allegroimg.com/s400/118184/e23b5cb54e7596e117f51a3eab02/MAGNES-NA-LODOWKE-PIES',
    };

    const user1Model = this.store.createRecord('user', user1);
    const user2Model = this.store.createRecord('user', user2);

    await user1Model.save();
    await user2Model.save();

    const post1 = {
      id: 1,
      title: 'Tytuł testowy 1',
      body: 'Zawartość testowa 1',
      owner: user1Model,
    };

    const post2 = {
      id: 2,
      title: 'Tytuł testowy 2',
      body: 'Zawartość testowa 2',
      owner: user1Model,
    };

    const post3 = {
      id: 3,
      title: 'Tytuł testowy 3',
      body: 'Zawartość testowa 3',
      owner: user2Model,
    };

    const post1Model = this.store.createRecord('post', post1);
    const post2Model = this.store.createRecord('post', post2);
    const post3Model = this.store.createRecord('post', post3);

    await post1Model.save();
    await post2Model.save();
    await post3Model.save();

    const like1 = { 
      owner: user1Model,
      post: post3Model,
    }

    const like1Model = this.store.createRecord('like', like1);
    await like1Model.save()
  }
}
