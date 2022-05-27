const outletDefs = `
  type Outlet {
    id: String!
    outletName: String
    location: String
    imageUrl: String
  }

  extend type Query {
    outletList: [Outlet]
  }

  extend type Mutation {
    createOutlet(
      outletName: String
      location: String
      imageUrl: String
    ): Outlet!

    deleteOutlet(id: String!): [Outlet]

    updateOutlet(
      id: String!
      outletName: String!
      location: String!
      imageUrl: String!
    ): [Outlet]
  }
`;

module.exports = outletDefs;
