import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
      unique: true,
    },
    musics: [String],
    mood: {
      type: String,
      enum: ["EPIC", "HAPPY", "SAD"],
      required: true,
    },
  },
  { timestamps: true }
);

const MusicAlbumModel = mongoose.models.Music_Album || mongoose.model("Music_Album", schema);

export default MusicAlbumModel;
