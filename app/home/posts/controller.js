import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class HomePostsController extends Controller {
  @tracked dateFrom;
  @tracked dateTo;

  queryParams = ['dateFrom', 'dateTo'];

  get shouldFilterBetweenDates() {
    return Boolean(this.startDate && this.endDate);
  }

  get shouldFilterBeforeEndDate() {
    return !this.shouldFilterBetweenDates && Boolean(this.endDate);
  }

  get shouldFilterAfterStartDate() {
    return !this.shouldFilterBetweenDates && Boolean(this.startDate);
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
    if (this.shouldFilterBetweenDates) {
      return this.model.filter((post) => {
        return moment(post.createdAt).isBetween(
          this.startDate,
          this.endDate,
          undefined,
          '[]'
        );
      });
    }

    if (this.shouldFilterBeforeEndDate) {
      return this.model.filter((post) => {
        return moment(post.createdAt).isSameOrBefore(this.endDate);
      });
    }
    
    if (this.shouldFilterAfterStartDate) {
        return this.model.filter((post) => {
          return moment(post.createdAt).isSameOrAfter(this.startDate);
        });
      }
    
    return this.model;
  }

  get minDate() {
    return this.startDate?.toDate();
  }

  get maxDate() {
    return this.endDate?.toDate();
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
}
