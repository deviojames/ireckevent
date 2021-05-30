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
      this.get('/api/event/:eventId', (schema, request) => {
        const {eventId} = request.params;
        const eventModel = schema.events.find(parseInt(eventId, 10));

        return eventModel;
      });
      this.patch('/api/event/:eventId/join', (schema, request) => {
        const {eventId} = request.params;
        const eventModel = schema.events.find(parseInt(eventId, 10));

        eventModel.update({
          id: eventId,
          status: 'going',
        });

        return eventModel.attrs;
      });
      this.patch('/api/event/:eventId/leave', (schema, request) => {
        const {eventId} = request.params;
        const eventModel = schema.events.find(parseInt(eventId, 10));

        eventModel.update({
          id: eventId,
          status: 'ignore',
        });

        return eventModel.attrs;
      });
    },
  });
};

export default appServer;
