import React, {useState, useEffect} from "react";
import {range} from "lodash/fp";
import cn from "classnames";


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


const photos = [];

for (let i = 0; i < 100; i++) {
  const width = randomInteger(700, 1600);
  const height = randomInteger(800, 1600);
  const p = `https://picsum.photos/seed/${randomInteger(0, 1000)}/${width}/${height}`;
  photos.push({
    id: i,
    src: p
  });
}



export default function JuryGallery() {
  const [current, setCurrent] = useState(0);
  const [left, setLeft] = useState(0);
  const handleClick = i => setCurrent(i);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [photo, setPhoto] = useState({id: 0, src: ""});
  const [mode, setMode] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    const p = photos.slice(left, left + 7);
    setVisiblePhotos(p);
    setPhoto(p[current]);
  }, [left, current, visiblePhotos]);


  const renderSwitch = () => {
    return (
      <div className="absolute left-0 grid grid-cols-2">
        <i className="text-tiny pi pi-th-large text-semi-bright mr-5" onClick={() => setMode(0)}/>
        <i className="text-tiny pi pi-table text-semi-bright" onClick={() => setMode(1)}/>
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="absolute right-0 flex flex-col items-center">
        <div className="uppercase text-brown-light text-sm-2">Красоты России и очень длинно е название тут находится</div>
        <div className="text-semi-bright text-sm-2" >{current + 1} из {photos.length}</div>
      </div>
    );
  };
  
  const renderSlider = () => {
    return (
      <div className="flex items-center justify-center">
        <i className="text-2xl cursor-pointer hover:text-brown-light pi pi-angle-left text-semi-bright" onClick={() => setLeft(l => l > 0 ? l - 1 : l)}/>
        <div className="flex-1 p-6 grid grid-cols-7 gap-8 grid-rows-1">
          {
            visiblePhotos.map((p, i) => <img onClick={() => handleClick(i)} title={i} className="w-20 h-20 cursor-pointer" key={p.id} src={p.src}/>)
          }
        </div>
        <i className="text-2xl cursor-pointer hover:text-brown-light pi pi-angle-right text-semi-bright" onClick={() => setLeft(l => l < photos.length - 1 ? l + 1 : l)}/>
      </div>
    );
  };

  const renderSingle = () => {
    return (
      <>
        <div className="flex justify-center h-full mb-16 relative">
          <div className="w-full max-w-full bg-center bg-no-repeat bg-contain duration-500 ease-in-out transition-background-image" style={{backgroundImage: `url(${photo.src})`}}/>
          <div className="absolute bottom-8">
            {renderRates()}
          </div>
        </div>
        <div className="flex items-center justify-center h-20 relative">
          {renderSwitch()}
          {renderSlider()}
          {renderInfo()}
        </div>
      </>
    );
  };

  const renderMultiple = () => {
    return (
      <>
        <ul className="flex flex-wrap mb-16 list-none">
          {
            photos.slice(0, 6 * 4).map((p, i) => (
              <li key={i} className="flex-1 h-15vh">
                <img className={"max-h-full min-w-full object-cover opacity-50 hover:opacity-100"} onClick={() => handleClick(i)} title={i} key={p.id} src={p.src}/>
              </li>
            ))
          }
          <li style={{flex: 10}}></li>
        </ul>
        
        <div className="flex items-center justify-center relative">
          {renderSwitch()}
          {renderInfo()}
        </div>
      </>
    );
  };

  const setRate = (id, r) => {
    setRates(rates =>({...rates, [id]: r}));
  };

  const renderRates = (id) => {
    return (
      <div className="flex justify-between background:bg-brown-dark p-4 items-center before:backdrop-blur-md">
        <div className="absolute left-0 right-0 top-0 bottom-0 opacity-40 bg-black"></div>
        {
          range(1, 11).map(i => {
            const hasRate = rates[id] === i;
            const className = cn("z-10 font-text w-8 h-8 flex rounded-bl text-base cursor-pointer mr-8 last:mr-0 justify-center rounded-round items-center", {
              "bg-brown-light text-dark": hasRate,
              "text-semi-bright": !hasRate
            });

            return (
              <div key={i} className={className} onClick={() => setRate(id, i)}>{i}</div>
            );
          })
        } 
      </div>
    );
  };


  return (
    <div className="container flex justify-center flex-1 bg-brown-dark" style={{minHeight: "calc(100vh - 16rem)"}}> 
      <div className="wrap pt-8 pb-8">
        {
          mode === 0 ? renderSingle() : renderMultiple()
        }
      </div>
      <canvas className="hidden" id="canvas"></canvas>
    </div>
  );
}

