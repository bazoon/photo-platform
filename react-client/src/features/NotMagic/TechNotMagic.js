import React, {useState} from "react";
import { Dialog } from "primereact/dialog";

export default function Main() {
  const [visible, setVisible] = useState(false); 
  const [img, setImg] = useState("");

  const items = [
    {
      text: "Нейростимулятор Brainstorm",
      n: 1,
      count: [1, 2, 3]
    },
    {
      text: "Биомиметические импланты команды Biomimetix",
      n: 2,
      count: [1, 2, 3]
    },
    {
      text: "Препарат Брумель Атема",
      n: 3,
      count: [1, 2]
    },
    {
      text: "Инвалидные коляски Caterwil GTS",
      n: 4,
      count: [1, 2, 3]
    },
    {
      text: "Робот дезинфектор компании специальные технологии контроля",
      n: 5,
      count: [1, 2, 3]
    },
    {
      text: "Протезы рук SmartLi компании Технобионик",
      n: 6,
      count: [1, 2, 3]
    },
    {
      text: "Система носимых устройств Здоровье 2.0",
      n: 7,
      count: [1, 2]
    },
    {
      text: "Экзоскелеты ЭКЗАР",
      n: 8,
      count: [1, 2, 3]
    },
    {
      text: "Геропротектор MitoKey",
      n: 9,
      count: [1, 2, 3]
    },
    {
      text: "Профилактика внутречерепных осложнений и стойкой тугоухости у детей.",
      n: 10,
      count: [1, 2]
    }
  ];

  const onHide = () => {
    setVisible(false);
  };

  const show = (img) => {
    setVisible(true);
    setImg(img);
  };

  return (
    <div className="w-3/4 pl-20 pr-20 flex flex-col items-center m-auto bg-brown-dark2 text-semi-bright"> 
      <h1 className="text-7xl">Технологии</h1>
      {
        items.map(item => {
          return (
            <div key={item.n} className="mb-10">
              <div className="text-4xl mb-3">{item.text}</div>
              <div className="grid gap-5 grid-cols-3">
                {item.count.map(i => <img onClick={() => show(`images/nomagic-tech/file${item.n}-${i}.jpg`)} className="w-full cursor-pointer" src={`images/nomagic-tech/file${item.n}-${i}.jpg`} key={i}></img>)}
              </div>
            </div>
          );
        })
      }
      <Dialog visible={visible} onHide={onHide}  style={{width: "50vw"}}>
        <img className="w-full" src={img}/>
      </Dialog>
    </div>
  );
}
