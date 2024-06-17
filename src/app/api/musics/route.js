import connectToDB from "@/config/db";
import MusicModel from "../../../models/musics";

// export async function GET() {
//   try {
//     connectToDB();
//     const brands = await BrandModel.find({}, "-__v");
//     return Response.json(brands, { status: 200 });
//   } catch (err) {
//     return Response.json({ message: err }, { status: 500 });
//   }
// }
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const musics = await MusicModel.create(body);
    return Response.json(musics, { status: 201 });
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
// export async function DELETE(req) {
//   try {
//     connectToDB();
//     const body = await req.json();
//     await BrandModel.deleteMany({ _id: { $in: body } });
//     return Response.json({ message: "Delete Brand Successfully" }, { status: 200 });
//   } catch (err) {
//     return Response.json({ message: err }, { status: 500 });
//   }
// }
