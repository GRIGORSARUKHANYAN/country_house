import { Schema, model } from "mongoose";

const AcceptSchema = new Schema({
  room: Number,
  name: String,
  surname: String,
  email: String,
  phone: Number,
  isActive: {type:Boolean,default:false},
  date:Date
});

const AcceptModel = model("Accept", AcceptSchema);

export default AcceptModel;
