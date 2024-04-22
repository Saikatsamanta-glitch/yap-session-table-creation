const Sequelize = require('sequelize');
const {
  sitemap,
  event,
  location,
  artist,
  ticketOffer,
  category,
  organizer,
  eventArtistMap,
  eventOrganizerMap,
  sitemapEventMap,
  promotion,
  country,
  state,
  city,
  discovery,
  events,
  session,
} = require('../models');
const config = require('../config');

const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
});

const EventModel = event(sequelize, Sequelize);
const LocationModel = location(sequelize, Sequelize);
const ArtistModel = artist(sequelize, Sequelize);
const TicketOfferModel = ticketOffer(sequelize, Sequelize);
const CategoryModel = category(sequelize, Sequelize);
const OrganizerModel = organizer(sequelize, Sequelize);
const EventArtistMapModel = eventArtistMap(sequelize, Sequelize);
const EventOrganizerMapModel = eventOrganizerMap(sequelize, Sequelize);
const SitemapModel = sitemap(sequelize, Sequelize);
const EventSitemapMapModel = sitemapEventMap(sequelize, Sequelize);
const PromotionalModel = promotion(sequelize, Sequelize);
const CountryModel = country(sequelize, Sequelize);
const StateModel = state(sequelize, Sequelize);
const CityModel = city(sequelize, Sequelize);
const DiscoveryModel = discovery(sequelize, Sequelize);
const SessionModel = session(sequelize, Sequelize);
const EventsModel = events(sequelize, Sequelize);

EventModel.hasMany(TicketOfferModel, { foreignKey: 'event_id' });
TicketOfferModel.belongsTo(EventModel, { foreignKey: 'event_id' });

LocationModel.hasOne(EventModel, { foreignKey: 'location_id' });
EventModel.belongsTo(LocationModel, { foreignKey: 'location_id' });

CategoryModel.hasOne(EventModel, { foreignKey: 'category_id' });
EventModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });

EventModel.belongsToMany(ArtistModel, { through: EventArtistMapModel, foreignKey: 'event_id' });
ArtistModel.belongsToMany(EventModel, { through: EventArtistMapModel, foreignKey: 'artist_id' });

EventModel.belongsToMany(OrganizerModel, { through: EventOrganizerMapModel, foreignKey: 'event_id' });
OrganizerModel.belongsToMany(EventModel, { through: EventOrganizerMapModel, foreignKey: 'organizer_id' });

SitemapModel.belongsToMany(EventModel, { through: EventSitemapMapModel, foreignKey: 'sitemap_id' });
EventModel.belongsToMany(SitemapModel, { through: EventSitemapMapModel, foreignKey: 'event_id' });

CountryModel.hasMany(StateModel, { foreignKey: 'country_id' });
StateModel.belongsTo(CountryModel, { foreignKey: 'country_id' });

CountryModel.hasMany(CityModel, { foreignKey: 'country_id' });
CityModel.belongsTo(CountryModel, { foreignKey: 'country_id' });

StateModel.hasMany(CityModel, { foreignKey: 'state_id' });
CityModel.belongsTo(StateModel, { foreignKey: 'state_id' });

CountryModel.hasMany(CityModel, { foreignKey: 'country_id' });
CityModel.belongsTo(CountryModel, { foreignKey: 'country_id' });

LocationModel.belongsTo(CityModel, { foreignKey: 'city_id', as: 'cityLocations' });
CityModel.hasMany(LocationModel, { foreignKey: 'city_id', as: 'locationCity' });

EventsModel.hasMany(SessionModel, { foreignKey: 'event_id' });
SessionModel.belongsTo(EventsModel, { foreignKey: 'event_id' });


// city [country.id] ---> countries
// location [city.id] ---> cities
module.exports = {
  sequelize,
  EventModel,
  LocationModel,
  ArtistModel,
  TicketOfferModel,
  CategoryModel,
  OrganizerModel,
  EventArtistMapModel,
  EventOrganizerMapModel,
  EventSitemapMapModel,
  SitemapModel,
  PromotionalModel,
  CountryModel,
  StateModel,
  CityModel,
  DiscoveryModel,
  EventsModel,
  SessionModel,
};
