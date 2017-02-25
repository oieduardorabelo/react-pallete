export const mix = (target, src) => Object.assign({}, target, src);

export const rgbRandom = () => Math.floor(Math.random() * 255);

export const stopPropagation = e => e.stopPropagation();

export const store = {
  color1: {
    showPanel: false,
    r: rgbRandom(),
    g: rgbRandom(),
    b: rgbRandom(),
  },
  color2: {
    showPanel: false,
    r: rgbRandom(),
    g: rgbRandom(),
    b: rgbRandom(),
  },
  color3: {
    showPanel: false,
    r: rgbRandom(),
    g: rgbRandom(),
    b: rgbRandom(),
  },
  color4: {
    showPanel: false,
    r: rgbRandom(),
    g: rgbRandom(),
    b: rgbRandom(),
  },
  color5: {
    showPanel: false,
    r: rgbRandom(),
    g: rgbRandom(),
    b: rgbRandom(),
  },
}

export const api = {
  adapter: window.localStorage,
  getAll() {
    const data = api.adapter.getItem('__pallete');
    return JSON.parse(data);
  },
  save(pallete) {
    const data = JSON.stringify(pallete);
    api.adapter.setItem('__pallete', data);
  },
}
