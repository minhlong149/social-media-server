import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,

    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }, // access to createdAt & updatedAt properties
);

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
