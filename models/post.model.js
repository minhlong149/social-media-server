import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    caption: String,
    mediaURL: String,

    // if another user share a post, that will also be a post, therefore create a new post document
    // originalPost can be null if this is an original post (not share from anyone else)
    originalPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    privacy: String,
    hashtags: [String],
  },
  { timestamps: true }, // access to createdAt & updatedAt properties
);

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
