import React, {useState, useEffect} from "react";


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


const photos = [];
for (let i = 0; i < 100; i++) {
  const width = randomInteger(600, 1000);
  const height = randomInteger(600, 1000);
  const p = `https://picsum.photos/seed/${randomInteger(0, 1000)}/${width}/${height}`;
  photos.push(p);
}



export default function JuryGallery() {
  const [current, setCurrent] = useState(0);
  const [left, setLeft] = useState(0);
  const handleClick = i => setCurrent(i);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setVisiblePhotos(photos.slice(left, left + 7));
  }, [left]);

  useEffect(() => {
    setPhoto(visiblePhotos[current]);
  }, [current, visiblePhotos]);



  return (

    <div className="container flex justify-center flex-1 bg-brown-dark"> 
      <div className="relative wrap">
        <div className="flex justify-center h-full">
          <div className="w-full max-w-full bg-center bg-no-repeat bg-contain duration-500 ease-in-out transition-background-image" style={{backgroundImage: `url(${photo})`}}/>
        </div>
        <div className="flex items-center justify-center">
          <div className="absolute left-0 grid grid-cols-2">
            <i className="text-tiny pi pi-th-large text-bright"/>
          </div>

          <div className="flex items-center justify-center">
            <i className="text-2xl cursor-pointer hover:text-brown-light pi pi-angle-left text-bright" onClick={() => setLeft(l => l > 0 ? l - 1 : l)}/>
            <div className="flex-1 p-6 grid grid-cols-7 gap-8">
              {
                visiblePhotos.map((p, i) => <img onClick={() => handleClick(i)} title={i} className="w-20 h-20 cursor-pointer" key={p} src={p}/>)
              }
            </div>
            <i className="text-2xl cursor-pointer hover:text-brown-light pi pi-angle-right text-bright" onClick={() => setLeft(l => l < photos.length - 1 ? l + 1 : l)}/>
          </div>

          <div className="absolute right-0 flex flex-col items-center">
            <div className="uppercase text-brown-light text-sm-2">Красоты России</div>
            <div className="text-bright text-sm-2" >{current + 1} из {photos.length}</div>
          </div>

        </div>
      </div>
    </div>
  );
}

