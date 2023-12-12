import type { Label } from '../typings/Label';

import mongoose, { Schema } from 'mongoose';

const labelSchema: Schema<Label> = new Schema({
  labelID: {
    type: String,
    unique: true,
    immutable: true,
  },
  name: {
    type: String,
    unique: true,
  },
  isDefault: {
    type: Boolean,
  },
}, {
  collection: 'labels',
  versionKey: false,
});

const labelModel = mongoose.model<Label>('Label', labelSchema);

export default labelModel;
