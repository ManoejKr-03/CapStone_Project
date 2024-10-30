import mongoose,{Schema,Document} from 'mongoose';

export interface IUser extends Document {
  u_id: number;
  username: string;
  name:string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema({
  u_id: { type: Number, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['player', 'team-manager', 'organizer'], required: true },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

//export const User = mongoose.model('User', UserSchema);
