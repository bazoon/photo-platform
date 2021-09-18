// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as ReactI18next from "react-i18next";
import * as Button from "primereact/button";

var Button$1 = {};

function ApplicationInfo(Props) {
  var contestName = Props.contestName;
  var status = Props.status;
  var dateReg = Props.dateReg;
  var openUpload = Props.openUpload;
  var canUpload = Props.canUpload;
  var match = ReactI18next.useTranslation("namespace1");
  var t;
  if (match.length !== 3) {
    t = (function (a) {
        return a;
      });
  } else {
    var t$1 = match[0];
    t = (function (a) {
        return Curry._2(t$1, a, "");
      });
  }
  var date = (dateReg == null) ? "" : new Date(dateReg).toLocaleDateString();
  return React.createElement("div", {
              className: "grid grid-cols-2 m-auto w-3/5 text-base items-baseline"
            }, React.createElement("div", undefined, Curry._1(t, "currentContest")), React.createElement("div", {
                  className: "uppercase text-lg text-brown-light2 font-header"
                }, contestName), React.createElement("div", undefined, Curry._1(t, "status")), React.createElement("div", undefined, status), React.createElement("div", undefined, Curry._1(t, "dateReg")), React.createElement("div", undefined, date), React.createElement("div", {
                  className: "mt-10"
                }), React.createElement("div", {
                  className: "mt-10"
                }, canUpload ? React.createElement(Button.Button, {
                        children: Curry._1(t, "uploadPhoto"),
                        onClick: openUpload
                      }) : React.createElement("div", undefined)));
}

var make = ApplicationInfo;

export {
  Button$1 as Button,
  make ,
  
}
/* react Not a pure module */