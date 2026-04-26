function matMul(A, B) {
  let res = [];
  for(let i=0; i<A.length; i++) {
    res[i] = [];
    for(let j=0; j<B[0].length; j++) {
      let sum = 0;
      for(let k=0; k<A[0].length; k++) sum += A[i][k] * B[k][j];
      res[i][j] = sum;
    }
  }
  return res;
}
function transpose(A) {
  let res = [];
  for(let i=0; i<A[0].length; i++) {
    res[i] = [];
    for(let j=0; j<A.length; j++) res[i][j] = A[j][i];
  }
  return res;
}

const G = [[1,0,0], [0.5,0.5,0.5], [0.5,-0.5,0.5], [0,0,1]];
const BT = [[1,0,-1,0], [0,1,1,0], [0,-1,1,0], [0,1,0,-1]];
const B = transpose(BT);
const AT = [[1,1,1,0], [0,1,-1,-1]];
const A = transpose(AT);
// test U = G g G^T
