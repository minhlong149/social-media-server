import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // unique login credential, each must be validate
    // before sending request to create a model
    username: String,
    email: String,
    phone: String,
    password: String,

    // basic profile info
    firstName: String,
    lastName: String,
    gender: String,
    dateOfBirth: Date,
    address: String,
    avatarURL: String,

    // when an another user A send a friend request to user B,
    // the id of user A will first be added to the user B friendsList array
    friendsList: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: String,
      },
    ],
    // saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true, // access to createdAt & updatedAt properties
    toJSON: { virtuals: true }, // include virtuals in `res.json()`
  },
);

// A virtual is a property that is not stored in MongoDB.
// Virtuals are typically used for computed properties on documents.

// add a virtual property to the userSchema
// instead of storing duplicated array posts
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

// await User.findOne().populate('posts').posts; // arrays of a user's posts

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', userSchema);
export default User;
