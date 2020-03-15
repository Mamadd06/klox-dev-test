(() => {
  'use strict';
  const { readFileSync } = require('fs');
  const { createTestClient } = require('apollo-server-testing');
  const { ApolloServer } = require('apollo-server-koa');
  const typeDefs = readFileSync('src/country/type.graphql', 'utf8');

  const countryMock = [
    {
      'name': 'Azerbaijan',
      'topLevelDomain': [
        '.az'
      ],
      'region': 'Asia',
      'subregion': 'Western Asia',
      'borders': ['Arm', 'Geor', 'Iran'],
    }
  ];

  const borderMock = [
    {
      'name': 'Armenia',
      'capital': 'Yerevan'
    },
    {
      'name': 'Georgia',
      'capital': 'Tbilisi'
    },
    {
      'name': 'Iran (Islamic Republic of)',
      'capital': 'Tehran'
    }
  ];

  const countryServiceMock = {
    getCountries: jest.fn(),
    getBorders: jest.fn()
  };

  const resolvers = require('../../../src/country/country.resolvers').build(countryServiceMock);

  describe('Unit | resolvers', () => {
    let server;
    beforeEach(() => {
      const context = {
        countries: {
          name: 'name-test',
          borders: []
        }
      };
      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => (context)
      });
    });

    describe('#resolvers', () => {
      it('Should return countries', async () => {
        const { query } = createTestClient(server);
        const GET_COUNTRIES = `{
          countries{
            name,
            borders{
            name
            }
          }
        }`;
        countryServiceMock.getCountries.mockReturnValueOnce(countryMock);
        countryServiceMock.getBorders.mockReturnValueOnce(borderMock);
        const res = await query({
          query: GET_COUNTRIES,
          variables: { name: 'name-test' }
        });
        const expected = {
          countries: [
            {
              name: 'Azerbaijan',
              borders: [
                { 'name': 'Armenia' },
                { 'name': 'Georgia' },
                { 'name': 'Iran (Islamic Republic of)' }
              ]
            }
          ]
        };
        expect(res.data).toEqual(expected);
      });
    });
  });
})();
