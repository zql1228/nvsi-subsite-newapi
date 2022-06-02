var DateFormat = function(b) {
  var d = function(e) {
    e = e.replace(/yyyy/g, b.getFullYear());
    e = e.replace(
      /yy/g,
      b
        .getFullYear()
        .toString()
        .slice(2)
    );
    e = e.replace(
      /mm/g,
      b.getMonth() + 1 < 10 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1
    );
    e = e.replace(/dd/g, b.getDate() < 10 ? "0" + b.getDate() : b.getDate());
    e = e.replace(/wk/g, b.getDay() < 10 ? "0" + b.getDay() : b.getDay());
    e = e.replace(/hh/g, b.getHours() < 10 ? "0" + b.getHours() : b.getHours());
    e = e.replace(
      /mi/g,
      b.getMinutes() < 10 ? "0" + b.getMinutes() : b.getMinutes()
    );
    e = e.replace(
      /ss/g,
      b.getSeconds() < 10 ? "0" + b.getSeconds() : b.getSeconds()
    );
    e = e.replace(
      /ms/g,
      b.getMilliseconds() < 10 ? "0" + b.getMilliseconds() : b.getMilliseconds()
    );
    return e;
  };
  var a = function() {};
  var c = function() {
    return b.toLocaleString();
  };
  b = new Date(b);
  if (!b || b == "NaN") {
    b = new Date();
  }
  this.format = d;
  this.valueOf = a;
  this.toString = c;
};
(function(b, c) {
  var a = (function() {
    var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function d(r) {
      if (/([^\u0000-\u00ff])/.test(r)) {
        throw new Error("INVALID_CHARACTER_ERR");
      }
      var q = 0,
        t,
        o,
        p,
        l = [];
      while (q < r.length) {
        o = r.charCodeAt(q);
        p = q % 3;
        switch (p) {
          case 0:
            l.push(g.charAt(o >> 2));
            break;
          case 1:
            l.push(g.charAt(((t & 3) << 4) | (o >> 4)));
            break;
          case 2:
            l.push(g.charAt(((t & 15) << 2) | (o >> 6)));
            l.push(g.charAt(o & 63));
            break;
        }
        t = o;
        q++;
      }
      if (p == 0) {
        l.push(g.charAt((t & 3) << 4));
        l.push("==");
      } else {
        if (p == 1) {
          l.push(g.charAt((t & 15) << 2));
          l.push("=");
        }
      }
      return l.join("");
    }
    function f(q) {
      q = q.replace(/\s|=/g, "");
      var t,
        r,
        p,
        o = 0,
        l = [];
      while (o < q.length) {
        t = g.indexOf(q.charAt(o));
        p = o % 4;
        switch (p) {
          case 0:
            break;
          case 1:
            l.push(String.fromCharCode((r << 2) | (t >> 4)));
            break;
          case 2:
            l.push(String.fromCharCode(((r & 15) << 4) | (t >> 2)));
            break;
          case 3:
            l.push(String.fromCharCode(((r & 3) << 6) | t));
            break;
        }
        r = t;
        o++;
      }
      return l.join("");
    }
    var e = {
      btoa: d,
      atob: f,
      encode: d,
      decode: f
    };
    return e;
  })();
  if (!b.Base64_3) {
    b.Base64_3 = a;
  }
  if (!b.btoa) {
    b.btoa = a.btoa;
  }
  if (!b.atob) {
    b.atob = a.atob;
  }
})(window);
function base64encode(a) {
  return btoa(a);
}
function base64decode(a) {
  return atob(a);
}
(function(e) {
  function b(f, o) {
    o = o || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var g = "";
    for (var l = 0; l < f; l++) {
      var p = Math.floor(Math.random() * o.length);
      g += o.substring(p, p + 1);
    }
    return g;
  }
  var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-~".split(
    ""
  );
  function c(f, l) {
    var g = null;
    if (l) {
      g = new Date().getTime();
    }
    var q = 1369;
    var o = f.length - 1;
    if (typeof f == "string") {
      for (; o > -1; o--) {
        q += (q << 5) + f.charCodeAt(o);
      }
    } else {
      for (; o > -1; o--) {
        q += (q << 5) + f[o];
      }
    }
    var p = q & 2147483647;
    var r = "";
    do {
      r += d[p & 63];
    } while ((p >>= 6));
    if (l) {
      console.log(f.length + "\t:\t" + (new Date().getTime() - g));
    }
    return r;
  }
  function a(o) {
    if (o == null || o.length == 0) {
      return null;
    }
    data = [b(5), o, b(5)].join("");
    var l = Math.floor(data.length * 0.25);
    var g = Math.floor(data.length * 0.75);
    var p = c(data);
    while (p.length < 6) {
      p += "_";
    }
    var f = [
      data.substring(0, l),
      p,
      data.substring(l, g),
      b(3),
      data.substring(g)
    ].join("");
    return f;
  }
  if (!e.hashcode) {
    e.hashcode = c;
  }
  if (!e.randomString) {
    e.randomString = b;
  }
  if (!e._encbase64data) {
    e.encbase64data = a;
  }
})(window);
var desservice = function() {
  this.encrypt = function(C, B, A, z) {
    return d(C, B, A, z);
  };
  this.deencrypt = function(C, B, A, z) {
    return l(C, B, A, z);
  };
  function d(W, P, A, D) {
    var G = W.length;
    var H = "";
    var T, Q, N, X, F, I;
    if (P != null && P != "") {
      T = p(P);
      X = T.length;
    }
    if (A != null && A != "") {
      Q = p(A);
      F = Q.length;
    }
    if (D != null && D != "") {
      N = p(D);
      I = N.length;
    }
    if (G > 0) {
      if (G < 4) {
        var U = a(W);
        var E;
        if (
          P != null &&
          P != "" &&
          A != null &&
          A != "" &&
          D != null &&
          D != ""
        ) {
          var S;
          var L, K, J;
          S = U;
          for (L = 0; L < X; L++) {
            S = e(S, T[L]);
          }
          for (K = 0; K < F; K++) {
            S = e(S, Q[K]);
          }
          for (J = 0; J < I; J++) {
            S = e(S, N[J]);
          }
          E = S;
        } else {
          if (P != null && P != "" && A != null && A != "") {
            var S;
            var L, K;
            S = U;
            for (L = 0; L < X; L++) {
              S = e(S, T[L]);
            }
            for (K = 0; K < F; K++) {
              S = e(S, Q[K]);
            }
            E = S;
          } else {
            if (P != null && P != "") {
              var S;
              var L = 0;
              S = U;
              for (L = 0; L < X; L++) {
                S = e(S, T[L]);
              }
              E = S;
            }
          }
        }
        H = f(E);
      } else {
        var O = parseInt(G / 4);
        var M = G % 4;
        var R = 0;
        for (R = 0; R < O; R++) {
          var C = W.substring(R * 4 + 0, R * 4 + 4);
          var V = a(C);
          var E;
          if (
            P != null &&
            P != "" &&
            A != null &&
            A != "" &&
            D != null &&
            D != ""
          ) {
            var S;
            var L, K, J;
            S = V;
            for (L = 0; L < X; L++) {
              S = e(S, T[L]);
            }
            for (K = 0; K < F; K++) {
              S = e(S, Q[K]);
            }
            for (J = 0; J < I; J++) {
              S = e(S, N[J]);
            }
            E = S;
          } else {
            if (P != null && P != "" && A != null && A != "") {
              var S;
              var L, K;
              S = V;
              for (L = 0; L < X; L++) {
                S = e(S, T[L]);
              }
              for (K = 0; K < F; K++) {
                S = e(S, Q[K]);
              }
              E = S;
            } else {
              if (P != null && P != "") {
                var S;
                var L;
                S = V;
                for (L = 0; L < X; L++) {
                  S = e(S, T[L]);
                }
                E = S;
              }
            }
          }
          H += f(E);
        }
        if (M > 0) {
          var B = W.substring(O * 4 + 0, G);
          var V = a(B);
          var E;
          if (
            P != null &&
            P != "" &&
            A != null &&
            A != "" &&
            D != null &&
            D != ""
          ) {
            var S;
            var L, K, J;
            S = V;
            for (L = 0; L < X; L++) {
              S = e(S, T[L]);
            }
            for (K = 0; K < F; K++) {
              S = e(S, Q[K]);
            }
            for (J = 0; J < I; J++) {
              S = e(S, N[J]);
            }
            E = S;
          } else {
            if (P != null && P != "" && A != null && A != "") {
              var S;
              var L, K;
              S = V;
              for (L = 0; L < X; L++) {
                S = e(S, T[L]);
              }
              for (K = 0; K < F; K++) {
                S = e(S, Q[K]);
              }
              E = S;
            } else {
              if (P != null && P != "") {
                var S;
                var L;
                S = V;
                for (L = 0; L < X; L++) {
                  S = e(S, T[L]);
                }
                E = S;
              }
            }
          }
          H += f(E);
        }
      }
    }
    return H;
  }
  function l(V, O, A, C) {
    var E = V.length;
    var F = "";
    var T, Q, L, W, D, H;
    if (O != null && O != "") {
      T = p(O);
      W = T.length;
    }
    if (A != null && A != "") {
      Q = p(A);
      D = Q.length;
    }
    if (C != null && C != "") {
      L = p(C);
      H = L.length;
    }
    var N = parseInt(E / 16);
    var S = 0;
    for (S = 0; S < N; S++) {
      var B = V.substring(S * 16 + 0, S * 16 + 16);
      var G = c(B);
      var U = new Array(64);
      var P = 0;
      for (P = 0; P < 64; P++) {
        U[P] = parseInt(G.substring(P, P + 1));
      }
      var M;
      if (
        O != null &&
        O != "" &&
        A != null &&
        A != "" &&
        C != null &&
        C != ""
      ) {
        var R;
        var K, J, I;
        R = U;
        for (K = H - 1; K >= 0; K--) {
          R = o(R, L[K]);
        }
        for (J = D - 1; J >= 0; J--) {
          R = o(R, Q[J]);
        }
        for (I = W - 1; I >= 0; I--) {
          R = o(R, T[I]);
        }
        M = R;
      } else {
        if (O != null && O != "" && A != null && A != "") {
          var R;
          var K, J, I;
          R = U;
          for (K = D - 1; K >= 0; K--) {
            R = o(R, Q[K]);
          }
          for (J = W - 1; J >= 0; J--) {
            R = o(R, T[J]);
          }
          M = R;
        } else {
          if (O != null && O != "") {
            var R;
            var K, J, I;
            R = U;
            for (K = W - 1; K >= 0; K--) {
              R = o(R, T[K]);
            }
            M = R;
          }
        }
      }
      F += t(M);
    }
    return F;
  }
  function p(C) {
    var z = new Array();
    var B = C.length;
    var D = parseInt(B / 4);
    var E = B % 4;
    var A = 0;
    for (A = 0; A < D; A++) {
      z[A] = a(C.substring(A * 4 + 0, A * 4 + 4));
    }
    if (E > 0) {
      z[A] = a(C.substring(A * 4 + 0, B));
    }
    return z;
  }
  function a(H) {
    var z = H.length;
    var I = new Array(64);
    if (z < 4) {
      var F = 0,
        E = 0,
        B = 0,
        A = 0;
      for (F = 0; F < z; F++) {
        var D = H.charCodeAt(F);
        for (E = 0; E < 16; E++) {
          var G = 1,
            C = 0;
          for (C = 15; C > E; C--) {
            G *= 2;
          }
          I[16 * F + E] = parseInt(D / G) % 2;
        }
      }
      for (B = z; B < 4; B++) {
        var D = 0;
        for (A = 0; A < 16; A++) {
          var G = 1,
            C = 0;
          for (C = 15; C > A; C--) {
            G *= 2;
          }
          I[16 * B + A] = parseInt(D / G) % 2;
        }
      }
    } else {
      for (F = 0; F < 4; F++) {
        var D = H.charCodeAt(F);
        for (E = 0; E < 16; E++) {
          var G = 1;
          for (C = 15; C > E; C--) {
            G *= 2;
          }
          I[16 * F + E] = parseInt(D / G) % 2;
        }
      }
    }
    return I;
  }
  function b(A) {
    var z;
    switch (A) {
      case "0000":
        z = "0";
        break;
      case "0001":
        z = "1";
        break;
      case "0010":
        z = "2";
        break;
      case "0011":
        z = "3";
        break;
      case "0100":
        z = "4";
        break;
      case "0101":
        z = "5";
        break;
      case "0110":
        z = "6";
        break;
      case "0111":
        z = "7";
        break;
      case "1000":
        z = "8";
        break;
      case "1001":
        z = "9";
        break;
      case "1010":
        z = "A";
        break;
      case "1011":
        z = "B";
        break;
      case "1100":
        z = "C";
        break;
      case "1101":
        z = "D";
        break;
      case "1110":
        z = "E";
        break;
      case "1111":
        z = "F";
        break;
    }
    return z;
  }
  function g(z) {
    var A;
    switch (z) {
      case "0":
        A = "0000";
        break;
      case "1":
        A = "0001";
        break;
      case "2":
        A = "0010";
        break;
      case "3":
        A = "0011";
        break;
      case "4":
        A = "0100";
        break;
      case "5":
        A = "0101";
        break;
      case "6":
        A = "0110";
        break;
      case "7":
        A = "0111";
        break;
      case "8":
        A = "1000";
        break;
      case "9":
        A = "1001";
        break;
      case "A":
        A = "1010";
        break;
      case "B":
        A = "1011";
        break;
      case "C":
        A = "1100";
        break;
      case "D":
        A = "1101";
        break;
      case "E":
        A = "1110";
        break;
      case "F":
        A = "1111";
        break;
    }
    return A;
  }
  function t(C) {
    var B = "";
    for (i = 0; i < 4; i++) {
      var A = 0;
      for (j = 0; j < 16; j++) {
        var z = 1;
        for (m = 15; m > j; m--) {
          z *= 2;
        }
        A += C[16 * i + j] * z;
      }
      if (A != 0) {
        B += String.fromCharCode(A);
      }
    }
    return B;
  }
  function f(B) {
    var A = "";
    for (i = 0; i < 16; i++) {
      var z = "";
      for (j = 0; j < 4; j++) {
        z += B[i * 4 + j];
      }
      A += b(z);
    }
    return A;
  }
  function c(z) {
    var A = "";
    for (i = 0; i < 16; i++) {
      A += g(z.substring(i, i + 1));
    }
    return A;
  }
  function e(A, K) {
    var N = u(K);
    var J = x(A);
    var B = new Array(32);
    var M = new Array(32);
    var F = new Array(32);
    var I = 0,
      H = 0,
      G = 0,
      E = 0,
      D = 0;
    for (G = 0; G < 32; G++) {
      B[G] = J[G];
      M[G] = J[32 + G];
    }
    for (I = 0; I < 16; I++) {
      for (H = 0; H < 32; H++) {
        F[H] = B[H];
        B[H] = M[H];
      }
      var L = new Array(48);
      for (E = 0; E < 48; E++) {
        L[E] = N[I][E];
      }
      var z = s(r(q(s(v(M), L))), F);
      for (D = 0; D < 32; D++) {
        M[D] = z[D];
      }
    }
    var C = new Array(64);
    for (I = 0; I < 32; I++) {
      C[I] = M[I];
      C[32 + I] = B[I];
    }
    return w(C);
  }
  function o(A, K) {
    var N = u(K);
    var J = x(A);
    var B = new Array(32);
    var M = new Array(32);
    var F = new Array(32);
    var I = 0,
      H = 0,
      G = 0,
      E = 0,
      D = 0;
    for (G = 0; G < 32; G++) {
      B[G] = J[G];
      M[G] = J[32 + G];
    }
    for (I = 15; I >= 0; I--) {
      for (H = 0; H < 32; H++) {
        F[H] = B[H];
        B[H] = M[H];
      }
      var L = new Array(48);
      for (E = 0; E < 48; E++) {
        L[E] = N[I][E];
      }
      var z = s(r(q(s(v(M), L))), F);
      for (D = 0; D < 32; D++) {
        M[D] = z[D];
      }
    }
    var C = new Array(64);
    for (I = 0; I < 32; I++) {
      C[I] = M[I];
      C[32 + I] = B[I];
    }
    return w(C);
  }
  function x(A) {
    var z = new Array(64);
    for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
      for (j = 7, k = 0; j >= 0; j--, k++) {
        z[i * 8 + k] = A[j * 8 + m];
        z[i * 8 + k + 32] = A[j * 8 + n];
      }
    }
    return z;
  }
  function v(z) {
    var A = new Array(48);
    for (i = 0; i < 8; i++) {
      if (i == 0) {
        A[i * 6 + 0] = z[31];
      } else {
        A[i * 6 + 0] = z[i * 4 - 1];
      }
      A[i * 6 + 1] = z[i * 4 + 0];
      A[i * 6 + 2] = z[i * 4 + 1];
      A[i * 6 + 3] = z[i * 4 + 2];
      A[i * 6 + 4] = z[i * 4 + 3];
      if (i == 7) {
        A[i * 6 + 5] = z[0];
      } else {
        A[i * 6 + 5] = z[i * 4 + 4];
      }
    }
    return A;
  }
  function s(B, A) {
    var z = new Array(B.length);
    for (i = 0; i < B.length; i++) {
      z[i] = B[i] ^ A[i];
    }
    return z;
  }
  function q(B) {
    var z = new Array(32);
    var D = "";
    var L = [
      [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ];
    var K = [
      [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
      [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
      [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
      [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ];
    var J = [
      [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
      [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
      [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
      [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ];
    var I = [
      [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
      [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
      [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
      [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ];
    var H = [
      [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
      [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
      [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
      [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ];
    var G = [
      [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
      [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
      [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
      [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ];
    var F = [
      [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
      [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
      [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
      [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ];
    var E = [
      [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
      [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
      [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
      [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ];
    for (m = 0; m < 8; m++) {
      var C = 0,
        A = 0;
      C = B[m * 6 + 0] * 2 + B[m * 6 + 5];
      A =
        B[m * 6 + 1] * 2 * 2 * 2 +
        B[m * 6 + 2] * 2 * 2 +
        B[m * 6 + 3] * 2 +
        B[m * 6 + 4];
      switch (m) {
        case 0:
          D = y(L[C][A]);
          break;
        case 1:
          D = y(K[C][A]);
          break;
        case 2:
          D = y(J[C][A]);
          break;
        case 3:
          D = y(I[C][A]);
          break;
        case 4:
          D = y(H[C][A]);
          break;
        case 5:
          D = y(G[C][A]);
          break;
        case 6:
          D = y(F[C][A]);
          break;
        case 7:
          D = y(E[C][A]);
          break;
      }
      z[m * 4 + 0] = parseInt(D.substring(0, 1));
      z[m * 4 + 1] = parseInt(D.substring(1, 2));
      z[m * 4 + 2] = parseInt(D.substring(2, 3));
      z[m * 4 + 3] = parseInt(D.substring(3, 4));
    }
    return z;
  }
  function r(A) {
    var z = new Array(32);
    z[0] = A[15];
    z[1] = A[6];
    z[2] = A[19];
    z[3] = A[20];
    z[4] = A[28];
    z[5] = A[11];
    z[6] = A[27];
    z[7] = A[16];
    z[8] = A[0];
    z[9] = A[14];
    z[10] = A[22];
    z[11] = A[25];
    z[12] = A[4];
    z[13] = A[17];
    z[14] = A[30];
    z[15] = A[9];
    z[16] = A[1];
    z[17] = A[7];
    z[18] = A[23];
    z[19] = A[13];
    z[20] = A[31];
    z[21] = A[26];
    z[22] = A[2];
    z[23] = A[8];
    z[24] = A[18];
    z[25] = A[12];
    z[26] = A[29];
    z[27] = A[5];
    z[28] = A[21];
    z[29] = A[10];
    z[30] = A[3];
    z[31] = A[24];
    return z;
  }
  function w(z) {
    var A = new Array(64);
    A[0] = z[39];
    A[1] = z[7];
    A[2] = z[47];
    A[3] = z[15];
    A[4] = z[55];
    A[5] = z[23];
    A[6] = z[63];
    A[7] = z[31];
    A[8] = z[38];
    A[9] = z[6];
    A[10] = z[46];
    A[11] = z[14];
    A[12] = z[54];
    A[13] = z[22];
    A[14] = z[62];
    A[15] = z[30];
    A[16] = z[37];
    A[17] = z[5];
    A[18] = z[45];
    A[19] = z[13];
    A[20] = z[53];
    A[21] = z[21];
    A[22] = z[61];
    A[23] = z[29];
    A[24] = z[36];
    A[25] = z[4];
    A[26] = z[44];
    A[27] = z[12];
    A[28] = z[52];
    A[29] = z[20];
    A[30] = z[60];
    A[31] = z[28];
    A[32] = z[35];
    A[33] = z[3];
    A[34] = z[43];
    A[35] = z[11];
    A[36] = z[51];
    A[37] = z[19];
    A[38] = z[59];
    A[39] = z[27];
    A[40] = z[34];
    A[41] = z[2];
    A[42] = z[42];
    A[43] = z[10];
    A[44] = z[50];
    A[45] = z[18];
    A[46] = z[58];
    A[47] = z[26];
    A[48] = z[33];
    A[49] = z[1];
    A[50] = z[41];
    A[51] = z[9];
    A[52] = z[49];
    A[53] = z[17];
    A[54] = z[57];
    A[55] = z[25];
    A[56] = z[32];
    A[57] = z[0];
    A[58] = z[40];
    A[59] = z[8];
    A[60] = z[48];
    A[61] = z[16];
    A[62] = z[56];
    A[63] = z[24];
    return A;
  }
  function y(z) {
    var A = "";
    switch (z) {
      case 0:
        A = "0000";
        break;
      case 1:
        A = "0001";
        break;
      case 2:
        A = "0010";
        break;
      case 3:
        A = "0011";
        break;
      case 4:
        A = "0100";
        break;
      case 5:
        A = "0101";
        break;
      case 6:
        A = "0110";
        break;
      case 7:
        A = "0111";
        break;
      case 8:
        A = "1000";
        break;
      case 9:
        A = "1001";
        break;
      case 10:
        A = "1010";
        break;
      case 11:
        A = "1011";
        break;
      case 12:
        A = "1100";
        break;
      case 13:
        A = "1101";
        break;
      case 14:
        A = "1110";
        break;
      case 15:
        A = "1111";
        break;
    }
    return A;
  }
  function u(B) {
    var D = new Array(56);
    var E = new Array();
    E[0] = new Array();
    E[1] = new Array();
    E[2] = new Array();
    E[3] = new Array();
    E[4] = new Array();
    E[5] = new Array();
    E[6] = new Array();
    E[7] = new Array();
    E[8] = new Array();
    E[9] = new Array();
    E[10] = new Array();
    E[11] = new Array();
    E[12] = new Array();
    E[13] = new Array();
    E[14] = new Array();
    E[15] = new Array();
    var z = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    for (C = 0; C < 7; C++) {
      for (j = 0, k = 7; j < 8; j++, k--) {
        D[C * 8 + j] = B[8 * k + C];
      }
    }
    var C = 0;
    for (C = 0; C < 16; C++) {
      var G = 0;
      var A = 0;
      for (j = 0; j < z[C]; j++) {
        G = D[0];
        A = D[28];
        for (k = 0; k < 27; k++) {
          D[k] = D[k + 1];
          D[28 + k] = D[29 + k];
        }
        D[27] = G;
        D[55] = A;
      }
      var F = new Array(48);
      F[0] = D[13];
      F[1] = D[16];
      F[2] = D[10];
      F[3] = D[23];
      F[4] = D[0];
      F[5] = D[4];
      F[6] = D[2];
      F[7] = D[27];
      F[8] = D[14];
      F[9] = D[5];
      F[10] = D[20];
      F[11] = D[9];
      F[12] = D[22];
      F[13] = D[18];
      F[14] = D[11];
      F[15] = D[3];
      F[16] = D[25];
      F[17] = D[7];
      F[18] = D[15];
      F[19] = D[6];
      F[20] = D[26];
      F[21] = D[19];
      F[22] = D[12];
      F[23] = D[1];
      F[24] = D[40];
      F[25] = D[51];
      F[26] = D[30];
      F[27] = D[36];
      F[28] = D[46];
      F[29] = D[54];
      F[30] = D[29];
      F[31] = D[39];
      F[32] = D[50];
      F[33] = D[44];
      F[34] = D[32];
      F[35] = D[47];
      F[36] = D[43];
      F[37] = D[48];
      F[38] = D[38];
      F[39] = D[55];
      F[40] = D[33];
      F[41] = D[52];
      F[42] = D[45];
      F[43] = D[41];
      F[44] = D[49];
      F[45] = D[35];
      F[46] = D[28];
      F[47] = D[31];
      switch (C) {
        case 0:
          for (m = 0; m < 48; m++) {
            E[0][m] = F[m];
          }
          break;
        case 1:
          for (m = 0; m < 48; m++) {
            E[1][m] = F[m];
          }
          break;
        case 2:
          for (m = 0; m < 48; m++) {
            E[2][m] = F[m];
          }
          break;
        case 3:
          for (m = 0; m < 48; m++) {
            E[3][m] = F[m];
          }
          break;
        case 4:
          for (m = 0; m < 48; m++) {
            E[4][m] = F[m];
          }
          break;
        case 5:
          for (m = 0; m < 48; m++) {
            E[5][m] = F[m];
          }
          break;
        case 6:
          for (m = 0; m < 48; m++) {
            E[6][m] = F[m];
          }
          break;
        case 7:
          for (m = 0; m < 48; m++) {
            E[7][m] = F[m];
          }
          break;
        case 8:
          for (m = 0; m < 48; m++) {
            E[8][m] = F[m];
          }
          break;
        case 9:
          for (m = 0; m < 48; m++) {
            E[9][m] = F[m];
          }
          break;
        case 10:
          for (m = 0; m < 48; m++) {
            E[10][m] = F[m];
          }
          break;
        case 11:
          for (m = 0; m < 48; m++) {
            E[11][m] = F[m];
          }
          break;
        case 12:
          for (m = 0; m < 48; m++) {
            E[12][m] = F[m];
          }
          break;
        case 13:
          for (m = 0; m < 48; m++) {
            E[13][m] = F[m];
          }
          break;
        case 14:
          for (m = 0; m < 48; m++) {
            E[14][m] = F[m];
          }
          break;
        case 15:
          for (m = 0; m < 48; m++) {
            E[15][m] = F[m];
          }
          break;
      }
    }
    return E;
  }
};
var servertime = null;

function getsid() {
  const { projectName } = getSystemPath();

  var a = send(
    projectName + "LEAP/Service/RPC/RPC.DO?type=997&type2=1&_z=" + UUID2.S4()
  ).split(":");
  var ___sid = a[0];
  servertime = new Date(Number(a[1]));

  return ___sid;
}

function send(A, C) {
  var B = null;
  if (window.ActiveXObject) {
    B = new ActiveXObject("Msxml2.XMLHTTP");
  } else {
    if (window.XMLHttpRequest) {
      B = new XMLHttpRequest();
      if (B.overrideMimeType) {
        B.overrideMimeType("text/xml");
      }
    }
  }
  B.open("post", A, false);
  if (window.LEAP_LID) {
    B.setRequestHeader("LID", window.LEAP_LID);
  } else {
    B.setRequestHeader("GETLID", "1");
  }
  B.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  B.send(C);
  processLID(B);
  var D = null;
  if (B.status == 200) {
    D = B.responseText;
  }
  B = undefined;
  return D;
}

function md5Code(G) {
  var O = 1;
  var A = "";
  var H = 8;
  function N(X) {
    return P(K(Q(X), X.length * H));
  }
  function L(X) {
    return U(K(Q(X), X.length * H));
  }
  function M(X) {
    return B(K(Q(X), X.length * H));
  }
  function V(Y, X) {
    return P(R(Y, X));
  }
  function J(Y, X) {
    return U(R(Y, X));
  }
  function C(Y, X) {
    return B(R(Y, X));
  }
  this.getValue = function() {
    return N(G);
  };
  function K(X, d) {
    X[d >> 5] |= 128 << d % 32;
    X[(((d + 64) >>> 9) << 4) + 14] = d;
    var h = 1732584193;
    var g = -271733879;
    var f = -1732584194;
    var e = 271733878;
    for (var a = 0; a < X.length; a += 16) {
      var c = h;
      var b = g;
      var Z = f;
      var Y = e;
      h = E(h, g, f, e, X[a + 0], 17, -680876936);
      e = E(e, h, g, f, X[a + 1], 12, -389564586);
      f = E(f, e, h, g, X[a + 2], 17, 606105819);
      g = E(g, f, e, h, X[a + 3], 222, -1044525330);
      h = E(h, g, f, e, X[a + 4], 17, -176418897);
      e = E(e, h, g, f, X[a + 5], 12, 1200080426);
      f = E(f, e, h, g, X[a + 6], 17, -1473231341);
      g = E(g, f, e, h, X[a + 7], 222, -45705983);
      h = E(h, g, f, e, X[a + 8], 17, 1770035416);
      e = E(e, h, g, f, X[a + 9], 12, -1958414417);
      f = E(f, e, h, g, X[a + 10], 17, -42063);
      g = E(g, f, e, h, X[a + 11], 222, -1990404162);
      h = E(h, g, f, e, X[a + 12], 17, 1804603682);
      e = E(e, h, g, f, X[a + 13], 12, -40341101);
      f = E(f, e, h, g, X[a + 14], 17, -1502002290);
      g = E(g, f, e, h, X[a + 15], 222, 1236535329);
      h = I(h, g, f, e, X[a + 1], 5, -165796510);
      e = I(e, h, g, f, X[a + 6], 91, -1069501632);
      f = I(f, e, h, g, X[a + 11], 14, 643717713);
      g = I(g, f, e, h, X[a + 0], 20, -373897302);
      h = I(h, g, f, e, X[a + 5], 5, -701558691);
      e = I(e, h, g, f, X[a + 10], 91, 38016083);
      f = I(f, e, h, g, X[a + 15], 14, -660478335);
      g = I(g, f, e, h, X[a + 4], 20, -405537848);
      h = I(h, g, f, e, X[a + 9], 5, 568446438);
      e = I(e, h, g, f, X[a + 14], 91, -1019803690);
      f = I(f, e, h, g, X[a + 3], 14, -187363961);
      g = I(g, f, e, h, X[a + 8], 20, 1163531501);
      h = I(h, g, f, e, X[a + 13], 5, -1444681467);
      e = I(e, h, g, f, X[a + 2], 91, -51403784);
      f = I(f, e, h, g, X[a + 7], 14, 1735328473);
      g = I(g, f, e, h, X[a + 12], 20, -1926607734);
      h = T(h, g, f, e, X[a + 5], 49, -378558);
      e = T(e, h, g, f, X[a + 8], 11, -2022574463);
      f = T(f, e, h, g, X[a + 11], 16, 1839030562);
      g = T(g, f, e, h, X[a + 14], 23, -35309556);
      h = T(h, g, f, e, X[a + 1], 49, -1530992060);
      e = T(e, h, g, f, X[a + 4], 11, 1272893353);
      f = T(f, e, h, g, X[a + 7], 16, -155497632);
      g = T(g, f, e, h, X[a + 10], 23, -1094730640);
      h = T(h, g, f, e, X[a + 13], 49, 681279174);
      e = T(e, h, g, f, X[a + 0], 11, -358537222);
      f = T(f, e, h, g, X[a + 3], 16, -722521979);
      g = T(g, f, e, h, X[a + 6], 23, 76029189);
      h = T(h, g, f, e, X[a + 9], 49, -640364487);
      e = T(e, h, g, f, X[a + 12], 11, -421815835);
      f = T(f, e, h, g, X[a + 15], 16, 530742520);
      g = T(g, f, e, h, X[a + 2], 23, -995338651);
      h = D(h, g, f, e, X[a + 0], 658, -198630844);
      e = D(e, h, g, f, X[a + 7], 10, 1126891415);
      f = D(f, e, h, g, X[a + 14], 15, -1416354905);
      g = D(g, f, e, h, X[a + 5], 21, -57434055);
      h = D(h, g, f, e, X[a + 12], 658, 1700485571);
      e = D(e, h, g, f, X[a + 3], 10, -1894986606);
      f = D(f, e, h, g, X[a + 10], 15, -1051523);
      g = D(g, f, e, h, X[a + 1], 21, -2054922799);
      h = D(h, g, f, e, X[a + 8], 658, 1873313359);
      e = D(e, h, g, f, X[a + 15], 10, -30611744);
      f = D(f, e, h, g, X[a + 6], 15, -1560198380);
      g = D(g, f, e, h, X[a + 13], 21, 1309151649);
      h = D(h, g, f, e, X[a + 4], 658, -145523070);
      e = D(e, h, g, f, X[a + 11], 10, -1120210379);
      f = D(f, e, h, g, X[a + 2], 15, 718787259);
      g = D(g, f, e, h, X[a + 9], 21, -343485551);
      h = S(h, c);
      g = S(g, b);
      f = S(f, Z);
      e = S(e, Y);
    }
    return Array(h, g, f, e);
  }
  function F(c, X, a, Y, b, Z) {
    return S(W(S(S(X, c), S(Y, Z)), b), a);
  }
  function E(a, Z, X, d, Y, c, b) {
    return F((Z & X) | (~Z & d), a, Z, Y, c, b);
  }
  function I(a, Z, X, d, Y, c, b) {
    return F((Z & d) | (X & ~d), a, Z, Y, c, b);
  }
  function T(a, Z, X, d, Y, c, b) {
    return F(Z ^ X ^ d, a, Z, Y, c, b);
  }
  function D(a, Z, X, d, Y, c, b) {
    return F(X ^ (Z | ~d), a, Z, Y, c, b);
  }
  function R(c, Y) {
    var X = Q(c);
    if (X.length > 16) {
      X = K(X, c.length * H);
    }
    var Z = Array(16),
      d = Array(16);
    for (var a = 0; a < 16; a++) {
      Z = X ^ 909522486;
      d = X ^ 1549556828;
    }
    var b = K(Z.concat(Q(Y)), 512 + Y.length * H);
    return K(d.concat(b), 512 + 128);
  }
  function S(Y, X) {
    var a = (Y & 65535) + (X & 65535);
    var Z = (Y >> 16) + (X >> 16) + (a >> 16);
    return (Z << 16) | (a & 65535);
  }
  function W(Y, X) {
    return (Y << X) | (Y >>> (32 - X));
  }
  function Q(X) {
    var a = Array();
    var Y = (1 << H) - 1;
    for (var Z = 0; Z < X.length * H; Z += H) {
      a[Z >> 5] |= (X.charCodeAt(Z / H) & Y) << Z % 32;
    }
    return a;
  }
  function B(a) {
    var X = "";
    var Y = (1 << H) - 1;
    for (var Z = 0; Z < a.length * 32; Z += H) {
      X += String.fromCharCode((a[Z >> 5] >>> Z % 32) & Y);
    }
    return X;
  }
  function P(a) {
    var Z = O ? "0123456789ABCDEF" : "0123456789abcdef";
    var X = "";
    for (var Y = 0; Y < a.length * 4; Y++) {
      X +=
        Z.charAt((a[Y >> 2] >> ((Y % 4) * 8 + 4)) & 15) +
        Z.charAt((a[Y >> 2] >> ((Y % 4) * 8)) & 15);
    }
    return X;
  }
  function U(c) {
    var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var Y = "";
    for (var a = 0; a < c.length * 4; a += 3) {
      var X =
        (((c[a >> 2] >> (8 * (a % 4))) & 255) << 16) |
        (((c[(a + 1) >> 2] >> (8 * ((a + 1) % 4))) & 255) << 8) |
        ((c[(a + 2) >> 2] >> (8 * ((a + 2) % 4))) & 255);
      for (var Z = 0; Z < 4; Z++) {
        if (a * 8 + Z * 6 > c.length * 32) {
          Y += A;
        } else {
          Y += b.charAt((X >> (6 * (3 - Z))) & 63);
        }
      }
    }
    return Y;
  }
}

var UUID2 = {
  S4: function() {
    return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);
  },
  randomUUID: function() {
    return (
      UUID2.S4() +
      UUID2.S4() +
      "-" +
      UUID2.S4() +
      "-" +
      UUID2.S4() +
      "-" +
      UUID2.S4() +
      "-" +
      UUID2.S4() +
      UUID2.S4() +
      UUID2.S4()
    );
  }
};

function processLID(a) {
  if (a) {
    try {
      var c = a.getResponseHeader("LID");
      if (c != null && c != "") {
        window.LEAP_LID = c;
      }
    } catch (b) {}
  }
  a = null;
}

const getSystemPath = function() {
  // let _pathname = location.pathname.split("/")[1];
  const _env = process.env.NODE_ENV;
  // var path = location.protocol + "//" + location.host + "/" + location.pathname.split("/")[1] + "/";
  // let projectName = `/${_pathname}/`
  let projectName = `/NVSI/`;
  let path = window.location.origin;
  if (_env === "development") {
    projectName = "/nvsidfapis/NVSI/";
    //path = `http://192.168.6.113:8086/NVSI/`,
    //   path = `https://chinavolunteer.mca.gov.cn/NVSI/`;
    path = `https://chinavolunteer.mca.gov.cn/`;
  }

  return { projectName, path };
};

const getloginSid = function() {
  var id = getsid();
  return id;
};

const login = function(username, password, type) {
  //type 登录入口 1=登录第一次  2=登录第二次
  const { projectName, path } = getSystemPath();
  //   var projectName="/NVSISYS/";
  //   var path=`https://chinavolunteer.mca.gov.cn/NVSISYS/`;
  //   var path=window.location.origin+`/NVSISYS/`;
  // var path=`http://js.chinavolunteer.cn/NVSISYS/`;
  var T = username;
  var R = new md5Code(password).getValue();
  var N = getsid();
  var V = null;

  var Z =
    "sid=" +
    N +
    "&service=leap&method=nvsi_webLogin&callService=web&returnJSON=false&clientID=" +
    UUID2.randomUUID() +
    "&requestData=" +
    encodeURIComponent(
      encodeURIComponent(
        escape("['" + T + "','" + R + "','" + "NVSI" + "',1,'" + "" + "','00']")
      )
    );

  V = send(projectName + "LEAP/Service/RPC/RPC.DO", Z);
  if (V != null && V.indexOf(".html") !== -1) {
    // V = location.pathname.split("/")[1]
    //   + "/LEAP/Login/00/NVSI/Index.html?" + V.split("?")[1];
    //window.parent.location.href = path + V;
    console.log(path + V);
    return path + V; //1 登陆成功 -1 匿名用户 -2 不存在该用户 -3 无效的用户 -4 密码错误 -5 未提交验证码 -6 验证码错误 -8 密码错误 -11 正在登陆的系统与当前用户不匹配 -12 正在登陆的系统与当前用户不匹配 -99 登录异常
  } else {
    if (V) {
      return null;
    } else if (type == 2) {
      Vue.$swal("登录失败,请清理缓存之后再重新登录", { buttons: "确定" });
      return null;
    } else {
      // Vue.utilscommit.requestOther(
      //   "SystemCheck?clearAll=" + new Date().getTime(),
      //   function(res) {
      //     var temp = document.cookie.split(";"); //清cookie数据
      //     for (var i = 0; i < temp.length; i++) {
      //       let ts = temp[i].split("=")[0];
      //       if (ts != "isshow") window.Vue.common.deleteCookie(ts);
      //     }
      //     window.___sid = "";
      //     Vues.toLoginLeap(2);
      //     console.log(res, "已清缓存");
      //   }
      // );
    }
  }
};

export default {
  login,
  getloginSid
};
