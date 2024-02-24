const bitapSearch = (text: string, pattern: string, margin: number) => {
  let result = -1;
  const patternMask: number[] = new Array(128);

  if (!pattern) return 0;
  if (pattern.length > 31) return -1;

  const R: number[] = new Array<number>();
  for (let i = 0; i <= margin; ++i) {
    R[i] = ~1;
  }

  for (let i = 0; i <= 127; ++i) {
    patternMask[i] = ~0;
  }

  for (let i = 0; i < pattern.length; ++i) {
    patternMask[pattern.charCodeAt(i)] &= ~(1 << i);
  }

  let d: number;
  for (let i = 0; i < text.length; ++i) {
    let oldRd1: number = R[0];

    R[0] |= patternMask[text.charCodeAt(i)];
    R[0] <<= 1;

    for (d = 1; d <= margin; ++d) {
      const tmp: number = R[d];

      R[d] = (oldRd1 & (R[d] | patternMask[text.charCodeAt(i)])) << 1;
      oldRd1 = tmp;
    }

    if ((R[margin] & (1 << pattern.length)) === 0) {
      result = i - pattern.length + 1;
      break;
    }
  }

  return result;
};

export const search = (data: string[], input: string) => {
  const result: Array<string> = [];
  const pattern = input.toLowerCase();

  data.forEach(item => {
    const text = item.toLowerCase();
    if (bitapSearch(text, pattern, 1) !== -1) result.push(item);
  });

  return result;
};
