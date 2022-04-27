import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class GraphComponent extends Component {
  @service store;
  @tracked datasources;
  @tracked ChoseChart = 'Instagram';
  //Recup le nombre total de post
  get NbPostTotalLive() {
    return this.args.data.NbPostTotal;
  }
  //Recup le nombre de post sélectionner
  get NbPostLive() {
    switch (this.ChoseChart) {
      case 'Instagram':
        return this.args.data.NbPostInsta;
      case 'Pin':
        return this.args.data.NbPostPin;
      case 'Youtube':
        return this.args.data.NbPostYoutubeVideo;
      case 'Article':
        return this.args.data.NbPostArticle;
      case 'Tweet':
        return this.args.data.NbPostTweet;
      case 'Facebook':
        return this.args.data.NbPostFacebookStatus;
      default:
        return undefined;
    }
  }
//change le dataset utilisé pour le datachart
  get dataup() {
    switch (this.ChoseChart) {
      case 'Instagram':
        this.datasources = this.args.data.instagramMedia;
        break;
      case 'Pin':
        this.datasources = this.args.data.pin;
        break;
      case 'Youtube':
        this.datasources = this.args.data.youtubeVideo;
        break;
      case 'Article':
        this.datasources = this.args.data.article;
        break;
      case 'Tweet':
        this.datasources = this.args.data.tweet;
        break;
      case 'Facebook':
        this.datasources = this.args.data.facebookStatus;
        break;
    }
    return this.datasources;
  }
  //change le param pour utilisé le bon dataset
  @action ChangeData(TypeData) {
    this.ChoseChart = TypeData;
  }
//Option chart.js pour les axes,legende,titre ....
  option = {
    responsive: true,
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            callback: function (value) {
              return value == 0 || value == 25 ? '' : value - 1 + 'H';
            },
            min: 0,
            max: 25,
            stepSize: 1,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: function (index) {
              const Jour = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday ',
                'Sunday',
                '',
              ];
              return Jour[index - 1];
            },
            min: 0,
            max: 8,
          },
        },
      ],
    },
  };
}
