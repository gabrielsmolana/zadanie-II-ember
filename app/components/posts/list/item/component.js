import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PostsListItemComponent extends Component {
  @service session;

  get isLikedByCurrentUser() {
    const { currentUser } = this.session;
    const { post } = this.args;

    const likeModel = currentUser.likes.find((like) => {
        return like.post.get('id') === post.id
    });
    
    return Boolean(likeModel);
  }
}
