// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import Classnames from "classnames";

var Button = {};

function ApplicationImages(Props) {
  var images = Props.images;
  var className = Props.className;
  var match = React.useState(function () {
        return /* NoImage */0;
      });
  var selectedImage = match[0];
  var im = Belt_Array.map(images, (function (image) {
          Curry._1(Classnames("object-cover w-full h-full"), {
                "border-brown-light2 border-2 border-dotted": image === selectedImage
              });
          var src;
          src = typeof image === "number" ? "" : (
              image.TAG === /* Draft */0 ? image._0.name : image._0.filename
            );
          return React.createElement("div", undefined, React.createElement("img", {
                          src: src
                        }));
        }));
  return React.createElement("div", {
              className: "flex gap-5 overflow-x-auto h-64 p-5 overflow-y-hidden hidden-scroll " + className
            }, im);
}

var make = ApplicationImages;

export {
  Button ,
  make ,
  
}
/* react Not a pure module */