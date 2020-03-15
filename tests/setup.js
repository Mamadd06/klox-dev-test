beforeEach(() => {
  console.error = jest.fn((error) => {
    throw error;
  });
  console.log = jest.fn();
  console.info = jest.fn();
  console.warn = jest.fn();
});
