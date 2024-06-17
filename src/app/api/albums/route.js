import connectToDB from "@/config/db";
import MusicAlbumModel from "@/models/music-album";

export async function GET(req) {
  connectToDB();
  try {
    const search = req.nextUrl.searchParams;
    const mood = search.get("mood");

    if (mood) {
      const products = await MusicAlbumModel.find({ mood });
      return Response.json(products);
    } else {
      const products = await MusicAlbumModel.find();
      return Response.json(products);
    }
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
