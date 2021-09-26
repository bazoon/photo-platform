const fc = require("fast-check");
const {get, nth, map, compose, keys, curry, isEmpty} = require("lodash/fp");
const { Form, Field } = require("react-final-form");
const {over, findLens, pathLens} = require("lodash-lens");
const Async = require("crocks/Async");
const daggy = require("daggy");
const identity = require("crocks/combinators/identity");





// const Photowork = daggy.tagged("Photowork", ["id", "name", "filename", "year", "place", "description"]);

// const UploadImage = daggy.taggedSum("UploadImage", {
//   Some: ["photowork", "file"],
//   Empty: []
// });

// const Section = daggy.taggedSum("Section", {
//   Filled: ["id", "name", "maxCountImg", "images"],
//   None: []
// });



const UnableMaxCountContest = "UnableMaxCountContest";
const UnableMaxCountSection = "UnableMaxCountSection"; 
const UnableMaxCountPersonal = "UnableMaxCountPersonal"; 
const AbleToUpload = "AbleToUpload"; 

const canUploadToSection = ({maxCountContest, maxCountPersonal, alreadyLoaded}) => section =>  {
  if (alreadyLoaded >= maxCountContest && maxCountContest > 0) return UnableMaxCountContest;
  if (alreadyLoaded >= maxCountPersonal && maxCountPersonal > 0) return UnableMaxCountPersonal;
  if (section?.images?.length >= section?.maxCountImg) return UnableMaxCountSection;

  return AbleToUpload;
};

const image = fc.record({
  id: fc.uuidV(4),
});


// test("view samples", () => {
//   const section = fc.record({
//     maxCountImg: fc.integer({max: 10}),
//     images: fc.array(fc.array(image))
//   });

//   fc.assert(
//     fc.property(fc.nat({max: 20}), fc.nat({max: 10}), fc.nat({max: 10}), section, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {
//       const a = canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec);

//       console.table({maxCountContest, maxCountPersonal, alreadyLoaded, sl: sec?.images?.length, res: a});

//       expect(true).toBe(true);
//     })
//   );
// });


test("Can not upload more than contest maxCountContest", () => {
  const s1= fc.record({
    maxCountImg: fc.integer({min: 50}),
    images: fc.array(fc.array(image))
  });
  
  fc.assert(
    fc.property(fc.integer({min: 1, max: 20}), fc.integer({min: 100}), fc.integer({min: 0, max: 10}), s1, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {

      const r = canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec);
      expect(r).toBe(alreadyLoaded + 1 <= maxCountContest ? AbleToUpload : UnableMaxCountContest);
    })
  );
});

test("Can not upload more than contest maxCountPersonal", () => {
  const s1= fc.record({
    maxCountImg: fc.integer({min: 50}),
    images: fc.array(fc.array(image))
  });

  fc.assert(
    fc.property(fc.integer({min: 20}), fc.integer({min: 1, max: 10}), fc.integer({min: 0, max: 10}), s1, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {

      const r = canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec);
      expect(r).toBe(alreadyLoaded + 1 <= maxCountPersonal ? AbleToUpload : UnableMaxCountPersonal);
    })
  );
});

test("Can not upload more than section maxCountImg", () => {

  const s1= fc.record({
    maxCountImg: fc.integer({max: 10, min: 5}),
    images: fc.array(fc.array(image))
  });

  fc.assert(
    fc.property(fc.integer({min: 20}), fc.integer({min: 20}), fc.integer({min: 0, max: 18}), s1, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {

      const r = canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec);
      expect(r).toBe(sec.images.length + 1 <= sec.maxCountImg ? AbleToUpload : UnableMaxCountSection);
    })
  );
});

test("Skip maxCountContest if it is zero", () => {
  const s1= fc.record({
    maxCountImg: fc.integer({min: 50}),
    images: fc.array(fc.array(image))
  });

  fc.assert(
    fc.property(fc.integer({min: 0, max: 0}), fc.integer({min: 200}), fc.integer({min: 0, max: 18}), s1, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {

      const r = canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec);
      expect(r).toBe( alreadyLoaded + 1 <= maxCountPersonal || maxCountPersonal === 0 ? AbleToUpload : UnableMaxCountPersonal);
      expect(r).toBe(alreadyLoaded + 1 <= sec.maxCountImg ? AbleToUpload : UnableMaxCountSection);
    })
  );
});


test("Skip maxCountPersonal if it is zero", () => {
  const s1= fc.record({
    maxCountImg: fc.integer({min: 50}),
    images: fc.array(fc.array(image))
  });

  fc.assert(
    fc.property(fc.integer({min: 40, max: 200}), fc.integer({min: 0, max: 0}), fc.integer({min: 0, max: 18}), s1, (maxCountContest, maxCountPersonal, alreadyLoaded, sec) => {

      const r = canUploadToSection({maxCountContest, maxCountPersonal, alreadyLoaded})(sec);
      expect(r).toBe(alreadyLoaded + 1 <= maxCountContest || maxCountContest === 0 ? AbleToUpload : UnableMaxCountContest);
      expect(r).toBe(alreadyLoaded + 1 <= sec.maxCountImg ? AbleToUpload : UnableMaxCountSection);
    })
  );
});


