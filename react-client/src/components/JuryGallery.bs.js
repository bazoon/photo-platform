// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as ReactI18next from "react-i18next";
import * as ApiJs from "../core/api.js";
import * as Dialog from "primereact/dialog";
import * as Dropdown from "primereact/dropdown";

function asyncGetSections(prim) {
  return ApiJs.asyncGet(prim);
}

function asyncGetImages(prim) {
  return ApiJs.asyncGet(prim);
}

function asyncPutRate(prim0, prim1) {
  return ApiJs.asyncPut(prim0, prim1);
}

var Dialog$1 = {};

var Button = {};

var RadioButton = {};

var Dropdown$1 = {};

function JuryGallery(Props) {
  ReactI18next.useTranslation("namespace1");
  var ref = React.useRef(null);
  React.useState(function () {
        return 0;
      });
  React.useState(function () {
        return 0;
      });
  React.useState(function () {
        return [];
      });
  React.useState(function () {
        
      });
  var match = React.useState(function () {
        return /* SINGLE */0;
      });
  var setMode = match[1];
  var match$1 = React.useState(function () {
        return [];
      });
  var setSections = match$1[1];
  var match$2 = React.useState(function () {
        
      });
  var setSection = match$2[1];
  var match$3 = React.useState(function () {
        
      });
  var setSelectedImage = match$3[1];
  var selectedImage = match$3[0];
  var match$4 = React.useState(function () {
        return false;
      });
  var setIsPreview = match$4[1];
  var isPreview = match$4[0];
  var cleanUp = function (param) {
    
  };
  var failed = function (param) {
    
  };
  var loadSection = function (s) {
    var id = s !== undefined ? s.id : "";
    return Curry._3(ApiJs.asyncGet("api/jury/images/" + id).fork, failed, (function (param) {
                  var id = s !== undefined ? s.id : "";
                  Curry._1(setSections, (function (sections) {
                          var newSections = Belt_Array.map(sections, (function (x) {
                                  if (x.id === id) {
                                    return {
                                            id: x.id,
                                            name: x.name,
                                            images: param
                                          };
                                  } else {
                                    return x;
                                  }
                                }));
                          Curry._1(setSection, (function (param) {
                                  return Belt_Array.getBy(newSections, (function (e) {
                                                return e.id === id;
                                              }));
                                }));
                          Curry._1(setSelectedImage, (function (param$1) {
                                  return Belt_Array.get(param, 0);
                                }));
                          return newSections;
                        }));
                  
                }), cleanUp);
  };
  var sectionsOk = function (data) {
    Curry._1(setSections, (function (param) {
            return data;
          }));
    var s = Belt_Array.get(data, 0);
    loadSection(s);
    
  };
  var loadSections = function (param) {
    Curry._3(ApiJs.asyncGet("api/jury/sections").fork, failed, sectionsOk, cleanUp);
    
  };
  React.useEffect((function () {
          loadSections(undefined);
          
        }), []);
  var renderSwitch = function (param) {
    return React.createElement("div", {
                className: "absolute left-0 grid grid-cols-2"
              }, React.createElement("i", {
                    className: "text-tiny pi pi-th-large text-semi-bright mr-5",
                    onClick: (function (param) {
                        return Curry._1(setMode, (function (param) {
                                      return /* SINGLE */0;
                                    }));
                      })
                  }), React.createElement("i", {
                    className: "text-tiny pi pi-table text-semi-bright",
                    onClick: (function (param) {
                        return Curry._1(setMode, (function (param) {
                                      return /* MULTI */1;
                                    }));
                      })
                  }));
  };
  var renderSections = function (sections, section) {
    return React.createElement(Dropdown.Dropdown, {
                options: sections,
                className: "w-full",
                value: section,
                optionLabel: "name",
                optionsValue: "id",
                onChange: (function (e) {
                    loadSection(Belt_Array.getBy(sections, (function (s) {
                                return s.id === e.value.id;
                              })));
                    
                  })
              });
  };
  var hidePreview = function (param) {
    return Curry._1(setIsPreview, (function (param) {
                  return false;
                }));
  };
  var renderPreview = function (im) {
    return React.createElement(Dialog.Dialog, {
                children: im !== undefined ? React.createElement("div", undefined, React.createElement("img", {
                            className: "preview",
                            src: im.filename
                          })) : React.createElement("div", undefined),
                onHide: hidePreview,
                visible: isPreview,
                header: false,
                maximized: true,
                contentClassName: "flex justify-center",
                maximizable: true
              });
  };
  var renderImage = function (im) {
    return React.createElement("img", {
                key: im.id,
                className: "w-24 h-24 cursor-pointer",
                title: im.name,
                src: im.filename,
                onClick: (function (param) {
                    var isSelected = selectedImage !== undefined ? Caml_obj.caml_equal(selectedImage, im) : false;
                    if (isSelected) {
                      return Curry._1(setIsPreview, (function (param) {
                                    return true;
                                  }));
                    } else {
                      return Curry._1(setSelectedImage, (function (param) {
                                    return im;
                                  }));
                    }
                  })
              });
  };
  var renderSlider = function (section) {
    var images = section !== undefined ? section.images : [];
    var visible = Belt_Array.map(images, renderImage);
    return React.createElement("div", {
                className: "flex items-center justify-center relative"
              }, React.createElement("i", {
                    className: "text-2xl left-5 absolute cursor-pointer hover:text-brown-light pi pi-angle-left text-semi-bright",
                    onClick: (function (param) {
                        var dom = ref.current;
                        if (!(dom == null)) {
                          dom.scrollBy(-50, 0);
                          return ;
                        }
                        
                      })
                  }), React.createElement("div", {
                    ref: ref,
                    className: "flex gap-5 overflow-x-auto p-5 w-4/5 overflow-y-hidden invisible-scroll relative"
                  }, visible), React.createElement("i", {
                    className: "text-2xl absolute right-5 cursor-pointer hover:text-brown-light pi pi-angle-right text-semi-bright",
                    onClick: (function (param) {
                        var dom = ref.current;
                        if (!(dom == null)) {
                          dom.scrollBy(50, 0);
                          return ;
                        }
                        
                      })
                  }));
  };
  var rateOk = function (d) {
    console.log(d);
    
  };
  var renderRates = function (img, section) {
    var hasRate = function (r) {
      if (img !== undefined) {
        return img.rate === r;
      } else {
        return false;
      }
    };
    var baseCls = "z-10 font-text w-8 h-8 flex rounded-full text-base cursor-pointer mr-8 last:mr-0 justify-center\n    rounded-round items-center text-semi-bright";
    return React.createElement("div", {
                className: "flex justify-between background:bg-brown-dark p-4 items-center before:backdrop-blur-md"
              }, React.createElement("div", {
                    className: "absolute left-0 right-0 top-0 bottom-0 opacity-40 bg-black"
                  }), Belt_Array.map(Belt_Array.range(1, 10), (function (i) {
                      var className = hasRate(i) ? "z-10 font-text w-8 h-8 flex rounded-full text-base cursor-pointer mr-8 last:mr-0 justify-center\n    rounded-round items-center text-semi-bright bg-brown-light text-dark" : baseCls;
                      return React.createElement("div", {
                                  key: String(i),
                                  className: className,
                                  onClick: (function (param) {
                                      if (img !== undefined && section !== undefined) {
                                        Curry._1(setSections, (function (sections) {
                                                var newImage_id = img.id;
                                                var newImage_description = img.description;
                                                var newImage_filename = img.filename;
                                                var newImage_name = img.name;
                                                var newImage_place = img.place;
                                                var newImage_year = img.year;
                                                var newImage = {
                                                  id: newImage_id,
                                                  description: newImage_description,
                                                  filename: newImage_filename,
                                                  name: newImage_name,
                                                  place: newImage_place,
                                                  year: newImage_year,
                                                  rate: i
                                                };
                                                var newImages = Belt_Array.map(section.images, (function (im) {
                                                        if (im.id === img.id) {
                                                          return newImage;
                                                        } else {
                                                          return im;
                                                        }
                                                      }));
                                                var newSection_id = section.id;
                                                var newSection_name = section.name;
                                                var newSection = {
                                                  id: newSection_id,
                                                  name: newSection_name,
                                                  images: newImages
                                                };
                                                var newSections = Belt_Array.map(sections, (function (x) {
                                                        if (x.id === newSection_id) {
                                                          return newSection;
                                                        } else {
                                                          return x;
                                                        }
                                                      }));
                                                Curry._1(setSection, (function (param) {
                                                        return Belt_Array.getBy(newSections, (function (e) {
                                                                      return e.id === newSection_id;
                                                                    }));
                                                      }));
                                                Curry._1(setSelectedImage, (function (param) {
                                                        return newImage;
                                                      }));
                                                Curry._3(ApiJs.asyncPut("api/jury/image/" + img.id, {
                                                          rate: i
                                                        }).fork, failed, rateOk, cleanUp);
                                                return newSections;
                                              }));
                                      }
                                      
                                    })
                                }, String(i));
                    })));
  };
  var renderSingle = function (im, sections, section) {
    var match = im !== undefined ? [
        im.filename,
        im.name
      ] : [
        "",
        ""
      ];
    return React.createElement("div", {
                className: "flex flex-col h-full"
              }, React.createElement("div", {
                    className: "flex justify-center h-full relative"
                  }, React.createElement("img", {
                        className: "responsive",
                        src: match[0]
                      }), React.createElement("div", {
                        className: "absolute bottom-32"
                      }, renderRates(im, section)), React.createElement("div", {
                        className: "absolute bottom-20 text-4xl text-bright"
                      }, match[1])), React.createElement("div", {
                    className: "flex items-center justify-center h-24 relative"
                  }, renderSwitch(undefined), React.createElement("div", {
                        className: "mb-5"
                      }, renderSlider(section)), React.createElement("div", {
                        className: "absolute w-1/5 right-0"
                      }, renderSections(sections, section))));
  };
  var style = {
    minHeight: "calc(100vh - 16rem)"
  };
  return React.createElement("div", {
              className: "container flex justify-center flex-1 bg-brown-dark",
              style: style
            }, React.createElement("div", {
                  className: "wrap"
                }, renderSingle(selectedImage, match$1[0], match$2[0])), renderPreview(selectedImage));
}

var make = JuryGallery;

export {
  asyncGetSections ,
  asyncGetImages ,
  asyncPutRate ,
  Dialog$1 as Dialog,
  Button ,
  RadioButton ,
  Dropdown$1 as Dropdown,
  make ,
  
}
/* react Not a pure module */
