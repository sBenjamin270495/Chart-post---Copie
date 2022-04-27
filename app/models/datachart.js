import Model, { attr } from '@ember-data/model';

export default class DataChartModel extends Model {
  @attr instagramMedia;
  @attr pin;
  @attr youtubeVideo;
  @attr article;
  @attr tweet;
  @attr facebookStatus;
  @attr NbPostTotal;
  @attr NbPostInsta;
  @attr NbPostPin;
  @attr NbPostYoutubeVideo;
  @attr NbPostArticle;
  @attr NbPostTweet;
  @attr NbPostFacebookStatus;
}
