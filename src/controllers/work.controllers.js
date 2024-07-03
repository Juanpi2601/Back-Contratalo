import Work from "../models/work.model.js";

export const createWork = async (req, res) => {
    try {
      const { imageUrl, service, description } = req.body;
      const newWork = new Work({ imageUrl, service, description });
      await newWork.save();
      res.status(201).json(newWork);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getWorks = async (req, res) => {
    try {
      const Works = await Work.find();
      res.status(200).json(Works);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };