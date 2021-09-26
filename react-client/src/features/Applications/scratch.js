const {get, nth, map, compose, keys, curry, isEmpty} = require("lodash/fp");
const { Form, Field } = require("react-final-form");
const {over, findLens, pathLens} = require("lodash-lens");
const Async = require("crocks/Async");

const daggy = require("daggy");
const identity = require("crocks/combinators/identity");

const Photowork = daggy.tagged("Photowork", ["id", "name", "filename", "year", "place", "description"]);

const UploadImage = daggy.taggedSum("UploadImage", {
  Some: ["photowork", "file"],
  Empty: []
});

const Section = daggy.taggedSum("Section", {
  Filled: ["id", "name", "maxCountImg", "images"],
  None: []
});




const sections_ = [
    {
        "id": 9,
        "name": "Леса РФ",
        "maxCountImg": 19,
        "images": [
            {
                "photowork": {
                    "id": 452,
                    "name": "lllak",
                    "filename": "/uploads/images (41).jpeg",
                    "year": "2021",
                    "place": "kdkk",
                    "description": "0002"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 453,
                    "name": "Cool",
                    "filename": "/uploads/101075562.jpg",
                    "year": "2021",
                    "place": "sleep",
                    "description": "20222"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 454,
                    "name": "4444",
                    "filename": "/uploads/976f0d677081a2b_810x315.png",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 455,
                    "name": "Cool3",
                    "filename": "/uploads/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 456,
                    "name": "Sire",
                    "filename": "/uploads/random-pic-internet-22.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            }
        ]
    },
    {
        "id": 10,
        "name": "Озера Китая",
        "maxCountImg": 5,
        "images": [
            {
                "photowork": {
                    "id": 452,
                    "name": "lllak",
                    "filename": "/uploads/images (41).jpeg",
                    "year": "2021",
                    "place": "kdkk",
                    "description": "0002"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 453,
                    "name": "Cool",
                    "filename": "/uploads/101075562.jpg",
                    "year": "2021",
                    "place": "sleep",
                    "description": "20222"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 454,
                    "name": "4444",
                    "filename": "/uploads/976f0d677081a2b_810x315.png",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 455,
                    "name": "Cool3",
                    "filename": "/uploads/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 456,
                    "name": "Sire",
                    "filename": "/uploads/random-pic-internet-22.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            }
        ]
    },
    {
        "id": 11,
        "name": "Тундры Африки",
        "maxCountImg": 2,
        "images": [
            {
                "photowork": {
                    "id": 452,
                    "name": "lllak",
                    "filename": "/uploads/images (41).jpeg",
                    "year": "2021",
                    "place": "kdkk",
                    "description": "0002"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 453,
                    "name": "Cool",
                    "filename": "/uploads/101075562.jpg",
                    "year": "2021",
                    "place": "sleep",
                    "description": "20222"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 454,
                    "name": "4444",
                    "filename": "/uploads/976f0d677081a2b_810x315.png",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 455,
                    "name": "Cool3",
                    "filename": "/uploads/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 456,
                    "name": "Sire",
                    "filename": "/uploads/random-pic-internet-22.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            }
        ]
    },
    {
        "id": 12,
        "name": "Саванны Америки",
        "maxCountImg": 3,
        "images": [
            {
                "photowork": {
                    "id": 452,
                    "name": "lllak",
                    "filename": "/uploads/images (41).jpeg",
                    "year": "2021",
                    "place": "kdkk",
                    "description": "0002"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 453,
                    "name": "Cool",
                    "filename": "/uploads/101075562.jpg",
                    "year": "2021",
                    "place": "sleep",
                    "description": "20222"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 454,
                    "name": "4444",
                    "filename": "/uploads/976f0d677081a2b_810x315.png",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 455,
                    "name": "Cool3",
                    "filename": "/uploads/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 456,
                    "name": "Sire",
                    "filename": "/uploads/random-pic-internet-22.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            }
        ]
    },
    {
        "id": 13,
        "name": "Равнины Японии",
        "maxCountImg": 1,
        "images": [
            {
                "photowork": {
                    "id": 452,
                    "name": "lllak",
                    "filename": "/uploads/images (41).jpeg",
                    "year": "2021",
                    "place": "kdkk",
                    "description": "0002"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 453,
                    "name": "Cool",
                    "filename": "/uploads/101075562.jpg",
                    "year": "2021",
                    "place": "sleep",
                    "description": "20222"
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 454,
                    "name": "4444",
                    "filename": "/uploads/976f0d677081a2b_810x315.png",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 455,
                    "name": "Cool3",
                    "filename": "/uploads/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            },
            {
                "photowork": {
                    "id": 456,
                    "name": "Sire",
                    "filename": "/uploads/random-pic-internet-22.jpg",
                    "year": "    ",
                    "place": "",
                    "description": ""
                },
                "file": null
            }
        ]
    }
];
const images_ = [
    {
        "id": 445,
        "name": "Cool",
        "filename": "/uploads/41g6jROgo0L.png",
        "year": "2021",
        "place": "sleep",
        "description": "20222"
    },
    {
        "id": 446,
        "name": "Cool",
        "filename": "/uploads/1200px-Random-6.jpg",
        "year": "2021",
        "place": "sleep",
        "description": "20222"
    },
    {
        "id": 447,
        "name": "Cool",
        "filename": "/uploads/4261f7b9e393e8830cdfaec30970a888.jpg",
        "year": "2221",
        "place": "22",
        "description": "232"
    },
    {
        "id": 448,
        "name": "Cool",
        "filename": "/uploads/cover-1592583478818.png",
        "year": "2021",
        "place": "sleep",
        "description": "20222"
    },
    {
        "id": 449,
        "name": "Cool",
        "filename": "/uploads/Без названия (1).jpeg",
        "year": "2021",
        "place": "2222",
        "description": "20222"
    },
    {
        "id": 450,
        "name": "Cool",
        "filename": "/uploads/Без названия (17).jpeg",
        "year": "2021",
        "place": "111",
        "description": "222"
    },
    {
        "id": 451,
        "name": "Cool",
        "filename": "/uploads/Без названия (10).jpeg",
        "year": "2021",
        "place": "sleep",
        "description": "20222"
    }
];



const toUploadImage = i => ({photowork: Photowork.from(i), file: ""});
const toSection = s => (Section.Filled.from({...s, images: s.images.map(i => toUploadImage(i.photowork))}));
const sections = sections_.map(toSection);
const images = images_.map(toUploadImage);

function asyncGet(url) {
  return Async.Resolved(images.slice(0,2));
}

const loadImages = (sections, {id}) => {
  const url = `api/sections/${id}/images`;
  const toUploadImage = compose(
    p => UploadImage.Some.from({photowork: p, file: null}),
    im => Photowork.from(im.photowork)
  );

  const updateSection = uploadImages => section => {
    // console.info(uploadImages, section);
     const s = Section.Filled.from({...section, images: uploadImages, id});
  //  console.info(s);
    return s;
  };

  const applyToSection = sections => uploadImages =>  {
    // console.info(sections, uploadImages);
    const e = over(findLens({id}), updateSection(uploadImages), sections);
    console.info(e);
    return e;
  };

  return asyncGet(url)
    .map(map(toUploadImage))
    .map(applyToSection(sections)).toPromise();
};

const promise = loadImages(sections, {id: 12});


promise.then(r => {
  // console.log(r);
});


// asyncGet(`api/sections/${id}/images`).map(
//   images => ({ images: map(
//     compose(p => UploadImage.Some.from({photowork: p, file: null}), Photowork.from), images), id})).toPromise(),




