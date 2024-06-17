export default function Navbar() {
  // useEffect(() => {
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("GET", "http://localhost:3000/", true);

  //   xhr.onload = function () {
  //     // console.log(this.DONE);
  //     var progress = (this.DONE / this.responseText.length) * 100; // To calculate the progress percentage
  //     console.log("Progress: " + progress + "%"); // You can use this value as you want
  //   };

  //   xhr.onprogress = function (event) {
  //     console.log(event.loaded);
  //     console.log(event);
  //     // You can also use this method to get more information
  //     console.log("Progress: " + (event.loaded / event.timeStamp) * 100 + "%");
  //   };

  //   xhr.send();
  // }, []);

  return (
    <>
      {/* <input className="peer" type="checkbox" id="menu_navbar_checkbox" hidden />
      <div className="peer-checked:-translate-x-full flex flex-col justify-center items-center gap-6 fixed top-0 left-full z-10 w-full h-[100vh] bg-black/80 text-7xl sm:text-9xl text-white transition-transform duration-700 font-Temp">
        <p className="cursor-pointer transition-all duration-500 hover:scale-110 hover:text-shadow">HOME</p>
        <p className="cursor-pointer transition-all duration-500 hover:scale-110 hover:text-shadow">ABOUT</p>
      </div> */}
      <nav className="group fixed top-0 z-10 px-4 py-2 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <svg className="w-14 fill-green-500" viewBox="0 0 87.86 99.79">
            <path d="M38,78.86c-6.25,0-10.93-4.08-11.59-10.29-1-9.54,7.36-15.82,14.93-19l-7.7-24a5.39,5.39,0,0,1,7.8-6.32L67,33.91a5.38,5.38,0,0,1-5.34,9.34L48.1,35.49l4.81,15a5,5,0,0,1,.38,1,4.48,4.48,0,0,1,.11.5l2.11,6.57a5,5,0,0,1,.25,1.28c.72,10.42-8,18.22-16.51,19Q38.59,78.86,38,78.86Zm6.66-19c-3.86,1.79-7.87,4.56-7.55,7.57a1.92,1.92,0,0,0,.14.59,5.78,5.78,0,0,0,4.12-1A7.14,7.14,0,0,0,45,61.13Z" />
            <path d="M43.93,99.79a5.37,5.37,0,0,1-2.69-.72L2.69,76.81A5.39,5.39,0,0,1,0,72.15V27.64A5.39,5.39,0,0,1,2.69,23L41.24.72a5.39,5.39,0,0,1,5.38,0L85.17,23a5.37,5.37,0,0,1,2.69,4.66V72.15a5.37,5.37,0,0,1-2.69,4.66L46.62,99.07A5.37,5.37,0,0,1,43.93,99.79ZM10.77,69,43.93,88.19,77.09,69V30.75L43.93,11.6,10.77,30.75Z" />
          </svg>
          <p className="text-4xl text-green-500 font-Temp">MoodMusic</p>
        </div>

        {/* <label
          htmlFor="menu_navbar_checkbox"
          className="flex flex-col justify-center items-center w-8 h-8 mr-4 cursor-pointer gap-2 peer-checked:group-[]:gap-0 transition-all duration-300"
        >
          <span className="w-8 h-px inline-block bg-white peer-checked:group-[]:rotate-45 transition-transform duration-700"></span>
          <span className="w-8 h-px inline-block bg-white peer-checked:group-[]:opacity-0 transition-opacity"></span>
          <span className="w-8 h-px inline-block bg-white peer-checked:group-[]:-rotate-45 transition-transform duration-700"></span>
        </label> */}
      </nav>
    </>
  );
}
