function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

function directConv(src, w, h, kernel) {
  const dst = new Uint8ClampedArray(src.length);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          const px = ((y + ky - 1) * w + (x + kx - 1)) * 4;
          const kv = kernel[ky * 3 + kx];
          r += src[px]     * kv;
          g += src[px + 1] * kv;
          b += src[px + 2] * kv;
        }
      }
      const idx = (y * w + x) * 4;
      dst[idx]     = clamp(r);
      dst[idx + 1] = clamp(g);
      dst[idx + 2] = clamp(b);
      dst[idx + 3] = 255;
    }
  }
  return dst;
}

function winogradConv(src, w, h, kernel) {
  const dst = new Uint8ClampedArray(src.length);

  const [g0, g1, g2, g3, g4, g5, g6, g7, g8] = kernel;
  const ug = [
    [g0,          g1,           g2          ],
    [-.5*g0-.5*g3-.5*g6, -.5*g1-.5*g4-.5*g7, -.5*g2-.5*g5-.5*g8],
    [-.5*g0+.5*g3-.5*g6, -.5*g1+.5*g4-.5*g7, -.5*g2+.5*g5-.5*g8],
    [g6,          g7,           g8          ],
  ];
  const U = [];
  for (let i = 0; i < 4; i++) {
    U.push(ug[i][0]);
    U.push(-.5*ug[i][0] - .5*ug[i][1] - .5*ug[i][2]);
    U.push(-.5*ug[i][0] + .5*ug[i][1] - .5*ug[i][2]);
    U.push(ug[i][2]);
  }

  for (let ty = 1; ty < h - 3; ty += 2) {
    for (let tx = 1; tx < w - 3; tx += 2) {
      for (let ch = 0; ch < 3; ch++) {
        const d = [];
        for (let py = 0; py < 4; py++) {
          for (let px = 0; px < 4; px++) {
            const iy = ty + py - 1;
            const ix = tx + px - 1;
            if (iy >= 0 && iy < h && ix >= 0 && ix < w)
              d.push(src[(iy * w + ix) * 4 + ch]);
            else d.push(0);
          }
        }
        const v0 = d[0]-d[8], v1=d[1]-d[9], v2=d[2]-d[10], v3=d[3]-d[11];
        const v4 = d[4]+d[8], v5=d[5]+d[9], v6=d[6]+d[10], v7=d[7]+d[11];
        const v8 = d[8]-d[4], v9=d[9]-d[5], v10=d[10]-d[6], v11=d[11]-d[7];
        const v12= d[4]-d[12], v13=d[5]-d[13], v14=d[6]-d[14], v15=d[7]-d[15];
        const V = [
          v0-v2, v1-v3, v1+v2-v3-v0, v0-v3,  
          v4-v6, v5-v7, v5+v6-v7-v4, v4-v7,
          v8-v10,v9-v11,v9+v10-v11-v8,v8-v11,
          v12-v14,v13-v15,v13+v14-v15-v12,v12-v15,
        ];
        const M = U.map((u, i) => u * V[i]);
        const m0=M[0],m1=M[1],m2=M[2],m3=M[3];
        const m4=M[4],m5=M[5],m6=M[6],m7=M[7];
        const m8=M[8],m9=M[9],m10=M[10],m11=M[11];
        const m12=M[12],m13=M[13],m14=M[14],m15=M[15];
        const y00 = m0+m1+m2+m4+m5+m6+m8+m9+m10;
        const y01 = m1-m2-m3+m5-m6-m7+m9-m10-m11;
        const y10 = m4+m5+m6-m8-m9-m10-m12-m13-m14;
        const y11 = m5-m6-m7-m9+m10+m11-m13+m14+m15;

        const outs = [y00, y01, y10, y11];
        const coords = [[ty,tx],[ty,tx+1],[ty+1,tx],[ty+1,tx+1]];
        for (let i = 0; i < 4; i++) {
          const [oy,ox] = coords[i];
          if (oy >= 0 && oy < h && ox >= 0 && ox < w) {
            dst[(oy * w + ox) * 4 + ch] = clamp(outs[i]);
          }
        }
      }
    }
  }
  return dst;
}

const w = 4;
const h = 4;
const src = new Uint8ClampedArray(w * h * 4);
for(let i=0; i<src.length; i+=4) {
  src[i] = Math.random() * 255;
  src[i+1] = Math.random() * 255;
  src[i+2] = Math.random() * 255;
  src[i+3] = 255;
}

const kernel = [-2,-1,0, -1,1,1, 0,1,2]; // Emboss

const dOut = directConv(src, w, h, kernel);
const wOut = winogradConv(src, w, h, kernel);

let mismatch = false;
for(let i=0; i<wOut.length; i++) {
  if(wOut[i] !== dOut[i] && Math.abs(wOut[i] - dOut[i]) > 1) { // allow small precision errors
    console.log(`Mismatch at ${i}: dir=${dOut[i]}, win=${wOut[i]}`);
    mismatch = true;
    break;
  }
}
if(!mismatch) {
  console.log("Match!");
}
