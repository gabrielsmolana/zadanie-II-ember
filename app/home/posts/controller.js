import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class HomePostsController extends Controller {
  @tracked dateFrom;
  @tracked dateTo;
  @tracked sort;
  @tracked selectedAuthors = [];

  authors = [];

  queryParams = ['dateFrom', 'dateTo', 'sort'];

  get shouldFilterBetweenDates() {
    return Boolean(this.startDate && this.endDate);
  }

  get shouldFilterBeforeEndDate() {
    return !this.shouldFilterBetweenDates && Boolean(this.endDate);
  }

  get shouldFilterAfterStartDate() {
    return !this.shouldFilterBetweenDates && Boolean(this.startDate);
  }

  get shouldFilterByAuthors() {
    return Boolean(this.selectedAuthors.length);
  }

  get sortLabel() {
    if (!this.sort) {
      return '';
    }

    this.sort === 'ASC' ? '🔽' : '🔼';
  }

  get startDate() {
    if (!this.dateFrom) return null;
    return moment(this.dateFrom).startOf('day');
  }

  get endDate() {
    if (!this.dateTo) return null;
    return moment(this.dateTo).endOf('day');
  }

  get filteredPosts() {
    let posts = this.model;

    if(this.shouldFilterByAuthors){
      posts = posts.filter((post) => {
        return this.selectedAuthors.find((author) => {
          return author.get('id') === post.owner.get('id')
        })
      })
    }

    if (this.shouldFilterBetweenDates) {
      return posts.filter((post) => {
        return moment(post.createdAt).isBetween(
          this.startDate,
          this.endDate,
          undefined,
          '[]'
        );
      });
    }

    if (this.shouldFilterBeforeEndDate) {
      return posts.filter((post) => {
        return moment(post.createdAt).isSameOrBefore(this.endDate);
      });
    }

    if (this.shouldFilterAfterStartDate) {
      return posts.filter((post) => {
        return moment(post.createdAt).isSameOrAfter(this.startDate);
      });
    }

    return posts;
  }

  get sortedPosts() {
    if (this.sort === 'ASC') {
      return this.filteredPosts.sortBy('createdAtInMiliseconds');
    }

    if (this.sort === 'DESC') {
      return this.filteredPosts.sortBy('createdAtInMiliseconds').reverse();
    }

    return this.filteredPosts;
  }

  get minDate() {
    return this.startDate?.toDate();
  }

  get maxDate() {
    return this.endDate?.toDate();
  }

  @action
  onSortToggle() {
    if (!this.sort) {
      return (this.sort = 'ASC');
    }

    if (this.sort == 'ASC') {
      return (this.sort = 'DESC');
    }

    return (this.sort = undefined);
  }

  @action
  onStartDayChange(date) {
    this.dateFrom = moment(date).format('YYYY-MM-DD');
  }

  @action
  onEndDayChange(date) {
    this.dateTo = moment(date).format('YYYY-MM-DD');
  }

  @action
  resetFilters() {
    this.dateFrom = null;
    this.dateTo = null;
  }

  @action
  chooseAuthors(author) {
    this.selectedAuthors = Array.isArray(author) ? author : [author];
  }
}
