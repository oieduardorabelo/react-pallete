import { mix, rgbRandom, stopPropagation, store, api } from './domain'

describe('domain.js - mix', () => {
  it('should mix two objects in one', () => {
    const data1 = { foo: 'foo' };
    const data2 = { bar: 'bar' };
    const test = mix(data1, data2);

    expect(test).toEqual({ foo: 'foo', bar: 'bar' })
  })
})

describe('domain.js - rgbRandom', () => {
  it('should generate random color number less than 255', () => {
    const r = rgbRandom();
    const g = rgbRandom();
    const b = rgbRandom();

    expect(r).toBeLessThan(255);
    expect(g).toBeLessThan(255);
    expect(b).toBeLessThan(255);
  })
})

describe('domain.js - stopPropagation', () => {
  it('should call the correct method just once', () => {
    const spy = jest.fn();
    const target = { stopPropagation: spy };

    stopPropagation(target);

    expect(spy).toHaveBeenCalledTimes(1);
  })
})

describe('domain.js - store', () => {
  it('should return a color mock store object', () => {
    const test = Object.assign({}, store);
    const testKeys = Object.keys(test);

    expect(test).toBeInstanceOf(Object);
    expect(testKeys).toEqual(['color1', 'color2', 'color3', 'color4', 'color5']);
  })
})
