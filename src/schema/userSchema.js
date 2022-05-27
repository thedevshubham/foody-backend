const userDefs = `
  type User {
    id: String!
    firstName: String
    lastName: String
    phone: String
    email: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(
      firstName: String
      lastName: String
      phone: String
      email: String
    ): User!

    deleteUser(id: String! deleteAll: Boolean): [User]
    
    updateUser(
      id: String!
      firstName: String!
      lastName: String!
      phone: String!
      email: String!
    ): [User]
  }
`;

module.exports = userDefs;
