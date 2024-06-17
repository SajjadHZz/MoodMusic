import Navbar from "@/components/Navbar";
import MusicProvider from "@/context/MusicContext";
import "./globals.css";

export const metadata = {
  title: "MoodMusic",
  description: "Animation Website For Musics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <MusicProvider>{children}</MusicProvider>
        {/* SCROOL DOWN */}
        <div className="fixed left-1/2 bottom-2 -translate-x-1/2">
          <p className="opacity-20 w-32 -z-[1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            SCROLL DOWN
          </p>
          <svg className="arrows drop-shadow-xl shadow-green-500">
            <path className="a1" d="M0 0 L20 12 L40 0"></path>
            <path className="a2" d="M0 10 L20 22 L40 10"></path>
            <path className="a3" d="M0 20 L20 32 L40 20"></path>
          </svg>
        </div>
      </body>
    </html>
  );
}
