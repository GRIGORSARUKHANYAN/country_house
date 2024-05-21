import { Schema, model } from 'mongoose';

const LessonSchema = new Schema({
  title: String,
  text: String
});

const LessonModel = model('Lesson', LessonSchema);

export default LessonModel;
