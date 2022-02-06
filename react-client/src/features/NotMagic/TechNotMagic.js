import React, {useState} from "react";
import { Dialog } from "primereact/dialog";
import "../../images/p-01.jpg";
import "../../images/p-02.jpg";
import "../../images/p-03.jpg";

import file11 from "../../images/nomagic-tech/file1-1.jpg";
import file12 from "../../images/nomagic-tech/file1-2.jpg";
import file13 from "../../images/nomagic-tech/file1-3.jpg";
import file21 from "../../images/nomagic-tech/file2-1.jpg";
import file22 from "../../images/nomagic-tech/file2-2.jpg";
import file23 from "../../images/nomagic-tech/file2-3.jpg";
import file31 from "../../images/nomagic-tech/file3-1.jpg";
import file32 from "../../images/nomagic-tech/file3-2.jpg";
import file41 from "../../images/nomagic-tech/file4-1.jpg";
import file42 from "../../images/nomagic-tech/file4-2.jpg";
import file43 from "../../images/nomagic-tech/file4-3.jpg";
import file51 from "../../images/nomagic-tech/file5-1.jpg";
import file52 from "../../images/nomagic-tech/file5-2.jpg";
import file53 from "../../images/nomagic-tech/file5-3.jpg";
import file61 from "../../images/nomagic-tech/file6-1.jpg";
import file62 from "../../images/nomagic-tech/file6-2.jpg";
import file63 from "../../images/nomagic-tech/file6-3.jpg";
import file71 from "../../images/nomagic-tech/file7-1.jpg";
import file72 from "../../images/nomagic-tech/file7-2.jpg";
import file81 from "../../images/nomagic-tech/file8-1.jpg";
import file82 from "../../images/nomagic-tech/file8-2.jpg";
import file83 from "../../images/nomagic-tech/file8-3.jpg";
import file91 from "../../images/nomagic-tech/file9-1.jpg";
import file92 from "../../images/nomagic-tech/file9-2.jpg";
import file93 from "../../images/nomagic-tech/file9-3.jpg";
import file101 from "../../images/nomagic-tech/file10-1.jpg";
import file102 from "../../images/nomagic-tech/file10-2.jpg";

export default function Main() {
  const [visible, setVisible] = useState(false); 
  const [img, setImg] = useState("");

  const items = [
    {
      text: "Нейростимулятор Brainstorm",
      n: 1,
      count: [file11, file12, file13]
    },
    {
      text: "Биомиметические импланты команды Biomimetix",
      n: 2,
      count: [file21, file22, file23]
    },
    {
      text: "Препарат Брумель Атема",
      n: 3,
      count: [file31, file32]
    },
    {
      text: "Инвалидные коляски Caterwil GTS",
      n: 4,
      count: [file41, file42, file43]
    },
    {
      text: "Робот дезинфектор компании специальные технологии контроля",
      n: 5,
      count: [file51, file52, file53]
    },
    {
      text: "Протезы рук SmartLi компании Технобионик",
      n: 6,
      count: [file61, file62, file63]
    },
    {
      text: "Система носимых устройств Здоровье 2.0",
      n: 7,
      count: [file71, file72]
    },
    {
      text: "Экзоскелеты ЭКЗАР",
      n: 8,
      count: [file81, file82, file83]
    },
    {
      text: "Геропротектор MitoKey",
      n: 9,
      count: [file91, file92, file93]
    },
    {
      text: "Профилактика внутречерепных осложнений и стойкой тугоухости у детей.",
      n: 10,
      count: [file101, file102]
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
                {item.count.map(i => <img onClick={() => show(i)} className="w-full cursor-pointer" src={i} key={i}></img>)}
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
