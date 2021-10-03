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
  var rejectionReason = Props.rejectionReason;
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
  var rr = (rejectionReason == null) ? "" : "(" + rejectionReason + ")";
  return React.createElement("div", {
              className: "grid grid-cols-2 gap-5 gap-y-2 m-auto w-3/5 text-sm items-center"
            }, React.createElement("span", {
                  className: "place-self-end"
                }, Curry._1(t, "currentContest")), React.createElement("span", {
                  className: "uppercase text-sm text-brown-light2 font-header"
                }, contestName), React.createElement("span", {
                  className: "place-self-end"
                }, Curry._1(t, "status")), React.createElement("span", undefined, status), React.createElement("span", undefined), React.createElement("span", {
                  className: "text-xs"
                }, rr), React.createElement("span", {
                  className: "place-self-end"
                }, Curry._1(t, "dateReg")), React.createElement("span", {
                  className: ""
                }, date), React.createElement("div", {
                  className: "mt-10"
                }), React.createElement("div", {
                  className: "mt-10"
                }, canUpload ? React.createElement(Button.Button, {
                        children: Curry._1(t, "uploadPhoto"),
                        onClick: openUpload,
                        className: "uppercase flex-shrink-0 flex-grow-0 w-40 flex justify-center p-5"
                      }) : React.createElement("div", undefined)));
}

var make = ApplicationInfo;

export {
  Button$1 as Button,
  make ,
  
}
/* react Not a pure module */
