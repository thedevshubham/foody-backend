const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
let outletData = require("../data/outlet.json");
const outletdataFile = path.join(__dirname, "../data") + "/outlet.json";

class OutletController {
  constructor() {
    this.getOutlets = this.getOutlets.bind(this);
    this.addOutlet = this.addOutlet.bind(this);
    this.updateOutlet = this.updateOutlet.bind(this);
    this.deleteOutlet = this.deleteOutlet.bind(this);
  }

  // get outlet list
  async getOutlets() {
    try {
      const fileData = fs.readFileSync(
        outletdataFile,
        "utf-8",
        (err, jsonString) => {
          if (err) {
            return err;
          }
          return jsonString.toString();
        }
      );
      return fileData && JSON.parse(fileData);
    } catch (error) {
      return error;
    }
  }

  // add an outlet
  async addOutlet(args) {
    try {
      let newOutlet = {
        id: uuid.v4(),
        outletName: args.outletName,
        location: args.location,
        imageUrl: args.imageUrl
      };
      outletData.push(newOutlet);
      fs.writeFileSync(outletdataFile, JSON.stringify(outletData), (err) => {
        if (err) return err;
      });
      return newOutlet;
    } catch (error) {
      return error;
    }
  }

  // update an outlet
  async updateOutlet(args) {
    try {
      let foundOutlet = {};
      let foundOutletIndex = -1;
      for (let index = 0; index < outletData.length; index++) {
        if (outletData[index].id == args.id) {
          foundOutlet = { ...outletData[index] };
          foundOutletIndex = index;
          break;
        }
      }
      if (Object.keys(foundOutlet).length > 0) {
        foundOutlet = {
          ...foundOutlet,
          id: args.id,
          outletName: args.outletName,
          location: args.location,
          imageUrl: args.imageUrl
        };
        outletData[foundOutletIndex] = foundOutlet;
        fs.writeFileSync(outletdataFile, JSON.stringify(outletData), (err) => {
          if (err) return err;
        });
        return outletData;
      }
      throw new Error("no user found");
    } catch (error) {
      return error;
    }
  }

  // delete an outlet
  async deleteOutlet(args) {
    try {
      outletData = outletData.filter((item) => {
        return item.id != args.id;
      });
      fs.writeFileSync(outletdataFile, JSON.stringify(outletData), (err) => {
        if (err) return err;
      });
      return outletData;
    } catch (error) {
      return error;
    }
  }
}

module.exports = OutletController;
