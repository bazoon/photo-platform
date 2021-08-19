import React, {useEffect, useState} from "react";
import { Button } from "primereact/button";
import {asyncGet} from "./core/api";
import {dateFormat} from "./core/utils";
import { store } from "react-recollect";
import {withRouter} from "react-router-dom";

function MainPage({history}) {
  const [info, setInfo] = useState({});

  const loadFailed = () => {

  };

  const loadOk = inf => {
    setInfo(inf);
  };

  useEffect(() => {
    asyncGet("api/mainPage").fork(loadFailed, loadOk);
  }, []);

  const renderNews = () => {
    return (
      <div className="container flex justify-center bg-gray">
        <div className="pt-20 pb-48 wrap">
          <div className="mb-12 text-2xl text-center uppercase text-color-dark">новости</div>
 
          <div className="justify-center grid gap-9 grid-cols-3">
            <div className="flex flex-col"> 
              <img className="mb-4" src="https://picsum.photos/400/350"/>
              <div className="mb-4 text-base uppercase">Новость</div>
              <div className="text-tiny">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod ligula odio, at blandit orci facilisis in. Nam mollis odio a aliquam fringilla. Maecenas lacinia, ante quis facilisis tincidunt, libero felis laoreet est, a interdum magna justo sit amet libero. Sed purus justo, pellentesque eu lacus sit amet, iaculis dignissim felis. Curabitur euismod interdum turpis, id venenatis justo accumsan sit amet. Nulla scelerisque lectus vel justo venenatis, dictum pharetra tellus maximus. Praesent dui eros, rutrum in sapien non, luctus sollicitudin dolor. Morbi et ipsum lobortis, imperdiet orci maximus, fermentum turpis. Morbi dapibus convallis auctor. Aliquam dictum pretium varius. Cras est eros, mattis dapibus interdum quis, tempus quis odio. Praesent maximus lorem sed sem luctus porttitor at ac tellus. Mauris quis fermentum felis, lobortis placerat nibh. Sed pulvinar, quam auctor tempor commodo, turpis felis dictum neque, et gravida nunc diam eget turpis. Vestibulum et purus eget erat facilisis porta quis ut felis. Donec facilisis orci vel lectus consectetur, eget bibendum nisi suscipit.
              </div>
            </div>

            <div className="flex flex-col"> 
              <img className="mb-4" src="https://picsum.photos/400/350"/>
              <div className="mb-4 text-base uppercase">Новость</div>
              <div className="text-tiny">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod ligula odio, at blandit orci facilisis in. Nam mollis odio a aliquam fringilla. Maecenas lacinia, ante quis facilisis tincidunt, libero felis laoreet est, a interdum magna justo sit amet libero. Sed purus justo, pellentesque eu lacus sit amet, iaculis dignissim felis. Curabitur euismod interdum turpis, id venenatis justo accumsan sit amet. Nulla scelerisque lectus vel justo venenatis, dictum pharetra tellus maximus. Praesent dui eros, rutrum in sapien non, luctus sollicitudin dolor. Morbi et ipsum lobortis, imperdiet orci maximus, fermentum turpis. Morbi dapibus convallis auctor. Aliquam dictum pretium varius. Cras est eros, mattis dapibus interdum quis, tempus quis odio. Praesent maximus lorem sed sem luctus porttitor at ac tellus. Mauris quis fermentum felis, lobortis placerat nibh. Sed pulvinar, quam auctor tempor commodo, turpis felis dictum neque, et gravida nunc diam eget turpis. Vestibulum et purus eget erat facilisis porta quis ut felis. Donec facilisis orci vel lectus consectetur, eget bibendum nisi suscipit.
              </div>
            </div>

            <div className="flex flex-col"> 
              <img className="mb-4" src="https://picsum.photos/400/350"/>
              <div className="mb-4 text-base uppercase ">Новость</div>
              <div className="text-tiny">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod ligula odio, at blandit orci facilisis in. Nam mollis odio a aliquam fringilla. Maecenas lacinia, ante quis facilisis tincidunt, libero felis laoreet est, a interdum magna justo sit amet libero. Sed purus justo, pellentesque eu lacus sit amet, iaculis dignissim felis. Curabitur euismod interdum turpis, id venenatis justo accumsan sit amet. Nulla scelerisque lectus vel justo venenatis, dictum pharetra tellus maximus. Praesent dui eros, rutrum in sapien non, luctus sollicitudin dolor. Morbi et ipsum lobortis, imperdiet orci maximus, fermentum turpis. Morbi dapibus convallis auctor. Aliquam dictum pretium varius. Cras est eros, mattis dapibus interdum quis, tempus quis odio. Praesent maximus lorem sed sem luctus porttitor at ac tellus. Mauris quis fermentum felis, lobortis placerat nibh. Sed pulvinar, quam auctor tempor commodo, turpis felis dictum neque, et gravida nunc diam eget turpis. Vestibulum et purus eget erat facilisis porta quis ut felis. Donec facilisis orci vel lectus consectetur, eget bibendum nisi suscipit.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPartners = () => {
    return (
      <div className="container flex justify-center bg-bright">
        <div className="pt-20 pb-48 wrap">
          <div className="mb-16 text-2xl text-center uppercase">Наши партнеры</div>
          <div className="grid gap-9 grid-cols-4 grid-rows-2">
            <img className="w-full mb-4" src="https://picsum.photos/seed/1/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/2/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/3/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/4/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/5/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/6/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/7/400/350"/>
            <img className="w-full mb-4" src="https://picsum.photos/seed/8/400/350"/>
          </div>
        </div>
      </div>
    );
  };

  const handleSendPhoto = () => {
    if (!store.user) {
      history.push("/signup");
    }
  };

  const renderStats = () => {
    return null;
    // return (
    //   <div className="flex justify-center mt-12 uppercase text-white-80">
    //     <div className="p-10">
    //       <div className="text-lg">2762</div>
    //       <div className="text-sm">УЧАСТНИКОВ</div>
    //     </div>
    //     <div className="p-10">
    //       <div className="text-lg">8212</div>
    //       <div className="text-sm">фотографий</div>
    //     </div>
    //   </div>
    // );
  };


  return (
    <>
      <div className="container flex justify-center bg-darkgreen"> 
        <div className="pb-40 wrap">
          <h1 style={{fontSize: 40, color: "#F87171"}}>
Сайт на технологическом тестировании. По вопросам конкурса до 25.08 можно обращаться Тф 79058231904 мейл manulovsv@mail.ru
          </h1>
          <div className="mt-20 text-center uppercase text-11xl text-white-80 font-header">
            {info.name}
          </div>
          <div className="mt-10 text-center uppercase text-tiny text-white-80">
            {info.subname}
          </div>
          <div className="mt-24 text-center uppercase text-tiny text-white-80">
            прием работ {dateFormat(info.dateStart)} - {dateFormat(info.dateStop)} 
            <br/>
          </div>
          <br/><br/>
          {renderStats()}
          <div className="flex justify-center">
            <Button className="uppercase" onClick={handleSendPhoto}>отправить фото</Button>
            <div className="mr-12"></div>
            {null && <Button className="uppercase p-button-secondary">проголосовать</Button>}
          </div>
        </div>
      </div>
    </>
  );
}


export default(withRouter(MainPage));
