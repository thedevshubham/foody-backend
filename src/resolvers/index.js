const userResolvers = require("./userResolver");
const authResolver = require("./authResolver");
const menuResolver = require("./menuResolver");
const outletResolver = require("./outletResolver");

module.exports = {
  Query: { ...userResolvers.userQuery, ...outletResolver.outletQuery },
  Mutation: {
    ...userResolvers.userMutation,
    ...outletResolver.outletMutation,
    ...authResolver.authMutation,
    ...menuResolver.menuMutation,
  },
};
