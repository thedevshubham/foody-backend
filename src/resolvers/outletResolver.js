const OutletController = require("../controllers/OutletController");
const verifyToken = require("../middleware/auth");

let outletController = new OutletController();

const outletQuery = {
  // Fetch list of outlets
  outletList: () => outletController.getOutlets(),
};

const outletMutation = {
  // Create new outlet in outlet list
  createOutlet: (root, args, context, info) => outletController.addOutlet(args),

  // Update outlet detail based on id
  updateOutlet: (root, args, context, info) => {
    verifyToken(context.token);
    return outletController.updateOutlet(args);
  },

  // Delete specific outlet from list
  deleteOutlet: (root, args, context, info) => {
    verifyToken(context.token);
    return outletController.deleteOutlet(args);
  },
};

module.exports = {
  outletQuery,
  outletMutation,
};
