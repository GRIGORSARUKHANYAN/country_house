import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  birthDay: Date,
  isAdmin: {type:Boolean ,default:false}
});

const UserModel = model('User', UserSchema);

export default UserModel;
