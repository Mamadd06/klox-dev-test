
let countryService;

const resolvers = {
  Query: {
    countries: (_, args) => countryService.getCountries(args)
  },
  Country: {
    borders: async (country) => await countryService.getBorders(country)
  }
};

function build(countryServiceSpec) {
  countryService = countryServiceSpec;
  return resolvers;
}
module.exports.build = build;
