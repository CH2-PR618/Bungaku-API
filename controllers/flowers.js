import Flowers from "../models/flowerModel.js";
import Flowers_ID from "../models/flowerModel_ID.js";

// Generic function to get flower data by name
const getFlowerByNameGeneric = async (model, req, res) => {
  const flowerName = req.params.flowerName;

  try {
    const flower = await model.findOne({
      where: {
        flower_name: flowerName,
      },
    });

    if (!flower) {
      return res.status(404).json({ error: 'Flower not found' });
    }

    return res.status(200).json(flower);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get flower data by name
export const getFlowerByName = async (req, res) => {
  const lang = req.query.lang || 'en'; // Default to English if lang parameter is not provided
  const model = lang === 'id' ? Flowers_ID : Flowers;
  await getFlowerByNameGeneric(model, req, res);
};

// Generic function to get all flowers
const getAllFlowersGeneric = async (model, req, res) => {
  try {
    const flowers = await model.findAll();
    return res.status(200).json(flowers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all flowers
export const getAllFlowers = async (req, res) => {
  const lang = req.query.lang || 'en'; // Default to English if lang parameter is not provided
  const model = lang === 'id' ? Flowers_ID : Flowers;
  await getAllFlowersGeneric(model, req, res);
};
