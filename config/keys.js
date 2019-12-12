const MONGO_USERNAME = "johnquarcoopome";
const MONGO_PASSWORD = "NIISACKEY1996#20";
const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = "27017";
const MONGO_DB = "vidnote-dev";

const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}? authSource = admin,
 secretOrKey = "secret"`;
