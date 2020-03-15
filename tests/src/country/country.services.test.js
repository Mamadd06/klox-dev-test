(() => {
  "use strict";

  const axios = require("axios");
  const query = require("../../../src/country/country.services").build();

  jest.mock('axios');

  describe("Unit | queries", () => {
    let data;

    beforeEach(() => {
      const countries = [
        {
          "name": "Afghanistan",
          "topLevelDomain": [
            ".af"
          ],
          "alpha2Code": "AF",
          "alpha3Code": "AFG",
          "callingCodes": [
            "93"
          ],
          "capital": "Kabul",
          "region": "Asia",
          "subregion": "Southern Asia",
          "population": 27657145,
          "demonym": "Afghan",
          "area": 652230.0,
          "gini": 27.8,
          "borders": [
            "IRN",
            "PAK",
            "TKM",
            "UZB",
            "TJK",
            "CHN"
          ],
          "nativeName": "افغانستان",
          "numericCode": "004",
          "translations": {
            "de": "Afghanistan",
            "es": "Afganistán",
            "fr": "Afghanistan",
            "ja": "アフガニスタン",
            "it": "Afghanistan",
            "br": "Afeganistão",
            "pt": "Afeganistão",
            "nl": "Afghanistan",
            "hr": "Afganistan",
            "fa": "افغانستان"
          }
        },
        {
          "name": "Algeria",
          "topLevelDomain": [
            ".dz"
          ],
          "alpha2Code": "DZ",
          "alpha3Code": "DZA",
          "capital": "Algiers",
          "region": "Africa",
          "subregion": "Northern Africa",
          "population": 40400000,
          "demonym": "Algerian",
          "borders": [
            "TUN",
            "LBY",
            "NER",
            "ESH",
            "MRT",
            "MLI",
            "MAR"
          ],
          "nativeName": "الجزائر"
        }
      ];
      data = { data: countries };
      axios.get.mockImplementationOnce(() => Promise.resolve(data));
    });

    describe("#getCountries", () => {
      it("should return  Afghanistan with french local", async() => {
        const filters = { alphaCode: 'AFG', local: "FR"};
        const result = await query.getCountries(filters);
        // Then
        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual("Afghanistan");
        expect(result[0].capital).toEqual("Kabul");
      });

      it("should return  Afghanistan and Algeria with default local", async() => {
        const filters = {};
        const result = await query.getCountries(filters);
        // Then
        expect(result.length).toEqual(2);
        expect(result[0].name).toEqual("Afghanistan");
        expect(result[0].capital).toEqual("Kabul");
        expect(result[1].name).toEqual("Algeria");
        expect(result[1].capital).toEqual("Algiers");
      });
    });

    describe("#getBorders", () => {
      it("should return  borders if border codes are not empty", async() => {
        const borders = ["TUN", "LBY","NER", "ESH", "MRT", "MLI", "MAR"];
        const result = await query.getBorders({borders});
        // Then
        expect(result.length).toEqual(2);
        expect(result[0].name).toEqual("Afghanistan");
        expect(result[0].capital).toEqual("Kabul");
        expect(result[1].name).toEqual("Algeria");
        expect(result[1].capital).toEqual("Algiers");
      });

      it("should return  empty array if border codes are empty", async() => {
        const result = await query.getBorders({});
        // Then
        expect(result).toEqual([]);
      });
    });
  });
})();
