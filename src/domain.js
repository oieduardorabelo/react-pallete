export const rgbRandom = () => Math.floor(Math.random() * 255);
export const stopPropagation = e => e.stopPropagation();

export const store = {
  pallete: {
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
}
