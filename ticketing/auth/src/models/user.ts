import mongoose from 'mongoose';


// Interaface that describes the props that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes the props that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the props that user doc has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (atrs: UserAttrs) =>{
  return new User(atrs);
}

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);


export { User };
