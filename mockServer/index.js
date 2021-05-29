import {createServer, Model} from 'miragejs';
import factories from './factories';

const appServer = () => {
  createServer({
    models: {
      event: Model,
    },
    factories: {
      event: factories.event,
    },
    seeds(server) {
      server.createList('event', 30);
    },

    routes() {
      this.get('/api/event', schema => {
        return schema.events.all().models;
      });
    },
  });
};

export default appServer;
