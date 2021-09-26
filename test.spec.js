const fc = require("fast-check");
const {get, nth, map, compose, keys, curry, isEmpty} = require("lodash/fp");
const { Form, Field } = require("react-final-form");
const {over, findLens, pathLens} = require("lodash-lens");
const Async = require("crocks/Async");
const daggy = require("daggy");
const identity = require("crocks/combinators/identity");
const test = require("tape");



///*bug*/ const contains = (pattern, text) => text.substr(1).indexOf(pattern) !== -1;
const contains = (pattern, text) => text.indexOf(pattern) !== -1;

test("The concatenation of a, b and c always contains b", () => {
  fc.assert(
    fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
      return contains(b, a + b + c);
    })
  );
});
test("Also works with expect", () => {
  fc.assert(
    fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
      expect(contains(b, a + b + c)).toBe(true);
    })
  );
});



// const Photowork = daggy.tagged("Photowork", ["id", "name", "filename", "year", "place", "description"]);

// const UploadImage = daggy.taggedSum("UploadImage", {
//   Some: ["photowork", "file"],
//   Empty: []
// });

// const Section = daggy.taggedSum("Section", {
//   Filled: ["id", "name", "maxCountImg", "images"],
//   None: []
// });


// const contains = (text, pattern) => text.indexOf(pattern) >= 0;

// describe("properties", () => {
//   it("should always contain itself", () => {
//     fc.assert(fc.property(fc.string(), text => contains(text, text)));
//     it("should always contain its substrings", () => {
    
//       fc.assert(fc.property(fc.string(), fc.string(), fc.string(), (a,b,c) => {
//         return contains(a+b+c, b);
//       }));
//     });
//   });
// });


const UnableMaxCountContest = 1;
const UnableMaxCountSection = 2; 
const UnableMaxCountPersonal = 3; 
const AbleToUpload = 0; 

const canUploadToSection = ({maxCountContest, maxCountPersonal, alreadyLoaded}) => section =>  {
  if (alreadyLoaded >= maxCountContest) return UnableMaxCountContest;
  if (alreadyLoaded >= maxCountPersonal) return UnableMaxCountPersonal;
  if (section.images.length >= section.maxCountImg) return UnableMaxCountSection;
  

  return AbleToUpload;
};

const cases = [
  {
    maxCountContest: 20,
    maxCountPersonal: 10,
    alreadyLoaded: 10,
    section: { images: [1, 2] }
  }
];



const image = fc.record({
  id: fc.uuidV(4),
  maxCountImg: fc.nat()
});

const section = fc.record({
  images: fc.array(fc.array(image))
});

test("aaa", assert => {
  

      fc.property(fc.nat(), fc.nat(), fc.nat(), fc.nat(), section, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {
        return assert.ok();
        // return canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec) === AbleToUpload;
      });


  // assert.doesNotThrow(() => {
  //   fc.assert(
  //   );
  // });
});

















