const Reference = require('../model/reference');

exports.getReferences = async (req, res) => {
  // const { topic } = req.params;
  // const materials = await Reference.find({ topic });
  const materials = await Reference.find();
  res.json(materials);
  console.log('reference:',materials)
}

exports.addReference = async (req, res) => {
      const { topic, referenceMaterial,postedDate,status,url } = req.body;
      const newMaterial = new Reference({ topic, referenceMaterial,postedDate,status,url });
      await newMaterial.save();
      console.log(newMaterial)
      res.status(201).json(newMaterial);
    }

exports.deleteReference = async (req, res) => {
  const { id } = req.params;
  await Reference.findByIdAndDelete(id);
  res.json({ message: 'Reference material deleted' });
}
