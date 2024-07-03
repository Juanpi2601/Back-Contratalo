import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String, required: true }
});

const Work = mongoose.model('Trabaja', workSchema);

export default Work;