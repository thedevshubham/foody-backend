const authDefs = `
  type AuthUserData {
    id: String
    firstName: String
    lastName: String
    email: String
    token: String
    expiresIn: String
  }

  extend type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      phone: String!
      email: String!
      password: String!
    ): AuthUserData!

    signIn(
        email: String!
        password: String!
    ): AuthUserData!
  }
`;

module.exports = authDefs;
