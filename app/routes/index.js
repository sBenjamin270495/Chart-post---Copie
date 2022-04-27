import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  @service router;
  @service('datachart') datachartServ;

  activate() {
    //Connection a l'api
    let eventSource = new EventSource('https://stream.upfluence.co/stream');
    //test de connection ouverte
    eventSource.onopen = () => {
      console.log('connected');
    };
    //Ecoute tous les types de messages
    eventSource.onmessage = (event) => {
      //Si les data recupérer son des data :{} on les utilise pas
      if (event.data.length <= 2) return;
      //convertion en JSON
      let dataJSON = JSON.parse(event.data);
      //Mise en forme des données pour chart.js, pour les intégrer au store
      let data = this.datachartServ.normaliseData(
        dataJSON,
        this.store.peekRecord('datachart', 1)
      );
      //remplace le store
      return this.store.push({ data: data });
    };
    return eventSource.onmessage;
  }

  model() {
    //recupere le store pour le mettre dans le model
    return this.store.peekAll('datachart');
  }
}
