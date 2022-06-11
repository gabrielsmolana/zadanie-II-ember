import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class HomePostsController extends Controller {
  @tracked dateFrom;
  @tracked dateTo;

  queryParams = ['dateFrom', 'dateTo'];

  get shouldBeFilteredByDate() {
    return Boolean(this.startDate && this.endDate);
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
    if (this.shouldBeFilteredByDate) {
      return this.model.filter((post) => {
        return moment(post.createdAt).isBetween(
          this.startDate,
          this.endDate,
          undefined,
          '[]'
        );
      });
    }

    return this.model;
  }

  get minDate(){
    return this.startDate?.toDate()
  }

  get maxDate(){
    return this.endDate?.toDate()
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
  resetFilters(){
    this.dateFrom = null
    this.dateTo = null
  }
}
