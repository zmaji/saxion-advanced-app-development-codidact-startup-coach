import type { Roadmap } from '../typings/Roadmap';

import mongoose, { Schema } from 'mongoose';

const roadmapSchema: Schema<Roadmap> = new Schema({
  roadmapID: {
    type: String,
    unique: true,
    immutable: true,
  },
  title: {
    type: String,
    required: true,
  },
}, {
  collection: 'roadmaps',
  versionKey: false,
});

const RoadmapModel = mongoose.model<Roadmap>('Module', roadmapSchema);

export default RoadmapModel;
