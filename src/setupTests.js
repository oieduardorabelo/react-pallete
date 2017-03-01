const localStorageMock = {
  getItem: jest.fn(() => JSON.stringify({ foo: 'foo' })),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock
