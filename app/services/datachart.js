import Service, { service } from '@ember/service';
import { A } from '@ember/array';
import moment from 'moment';

export default class DatachartService extends Service {
  @service store;

  //creation du dataset initial pour chart.js
  initDataset(TypePost, color) {
    let data = A([]);
    //pour chaque jour
    for (let days = 1; days < 8; days++) {
      //pour chaque heure
      for (let hours = 1; hours <= 24; hours++) {
        //création structure de base
        let newdata = {
          label: TypePost + ' : ',
          data: [
            {
              x: hours,
              y: days,
              r: 0,
            },
          ],
          backgroundColor: color,
        };
        data.push(newdata);
      }
    }
    return data;
  }
  //update datset pour chart.js
  UpdateDataChart(store, newTimeStamp, TypePost) {
    let data = A([]);
    data = store;
    if (newTimeStamp == null) {
      return data;
    }
    var Newdate = new Date(moment(newTimeStamp * 1000));
    var NewDay = Newdate.getDay();
    //dimanche return 0 donc pour concorder avec le libellé on dit = 7
    if (NewDay == 0) {
      NewDay = 7;
    }
    var Newhours = Newdate.getHours();
    var IndexData = 24 * (NewDay - 1) + Newhours;
    data[IndexData].data[0].r += 1;
    data[IndexData].label = TypePost + ': ' + data[IndexData].data[0].r;
    return data;
  }

  normaliseData(data, store) {
    data.type = 'datachart';
    data.id = '1';
    data.attributes = {
      // si le store est null return 0 sinon inccrement
      NbPostTotal:
        store !== null && store.NbPostTotal !== undefined
          ? store.NbPostTotal + 1
          : 0,
      // si le store est null return 0 sinon si data.instagram_media existe on incremente sinon on retourne le store
      NbPostInsta:
        store !== null
          ? data.instagram_media !== undefined
            ? store.NbPostInsta + 1
            : store.NbPostInsta
          : 0,
      NbPostPin:
        store !== null
          ? data.pin !== undefined
            ? store.NbPostPin + 1
            : store.NbPostPin
          : 0,
      NbPostYoutubeVideo:
        store !== null
          ? data.youtube_video !== undefined
            ? store.NbPostYoutubeVideo + 1
            : store.NbPostYoutubeVideo
          : 0,
      NbPostArticle:
        store !== null
          ? data.article !== undefined
            ? store.NbPostArticle + 1
            : store.NbPostArticle
          : 0,
      NbPostTweet:
        store !== null
          ? data.tweet !== undefined
            ? store.NbPostTweet + 1
            : store.NbPostTweet
          : 0,
      NbPostFacebookStatus:
        store !== null
          ? data.facebook_status !== undefined
            ? store.NbPostFacebookStatus + 1
            : store.NbPostFacebookStatus
          : 0,
      // Dataset util pour chart.js,
      instagramMedia: {
        datasets:
          // si le store existe on met a jour le store avec le nouveau dataset sinon on utilise la fonction de creation du dataset initialisation
          store !== null && store.instagramMedia !== undefined
            ? this.UpdateDataChart(
                store.instagramMedia.datasets,
                // si instagramMedia existe on revoie le timestamp de la data pour update le dataset sinon on return null pour que la fonction return le store
                data.instagram_media !== undefined
                  ? data.instagram_media.timestamp
                  : null,
                'Instagram Post'
              )
            : this.initDataset('Instagram Post', 'rgb(255, 99, 132)'),
      },
      pin: {
        datasets:
          //voir comm instagram pour explication c'est pareil mais en changeant le type
          store !== null && store.pin !== undefined
            ? this.UpdateDataChart(
                store.pin.datasets,
                data.pin !== undefined ? data.pin.timestamp : null,
                'Pin Post'
              )
            : this.initDataset('Pin Post', '#016aba'),
      },
      youtubeVideo: {
        datasets:
          store !== null && store.youtubeVideo !== undefined
            ? this.UpdateDataChart(
                store.youtubeVideo.datasets,
                data.youtube_video !== undefined
                  ? data.youtube_video.timestamp
                  : null,
                'Youtube Video Post'
              )
            : this.initDataset('Youtube Video Post', '#e46855'),
      },
      article: {
        datasets:
          store !== null && store.article !== undefined
            ? this.UpdateDataChart(
                store.article.datasets,
                data.article !== undefined ? data.article.timestamp : null,
                'Article Post'
              )
            : this.initDataset('Article Post', '#398f21'),
      },
      tweet: {
        datasets:
          store !== null && store.tweet !== undefined
            ? this.UpdateDataChart(
                store.tweet.datasets,
                data.tweet !== undefined ? data.tweet.timestamp : null,
                'Tweet Post'
              )
            : this.initDataset('Tweet Post', '#8c0391'),
      },
      facebookStatus: {
        datasets:
          store !== null && store.facebookStatus !== undefined
            ? this.UpdateDataChart(
                store.facebookStatus.datasets,
                data.facebook_status !== undefined
                  ? data.facebook_status.timestamp
                  : null,
                'Facebook Status Post'
              )
            : this.initDataset('Facebook Statu Post', '#edec15'),
      },
    };
    //delete les param inutile des datas.
    if (data.instagram_media !== undefined) {
      delete data.instagram_media;
    }
    if (data.pin !== undefined) {
      delete data.pin;
    }
    if (data.article !== undefined) {
      delete data.article;
    }
    if (data.youtube_video !== undefined) {
      delete data.youtube_video;
    }
    if (data.tweet !== undefined) {
      delete data.tweet;
    }
    if (data.facebook_status !== undefined) {
      delete data.facebook_status;
    }
    return data;
  }
}
