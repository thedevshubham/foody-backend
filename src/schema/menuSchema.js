const menuDefs = `
  type Menu {
    mainCourse: [Maincourse]
    starter: [Starter]
    iceCream: [Icecream]
    location: String
    outletName: String
  }

  type Maincourse {
      item: String
      price: Int
  }

  type Starter {
    item: String
    price: Int
  }

  type Icecream {
    item: String
    price: Int
  }

  extend type Mutation {
    getMenu(id: String!): Menu
  }
`;

module.exports = menuDefs;
