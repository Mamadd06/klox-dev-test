
const Koa = require("koa");

jest.mock("koa");

describe('testing file server.js', function() {

  beforeEach(() => {

    Koa.mockClear();
    require("../server");
  });

  test("should create a new Koa", () => {
    expect(Koa).toHaveBeenCalled();
  });
});
