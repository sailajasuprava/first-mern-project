const Service = require("../models/serviceModel");

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      status: "success",
      results: services.length,
      data: services,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllServices;
