WidgetMetadata = {
  "id": "zen.cheyong.rex.stream",
  "title": "驰时录多源播放",
  "description": "从驰时录搜索正片并按季集实时解析多线路；只返回通过主/子 HLS、密钥与首片段或直链媒体头探测的线路。",
  "author": "TG@ZenMoFiShi",
  "site": "http://app2.dsx.ac",
  "version": "1.0.0",
  "requiredVersion": "0.0.1",
  "modules": [
    {
      "id": "loadResource",
      "title": "驰时录 · 大师兄多源",
      "functionName": "loadResource",
      "description": "电影、剧集、动漫、综艺多源，实时探测并过滤失败线路",
      "type": "stream",
      "cacheDuration": 0,
      "requiresWebView": false,
      "params": []
    }
  ]
};

var DSCryptoLicense = "# License\n\n[The MIT License (MIT)](http://opensource.org/licenses/MIT)\n\nCopyright (c) 2009-2013 Jeff Mott  \nCopyright (c) 2013-2016 Evan Vosberg\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n";

var DSCrypto=(()=>{var $=(k=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(k,{get:(u,A)=>(typeof require!="undefined"?require:u)[A]}):k)(function(k){if(typeof require!="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+k+'" is not supported')});var I=(k,u)=>()=>{try{return u||k((u={exports:{}}).exports,u),u.exports}catch(A){throw u=0,A}};var N=I((O,rr)=>{(function(k,u){typeof O=="object"?rr.exports=O=u():typeof define=="function"&&define.amd?define([],u):k.CryptoJS=u()})(O,function(){var k=k||(function(u,A){var w;if(typeof window!="undefined"&&window.crypto&&(w=window.crypto),typeof self!="undefined"&&self.crypto&&(w=self.crypto),typeof globalThis!="undefined"&&globalThis.crypto&&(w=globalThis.crypto),!w&&typeof window!="undefined"&&window.msCrypto&&(w=window.msCrypto),!w&&typeof global!="undefined"&&global.crypto&&(w=global.crypto),!w&&typeof $=="function")try{w=$("crypto")}catch(r){}var K=function(){if(w){if(typeof w.getRandomValues=="function")try{return w.getRandomValues(new Uint32Array(1))[0]}catch(r){}if(typeof w.randomBytes=="function")try{return w.randomBytes(4).readInt32LE()}catch(r){}}throw new Error("Native crypto module could not be used to get secure random number.")},H=Object.create||(function(){function r(){}return function(e){var v;return r.prototype=e,v=new r,r.prototype=null,v}})(),P={},n=P.lib={},m=n.Base=(function(){return{extend:function(r){var e=H(this);return r&&e.mixIn(r),(!e.hasOwnProperty("init")||this.init===e.init)&&(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var r=this.extend();return r.init.apply(r,arguments),r},init:function(){},mixIn:function(r){for(var e in r)r.hasOwnProperty(e)&&(this[e]=r[e]);r.hasOwnProperty("toString")&&(this.toString=r.toString)},clone:function(){return this.init.prototype.extend(this)}}})(),_=n.WordArray=m.extend({init:function(r,e){r=this.words=r||[],e!=A?this.sigBytes=e:this.sigBytes=r.length*4},toString:function(r){return(r||x).stringify(this)},concat:function(r){var e=this.words,v=r.words,h=this.sigBytes,C=r.sigBytes;if(this.clamp(),h%4)for(var z=0;z<C;z++){var F=v[z>>>2]>>>24-z%4*8&255;e[h+z>>>2]|=F<<24-(h+z)%4*8}else for(var B=0;B<C;B+=4)e[h+B>>>2]=v[B>>>2];return this.sigBytes+=C,this},clamp:function(){var r=this.words,e=this.sigBytes;r[e>>>2]&=4294967295<<32-e%4*8,r.length=u.ceil(e/4)},clone:function(){var r=m.clone.call(this);return r.words=this.words.slice(0),r},random:function(r){for(var e=[],v=0;v<r;v+=4)e.push(K());return new _.init(e,r)}}),d=P.enc={},x=d.Hex={stringify:function(r){for(var e=r.words,v=r.sigBytes,h=[],C=0;C<v;C++){var z=e[C>>>2]>>>24-C%4*8&255;h.push((z>>>4).toString(16)),h.push((z&15).toString(16))}return h.join("")},parse:function(r){for(var e=r.length,v=[],h=0;h<e;h+=2)v[h>>>3]|=parseInt(r.substr(h,2),16)<<24-h%8*4;return new _.init(v,e/2)}},l=d.Latin1={stringify:function(r){for(var e=r.words,v=r.sigBytes,h=[],C=0;C<v;C++){var z=e[C>>>2]>>>24-C%4*8&255;h.push(String.fromCharCode(z))}return h.join("")},parse:function(r){for(var e=r.length,v=[],h=0;h<e;h++)v[h>>>2]|=(r.charCodeAt(h)&255)<<24-h%4*8;return new _.init(v,e)}},p=d.Utf8={stringify:function(r){try{return decodeURIComponent(escape(l.stringify(r)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(r){return l.parse(unescape(encodeURIComponent(r)))}},y=n.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new _.init,this._nDataBytes=0},_append:function(r){typeof r=="string"&&(r=p.parse(r)),this._data.concat(r),this._nDataBytes+=r.sigBytes},_process:function(r){var e,v=this._data,h=v.words,C=v.sigBytes,z=this.blockSize,F=z*4,B=C/F;r?B=u.ceil(B):B=u.max((B|0)-this._minBufferSize,0);var W=B*z,q=u.min(W*4,C);if(W){for(var t=0;t<W;t+=z)this._doProcessBlock(h,t);e=h.splice(0,W),v.sigBytes-=q}return new _.init(e,q)},clone:function(){var r=m.clone.call(this);return r._data=this._data.clone(),r},_minBufferSize:0}),E=n.Hasher=y.extend({cfg:m.extend(),init:function(r){this.cfg=this.cfg.extend(r),this.reset()},reset:function(){y.reset.call(this),this._doReset()},update:function(r){return this._append(r),this._process(),this},finalize:function(r){r&&this._append(r);var e=this._doFinalize();return e},blockSize:512/32,_createHelper:function(r){return function(e,v){return new r.init(v).finalize(e)}},_createHmacHelper:function(r){return function(e,v){return new b.HMAC.init(r,v).finalize(e)}}}),b=P.algo={};return P})(Math);return k})});var Q=I((T,er)=>{(function(k,u){typeof T=="object"?er.exports=T=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(T,function(k){return(function(){var u=k,A=u.lib,w=A.WordArray,K=u.enc,H=K.Base64={stringify:function(n){var m=n.words,_=n.sigBytes,d=this._map;n.clamp();for(var x=[],l=0;l<_;l+=3)for(var p=m[l>>>2]>>>24-l%4*8&255,y=m[l+1>>>2]>>>24-(l+1)%4*8&255,E=m[l+2>>>2]>>>24-(l+2)%4*8&255,b=p<<16|y<<8|E,r=0;r<4&&l+r*.75<_;r++)x.push(d.charAt(b>>>6*(3-r)&63));var e=d.charAt(64);if(e)for(;x.length%4;)x.push(e);return x.join("")},parse:function(n){var m=n.length,_=this._map,d=this._reverseMap;if(!d){d=this._reverseMap=[];for(var x=0;x<_.length;x++)d[_.charCodeAt(x)]=x}var l=_.charAt(64);if(l){var p=n.indexOf(l);p!==-1&&(m=p)}return P(n,m,d)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function P(n,m,_){for(var d=[],x=0,l=0;l<m;l++)if(l%4){var p=_[n.charCodeAt(l-1)]<<l%4*2,y=_[n.charCodeAt(l)]>>>6-l%4*2,E=p|y;d[x>>>2]|=E<<24-x%4*8,x++}return w.create(d,x)}})(),k.enc.Base64})});var Y=I((V,tr)=>{(function(k,u){typeof V=="object"?tr.exports=V=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(V,function(k){return(function(){var u=k,A=u.lib,w=A.WordArray,K=A.Hasher,H=u.algo,P=[],n=H.SHA1=K.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(m,_){for(var d=this._hash.words,x=d[0],l=d[1],p=d[2],y=d[3],E=d[4],b=0;b<80;b++){if(b<16)P[b]=m[_+b]|0;else{var r=P[b-3]^P[b-8]^P[b-14]^P[b-16];P[b]=r<<1|r>>>31}var e=(x<<5|x>>>27)+E+P[b];b<20?e+=(l&p|~l&y)+1518500249:b<40?e+=(l^p^y)+1859775393:b<60?e+=(l&p|l&y|p&y)-1894007588:e+=(l^p^y)-899497514,E=y,y=p,p=l<<30|l>>>2,l=x,x=e}d[0]=d[0]+x|0,d[1]=d[1]+l|0,d[2]=d[2]+p|0,d[3]=d[3]+y|0,d[4]=d[4]+E|0},_doFinalize:function(){var m=this._data,_=m.words,d=this._nDataBytes*8,x=m.sigBytes*8;return _[x>>>5]|=128<<24-x%32,_[(x+64>>>9<<4)+14]=Math.floor(d/4294967296),_[(x+64>>>9<<4)+15]=d,m.sigBytes=_.length*4,this._process(),this._hash},clone:function(){var m=K.clone.call(this);return m._hash=this._hash.clone(),m}});u.SHA1=K._createHelper(n),u.HmacSHA1=K._createHmacHelper(n)})(),k.SHA1})});var Z=I((M,nr)=>{(function(k,u){typeof M=="object"?nr.exports=M=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(M,function(k){(function(){var u=k,A=u.lib,w=A.Base,K=u.enc,H=K.Utf8,P=u.algo,n=P.HMAC=w.extend({init:function(m,_){m=this._hasher=new m.init,typeof _=="string"&&(_=H.parse(_));var d=m.blockSize,x=d*4;_.sigBytes>x&&(_=m.finalize(_)),_.clamp();for(var l=this._oKey=_.clone(),p=this._iKey=_.clone(),y=l.words,E=p.words,b=0;b<d;b++)y[b]^=1549556828,E[b]^=909522486;l.sigBytes=p.sigBytes=x,this.reset()},reset:function(){var m=this._hasher;m.reset(),m.update(this._iKey)},update:function(m){return this._hasher.update(m),this},finalize:function(m){var _=this._hasher,d=_.finalize(m);_.reset();var x=_.finalize(this._oKey.clone().concat(d));return x}})})()})});var ar=I((U,ir)=>{(function(k,u){typeof U=="object"?ir.exports=U=u(N()):typeof define=="function"&&define.amd?define(["./core"],u):u(k.CryptoJS)})(U,function(k){return(function(u){var A=k,w=A.lib,K=w.WordArray,H=w.Hasher,P=A.algo,n=[];(function(){for(var p=0;p<64;p++)n[p]=u.abs(u.sin(p+1))*4294967296|0})();var m=P.MD5=H.extend({_doReset:function(){this._hash=new K.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(p,y){for(var E=0;E<16;E++){var b=y+E,r=p[b];p[b]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360}var e=this._hash.words,v=p[y+0],h=p[y+1],C=p[y+2],z=p[y+3],F=p[y+4],B=p[y+5],W=p[y+6],q=p[y+7],t=p[y+8],c=p[y+9],g=p[y+10],a=p[y+11],S=p[y+12],D=p[y+13],L=p[y+14],R=p[y+15],i=e[0],o=e[1],s=e[2],f=e[3];i=_(i,o,s,f,v,7,n[0]),f=_(f,i,o,s,h,12,n[1]),s=_(s,f,i,o,C,17,n[2]),o=_(o,s,f,i,z,22,n[3]),i=_(i,o,s,f,F,7,n[4]),f=_(f,i,o,s,B,12,n[5]),s=_(s,f,i,o,W,17,n[6]),o=_(o,s,f,i,q,22,n[7]),i=_(i,o,s,f,t,7,n[8]),f=_(f,i,o,s,c,12,n[9]),s=_(s,f,i,o,g,17,n[10]),o=_(o,s,f,i,a,22,n[11]),i=_(i,o,s,f,S,7,n[12]),f=_(f,i,o,s,D,12,n[13]),s=_(s,f,i,o,L,17,n[14]),o=_(o,s,f,i,R,22,n[15]),i=d(i,o,s,f,h,5,n[16]),f=d(f,i,o,s,W,9,n[17]),s=d(s,f,i,o,a,14,n[18]),o=d(o,s,f,i,v,20,n[19]),i=d(i,o,s,f,B,5,n[20]),f=d(f,i,o,s,g,9,n[21]),s=d(s,f,i,o,R,14,n[22]),o=d(o,s,f,i,F,20,n[23]),i=d(i,o,s,f,c,5,n[24]),f=d(f,i,o,s,L,9,n[25]),s=d(s,f,i,o,z,14,n[26]),o=d(o,s,f,i,t,20,n[27]),i=d(i,o,s,f,D,5,n[28]),f=d(f,i,o,s,C,9,n[29]),s=d(s,f,i,o,q,14,n[30]),o=d(o,s,f,i,S,20,n[31]),i=x(i,o,s,f,B,4,n[32]),f=x(f,i,o,s,t,11,n[33]),s=x(s,f,i,o,a,16,n[34]),o=x(o,s,f,i,L,23,n[35]),i=x(i,o,s,f,h,4,n[36]),f=x(f,i,o,s,F,11,n[37]),s=x(s,f,i,o,q,16,n[38]),o=x(o,s,f,i,g,23,n[39]),i=x(i,o,s,f,D,4,n[40]),f=x(f,i,o,s,v,11,n[41]),s=x(s,f,i,o,z,16,n[42]),o=x(o,s,f,i,W,23,n[43]),i=x(i,o,s,f,c,4,n[44]),f=x(f,i,o,s,S,11,n[45]),s=x(s,f,i,o,R,16,n[46]),o=x(o,s,f,i,C,23,n[47]),i=l(i,o,s,f,v,6,n[48]),f=l(f,i,o,s,q,10,n[49]),s=l(s,f,i,o,L,15,n[50]),o=l(o,s,f,i,B,21,n[51]),i=l(i,o,s,f,S,6,n[52]),f=l(f,i,o,s,z,10,n[53]),s=l(s,f,i,o,g,15,n[54]),o=l(o,s,f,i,h,21,n[55]),i=l(i,o,s,f,t,6,n[56]),f=l(f,i,o,s,R,10,n[57]),s=l(s,f,i,o,W,15,n[58]),o=l(o,s,f,i,D,21,n[59]),i=l(i,o,s,f,F,6,n[60]),f=l(f,i,o,s,a,10,n[61]),s=l(s,f,i,o,C,15,n[62]),o=l(o,s,f,i,c,21,n[63]),e[0]=e[0]+i|0,e[1]=e[1]+o|0,e[2]=e[2]+s|0,e[3]=e[3]+f|0},_doFinalize:function(){var p=this._data,y=p.words,E=this._nDataBytes*8,b=p.sigBytes*8;y[b>>>5]|=128<<24-b%32;var r=u.floor(E/4294967296),e=E;y[(b+64>>>9<<4)+15]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360,y[(b+64>>>9<<4)+14]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360,p.sigBytes=(y.length+1)*4,this._process();for(var v=this._hash,h=v.words,C=0;C<4;C++){var z=h[C];h[C]=(z<<8|z>>>24)&16711935|(z<<24|z>>>8)&4278255360}return v},clone:function(){var p=H.clone.call(this);return p._hash=this._hash.clone(),p}});function _(p,y,E,b,r,e,v){var h=p+(y&E|~y&b)+r+v;return(h<<e|h>>>32-e)+y}function d(p,y,E,b,r,e,v){var h=p+(y&b|E&~b)+r+v;return(h<<e|h>>>32-e)+y}function x(p,y,E,b,r,e,v){var h=p+(y^E^b)+r+v;return(h<<e|h>>>32-e)+y}function l(p,y,E,b,r,e,v){var h=p+(E^(y|~b))+r+v;return(h<<e|h>>>32-e)+y}A.MD5=H._createHelper(m),A.HmacMD5=H._createHmacHelper(m)})(Math),k.MD5})});var X=I((j,or)=>{(function(k,u,A){typeof j=="object"?or.exports=j=u(N(),Y(),Z()):typeof define=="function"&&define.amd?define(["./core","./sha1","./hmac"],u):u(k.CryptoJS)})(j,function(k){return(function(){var u=k,A=u.lib,w=A.Base,K=A.WordArray,H=u.algo,P=H.MD5,n=H.EvpKDF=w.extend({cfg:w.extend({keySize:128/32,hasher:P,iterations:1}),init:function(m){this.cfg=this.cfg.extend(m)},compute:function(m,_){for(var d,x=this.cfg,l=x.hasher.create(),p=K.create(),y=p.words,E=x.keySize,b=x.iterations;y.length<E;){d&&l.update(d),d=l.update(m).finalize(_),l.reset();for(var r=1;r<b;r++)d=l.finalize(d),l.reset();p.concat(d)}return p.sigBytes=E*4,p}});u.EvpKDF=function(m,_,d){return n.create(d).compute(m,_)}})(),k.EvpKDF})});var fr=I((J,sr)=>{(function(k,u,A){typeof J=="object"?sr.exports=J=u(N(),X()):typeof define=="function"&&define.amd?define(["./core","./evpkdf"],u):u(k.CryptoJS)})(J,function(k){k.lib.Cipher||(function(u){var A=k,w=A.lib,K=w.Base,H=w.WordArray,P=w.BufferedBlockAlgorithm,n=A.enc,m=n.Utf8,_=n.Base64,d=A.algo,x=d.EvpKDF,l=w.Cipher=P.extend({cfg:K.extend(),createEncryptor:function(t,c){return this.create(this._ENC_XFORM_MODE,t,c)},createDecryptor:function(t,c){return this.create(this._DEC_XFORM_MODE,t,c)},init:function(t,c,g){this.cfg=this.cfg.extend(g),this._xformMode=t,this._key=c,this.reset()},reset:function(){P.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){t&&this._append(t);var c=this._doFinalize();return c},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:(function(){function t(c){return typeof c=="string"?q:F}return function(c){return{encrypt:function(g,a,S){return t(a).encrypt(c,g,a,S)},decrypt:function(g,a,S){return t(a).decrypt(c,g,a,S)}}}})()}),p=w.StreamCipher=l.extend({_doFinalize:function(){var t=this._process(!0);return t},blockSize:1}),y=A.mode={},E=w.BlockCipherMode=K.extend({createEncryptor:function(t,c){return this.Encryptor.create(t,c)},createDecryptor:function(t,c){return this.Decryptor.create(t,c)},init:function(t,c){this._cipher=t,this._iv=c}}),b=y.CBC=(function(){var t=E.extend();t.Encryptor=t.extend({processBlock:function(g,a){var S=this._cipher,D=S.blockSize;c.call(this,g,a,D),S.encryptBlock(g,a),this._prevBlock=g.slice(a,a+D)}}),t.Decryptor=t.extend({processBlock:function(g,a){var S=this._cipher,D=S.blockSize,L=g.slice(a,a+D);S.decryptBlock(g,a),c.call(this,g,a,D),this._prevBlock=L}});function c(g,a,S){var D,L=this._iv;L?(D=L,this._iv=u):D=this._prevBlock;for(var R=0;R<S;R++)g[a+R]^=D[R]}return t})(),r=A.pad={},e=r.Pkcs7={pad:function(t,c){for(var g=c*4,a=g-t.sigBytes%g,S=a<<24|a<<16|a<<8|a,D=[],L=0;L<a;L+=4)D.push(S);var R=H.create(D,a);t.concat(R)},unpad:function(t){var c=t.words[t.sigBytes-1>>>2]&255;t.sigBytes-=c}},v=w.BlockCipher=l.extend({cfg:l.cfg.extend({mode:b,padding:e}),reset:function(){var t;l.reset.call(this);var c=this.cfg,g=c.iv,a=c.mode;this._xformMode==this._ENC_XFORM_MODE?t=a.createEncryptor:(t=a.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,g&&g.words):(this._mode=t.call(a,this,g&&g.words),this._mode.__creator=t)},_doProcessBlock:function(t,c){this._mode.processBlock(t,c)},_doFinalize:function(){var t,c=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(c.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),c.unpad(t)),t},blockSize:128/32}),h=w.CipherParams=K.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),C=A.format={},z=C.OpenSSL={stringify:function(t){var c,g=t.ciphertext,a=t.salt;return a?c=H.create([1398893684,1701076831]).concat(a).concat(g):c=g,c.toString(_)},parse:function(t){var c,g=_.parse(t),a=g.words;return a[0]==1398893684&&a[1]==1701076831&&(c=H.create(a.slice(2,4)),a.splice(0,4),g.sigBytes-=16),h.create({ciphertext:g,salt:c})}},F=w.SerializableCipher=K.extend({cfg:K.extend({format:z}),encrypt:function(t,c,g,a){a=this.cfg.extend(a);var S=t.createEncryptor(g,a),D=S.finalize(c),L=S.cfg;return h.create({ciphertext:D,key:g,iv:L.iv,algorithm:t,mode:L.mode,padding:L.padding,blockSize:t.blockSize,formatter:a.format})},decrypt:function(t,c,g,a){a=this.cfg.extend(a),c=this._parse(c,a.format);var S=t.createDecryptor(g,a).finalize(c.ciphertext);return S},_parse:function(t,c){return typeof t=="string"?c.parse(t,this):t}}),B=A.kdf={},W=B.OpenSSL={execute:function(t,c,g,a,S){if(a||(a=H.random(64/8)),S)var D=x.create({keySize:c+g,hasher:S}).compute(t,a);else var D=x.create({keySize:c+g}).compute(t,a);var L=H.create(D.words.slice(c),g*4);return D.sigBytes=c*4,h.create({key:D,iv:L,salt:a})}},q=w.PasswordBasedCipher=F.extend({cfg:F.cfg.extend({kdf:W}),encrypt:function(t,c,g,a){a=this.cfg.extend(a);var S=a.kdf.execute(g,t.keySize,t.ivSize,a.salt,a.hasher);a.iv=S.iv;var D=F.encrypt.call(this,t,c,S.key,a);return D.mixIn(S),D},decrypt:function(t,c,g,a){a=this.cfg.extend(a),c=this._parse(c,a.format);var S=a.kdf.execute(g,t.keySize,t.ivSize,c.salt,a.hasher);a.iv=S.iv;var D=F.decrypt.call(this,t,c,S.key,a);return D}})})()})});var vr=I((G,cr)=>{(function(k,u,A){typeof G=="object"?cr.exports=G=u(N(),Q(),ar(),X(),fr()):typeof define=="function"&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],u):u(k.CryptoJS)})(G,function(k){return(function(){var u=k,A=u.lib,w=A.BlockCipher,K=u.algo,H=[],P=[],n=[],m=[],_=[],d=[],x=[],l=[],p=[],y=[];(function(){for(var r=[],e=0;e<256;e++)e<128?r[e]=e<<1:r[e]=e<<1^283;for(var v=0,h=0,e=0;e<256;e++){var C=h^h<<1^h<<2^h<<3^h<<4;C=C>>>8^C&255^99,H[v]=C,P[C]=v;var z=r[v],F=r[z],B=r[F],W=r[C]*257^C*16843008;n[v]=W<<24|W>>>8,m[v]=W<<16|W>>>16,_[v]=W<<8|W>>>24,d[v]=W;var W=B*16843009^F*65537^z*257^v*16843008;x[C]=W<<24|W>>>8,l[C]=W<<16|W>>>16,p[C]=W<<8|W>>>24,y[C]=W,v?(v=z^r[r[r[B^z]]],h^=r[r[h]]):v=h=1}})();var E=[0,1,2,4,8,16,32,64,128,27,54],b=K.AES=w.extend({_doReset:function(){var r;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var e=this._keyPriorReset=this._key,v=e.words,h=e.sigBytes/4,C=this._nRounds=h+6,z=(C+1)*4,F=this._keySchedule=[],B=0;B<z;B++)B<h?F[B]=v[B]:(r=F[B-1],B%h?h>6&&B%h==4&&(r=H[r>>>24]<<24|H[r>>>16&255]<<16|H[r>>>8&255]<<8|H[r&255]):(r=r<<8|r>>>24,r=H[r>>>24]<<24|H[r>>>16&255]<<16|H[r>>>8&255]<<8|H[r&255],r^=E[B/h|0]<<24),F[B]=F[B-h]^r);for(var W=this._invKeySchedule=[],q=0;q<z;q++){var B=z-q;if(q%4)var r=F[B];else var r=F[B-4];q<4||B<=4?W[q]=r:W[q]=x[H[r>>>24]]^l[H[r>>>16&255]]^p[H[r>>>8&255]]^y[H[r&255]]}}},encryptBlock:function(r,e){this._doCryptBlock(r,e,this._keySchedule,n,m,_,d,H)},decryptBlock:function(r,e){var v=r[e+1];r[e+1]=r[e+3],r[e+3]=v,this._doCryptBlock(r,e,this._invKeySchedule,x,l,p,y,P);var v=r[e+1];r[e+1]=r[e+3],r[e+3]=v},_doCryptBlock:function(r,e,v,h,C,z,F,B){for(var W=this._nRounds,q=r[e]^v[0],t=r[e+1]^v[1],c=r[e+2]^v[2],g=r[e+3]^v[3],a=4,S=1;S<W;S++){var D=h[q>>>24]^C[t>>>16&255]^z[c>>>8&255]^F[g&255]^v[a++],L=h[t>>>24]^C[c>>>16&255]^z[g>>>8&255]^F[q&255]^v[a++],R=h[c>>>24]^C[g>>>16&255]^z[q>>>8&255]^F[t&255]^v[a++],i=h[g>>>24]^C[q>>>16&255]^z[t>>>8&255]^F[c&255]^v[a++];q=D,t=L,c=R,g=i}var D=(B[q>>>24]<<24|B[t>>>16&255]<<16|B[c>>>8&255]<<8|B[g&255])^v[a++],L=(B[t>>>24]<<24|B[c>>>16&255]<<16|B[g>>>8&255]<<8|B[q&255])^v[a++],R=(B[c>>>24]<<24|B[g>>>16&255]<<16|B[q>>>8&255]<<8|B[t&255])^v[a++],i=(B[g>>>24]<<24|B[q>>>16&255]<<16|B[t>>>8&255]<<8|B[c&255])^v[a++];r[e]=D,r[e+1]=L,r[e+2]=R,r[e+3]=i},keySize:256/32});u.AES=w._createHelper(b)})(),k.AES})});var dr=I((_r,hr)=>{var ur=N();Q();Y();Z();vr();hr.exports=ur});return dr();})();

var DS_BUILD = "1791855838435";
var DS_PACKAGE = "com.zyx.cheyong";
var DS_RSA = {"p":"fbc7ab9d75533e39971e41b554990a57149ea3d115298d9d17630138a40f315339b7a69c6254dde2ffed520f5ad8c48fd2ef18ffd6c97ea0ca8d7329cf0146d5","q":"f36bda059d298c1cf92fae597fcccc5ccb715e3935b485cb4185d20c6c19a3249ca195f4e604ebf1c26f08f75174e72764499d722ee2e10232f16e3aacd9f0fb","dp":"7f28e1d0bd6f944eabb6d942c67e208dc85932ad273dfc4aa984141ad228e6257d51f670a6ecebbf78b81828af1e296fe5fd61a7dc87994f85dd189bb5f3941d","dq":"6d86a9a2bd0464b6e4a83f9aa596509db02c6268fb712e8236093069c67a029e069bee0d333223b7b3f4a1e42612a3af65c079c756b15eecce5f3369d33c7ce1","qi":"88911352f605c0254a3464d8333520eefdd06e5a985c1f88873714dfbb0764e9fa6b8e95e5e24369d6af22fb849a8c491d64f26e2fb566437b2de514838ca50b"};

function dsText(value) { return value == null ? "" : String(value).trim(); }
function dsBytes(word) {
  var out = [];
  for (var i = 0; i < word.sigBytes; i++) out.push((word.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 255);
  return out;
}
function dsWord(bytes) {
  var words = [];
  for (var i = 0; i < bytes.length; i++) words[i >>> 2] = (words[i >>> 2] || 0) | ((bytes[i] & 255) << (24 - (i % 4) * 8));
  return DSCrypto.lib.WordArray.create(words, bytes.length);
}
function dsBase64(value) {
  value = dsText(value).replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value) || value.length % 4 === 1) throw new Error("解析响应编码无效");
  while (value.length % 4) value += "=";
  return dsBytes(DSCrypto.enc.Base64.parse(value));
}
function dsStatus(response) { return Number(response && (response.statusCode || response.status)) || 0; }
function dsHeader(headers, name) {
  headers = headers || {};
  var target = name.toLowerCase();
  for (var key in headers) if (key.toLowerCase() === target) return dsText(headers[key]);
  return "";
}
function dsOK(response) { var s = dsStatus(response); return s >= 200 && s < 300; }
function dsJSON(value) {
  if (value && typeof value === "object") return value;
  return JSON.parse(dsText(value).replace(/^\uFEFF/, ""));
}
function dsUTF8(bytes) { return DSCrypto.enc.Utf8.stringify(dsWord(bytes)); }
function dsRandomIV() {
  var a = [];
  for (var i = 0; i < 16; i++) a.push(Math.floor(Math.random() * 256));
  return dsWord(a);
}
function dsRequest(method, data) {
  var key = DSCrypto.MD5(DS_BUILD + "^~!@#[-" + DS_PACKAGE);
  var iv = dsRandomIV();
  var input = {};
  Object.keys(data || {}).forEach(function (k) { input[k] = data[k]; });
  input.token = "";
  var body = JSON.stringify({ method: method, data: input, csrf: Date.now() });
  var encrypted = DSCrypto.AES.encrypt(body, key, { iv: iv, mode: DSCrypto.mode.CBC, padding: DSCrypto.pad.Pkcs7 });
  return iv.clone().concat(encrypted.ciphertext).toString(DSCrypto.enc.Base64).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function dsPow(base, exponent, modulus) {
  var out = BigInt(1), zero = BigInt(0), one = BigInt(1);
  base %= modulus;
  while (exponent > zero) {
    if ((exponent & one) !== zero) out = out * base % modulus;
    exponent >>= one;
    if (exponent > zero) base = base * base % modulus;
  }
  return out;
}
var dsRSAState;
function dsRSA(value) {
  if (typeof BigInt !== "function") throw new Error("播放器的 JavaScript 引擎不支持片源解析");
  if (!dsRSAState) {
    var k = DS_RSA;
    dsRSAState = { p: BigInt("0x" + k.p), q: BigInt("0x" + k.q), dp: BigInt("0x" + k.dp), dq: BigInt("0x" + k.dq), qi: BigInt("0x" + k.qi) };
  }
  var bytes = dsBase64(value), size = 128, decoded = [], r = dsRSAState;
  if (!bytes.length || bytes.length % size || bytes.length > 8192) throw new Error("解析响应分块无效");
  for (var offset = 0; offset < bytes.length; offset += size) {
    var hex = "";
    for (var i = offset; i < offset + size; i++) hex += ("0" + bytes[i].toString(16)).slice(-2);
    var c = BigInt("0x" + hex), a = dsPow(c, r.dp, r.p), b = dsPow(c, r.dq, r.q);
    var h = (a - b) % r.p;
    if (h < BigInt(0)) h += r.p;
    var m = b + r.q * (r.qi * h % r.p);
    var blockHex = m.toString(16);
    while (blockHex.length < size * 2) blockHex = "0" + blockHex;
    var block = [];
    for (var z = 0; z < blockHex.length; z += 2) block.push(parseInt(blockHex.slice(z, z + 2), 16));
    if (block.length !== size || block[0] !== 0 || (block[1] !== 2 && block[1] !== 1)) throw new Error("解析响应填充校验失败");
    var end = 2;
    while (end < block.length && block[end] !== 0) end++;
    if (end < 10 || end === block.length) throw new Error("解析响应填充过短");
    for (var n = end + 1; n < block.length; n++) decoded.push(block[n]);
  }
  return dsUTF8(decoded);
}
function dsReply(value) {
  if (value && typeof value === "object") return value;
  var text = dsText(value);
  if (/^[\[{]/.test(text)) return dsJSON(text);
  if (/^https?:\/\//i.test(text)) return { code: 200, url: text };
  return dsJSON(dsRSA(text));
}
var dsAPIHost = "http://app2.dsx.ac";
async function dsAPI(method, input) {
  var response = await Widget.http.post(dsAPIHost + "/ndsx.php/v7/logs", dsRequest(method, input), {
    headers: { "User-Agent": "Dart/3.13 (dart:io)", "Content-Type": "text/plain", version: "2.0.0", "version-number": "220", "pk-id": DS_PACKAGE, "build-time": DS_BUILD, platform: "ios", "platform-version": "Version 27.2 (Build 24B5110a)" }
  });
  if (!dsOK(response)) throw new Error("驰时录接口暂不可用（HTTP " + dsStatus(response) + "）");
  var data = dsJSON(response.data);
  if (!data || Number(data.code) !== 1) throw new Error("驰时录未返回有效影视数据");
  return data;
}
function dsResolve(base, value) {
  value = dsText(value);
  if (/^https?:\/\//i.test(value)) return value;
  var match = dsText(base).match(/^(https?:)\/\/([^/]+)/i);
  if (!match) return "";
  if (value.indexOf("//") === 0) return match[1] + value;
  var origin = match[1] + "//" + match[2], clean = String(base).split("#")[0];
  if (value.charAt(0) === "?") return clean.split("?")[0] + value;
  var suffix = (value.match(/[?#].*$/) || [""])[0], path = value.split(/[?#]/)[0];
  if (path.charAt(0) !== "/") path = clean.slice(origin.length).split("?")[0].replace(/[^/]*$/, "") + path;
  var stack = [];
  path.split("/").forEach(function (part) { if (!part || part === ".") return; if (part === "..") stack.pop(); else stack.push(part); });
  return origin + "/" + stack.join("/") + suffix;
}
function dsHeaders(value) {
  var out = {};
  if (value && typeof value === "object") {
    Object.keys(value).forEach(function (key) { if (!/^(host|content-length|connection|range|cookie|authorization)$/i.test(key)) out[key] = String(value[key]); });
    return out;
  }
  dsText(value).split(/\r?\n|\\n/).forEach(function (line) {
    var m = line.match(/^\s*([^:]+):\s*(.*?)\s*$/);
    if (m && !/^(host|content-length|connection|range|cookie|authorization)$/i.test(m[1])) out[m[1]] = m[2];
  });
  return out;
}
function dsMerge(a, b) {
  var out = {};
  [a || {}, b || {}].forEach(function (x) { Object.keys(x).forEach(function (k) {
    Object.keys(out).forEach(function (old) { if (old.toLowerCase() === k.toLowerCase()) delete out[old]; });
    out[k] = x[k];
  }); });
  return out;
}
function dsValidURL(url) {
  var match = dsText(url).match(/^https?:\/\/([^/?#]+)/i);
  if (!match || /@|\s/.test(match[1])) return false;
  return !/^(?:localhost|127(?:\.\d{1,3}){1,3}|0\.0\.0\.0|\[::1\])(?::|$)/i.test(match[1]);
}
async function dsMedia(url, headers, binary, deadline) {
  if (!dsValidURL(url)) throw new Error("播放地址无效");
  for (var i = 0; i < 4; i++) {
    if (Date.now() >= deadline) throw new Error("探测时限已到");
    var response = await Widget.http.get(url, { headers: headers, base64Data: !!binary, allow_redirects: false });
    var status = dsStatus(response);
    if (status >= 300 && status < 400) {
      var location = dsHeader(response.headers, "Location");
      if (!location) throw new Error("媒体跳转无地址");
      url = dsResolve(url, location);
      if (!dsValidURL(url)) throw new Error("媒体跳转无效");
      continue;
    }
    if (!dsOK(response)) throw new Error("媒体探测失败");
    return { response: response, url: url };
  }
  throw new Error("媒体跳转过多");
}
function dsLooksMedia(bytes) {
  var text = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) text += String.fromCharCode(bytes[i]);
  if (/(ftyp|styp|moof|moov|mdat)/.test(text.slice(0, 32))) return true;
  if (bytes[0] === 26 && bytes[1] === 69 && bytes[2] === 223 && bytes[3] === 163) return true;
  if (bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 1 && bytes[3] === 186) return true;
  if (bytes[0] === 255 && (bytes[1] & 246) === 240) return true;
  if (text.indexOf("ID3") === 0) return true;
  for (var n = 0; n < Math.min(512, bytes.length - 376); n++) {
    if (bytes[n] === 71 && bytes[n + 188] === 71 && bytes[n + 376] === 71) return true;
  }
  return false;
}
async function dsProbeBytes(url, headers, kind, offset, length, deadline, encrypted, initial) {
  var start = Number(offset) || 0, amount = Math.min(4096, Number(length) || 1024);
  var requestHeaders = dsMerge(headers, { Range: "bytes=" + start + "-" + (start + amount - 1) });
  var got = initial || await dsMedia(url, requestHeaders, true, deadline);
  var response = got.response, type = dsHeader(response.headers, "Content-Type").toLowerCase();
  if (typeof response.data !== "string" || /text\/html|application\/(?:json|xml)|image\/svg/.test(type)) throw new Error("媒体返回非视频正文");
  var bytes = dsBase64(response.data);
  if (kind === "key") {
    if (bytes.length !== 16) throw new Error("HLS 密钥不是 16 字节");
    return got.url;
  }
  if (bytes.length < 32) throw new Error("媒体片段为空或过短");
  var head = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) head += String.fromCharCode(bytes[i]);
  if (/^\s*(?:<!doctype|<html|<\?xml|\{"(?:code|error|message)")/i.test(head)) throw new Error("媒体实际为错误页面");
  if (!encrypted && !dsLooksMedia(bytes)) throw new Error("未识别到可解复用媒体头");
  return got.url;
}
function dsAttr(line, name) {
  var exp = new RegExp("(?:^|[:,])\\s*" + name + "=(?:\"([^\"]*)\"|([^,]*))", "i"), m = line.match(exp);
  return m ? (m[1] == null ? m[2] : m[1]) : "";
}
function dsRange(value) {
  var m = dsText(value).match(/^(\d+)(?:@(\d+))?$/);
  return m ? { length: Number(m[1]), offset: Number(m[2] || 0) } : { length: 1024, offset: 0 };
}
async function dsProbeHLS(url, headers, deadline, depth, inheritedKey) {
  if (depth > 3) throw new Error("HLS 层级过深");
  var got = await dsMedia(url, headers, false, deadline), text = dsText(got.response.data);
  if (!/^#EXTM3U/.test(text) || text.length > 3000000) throw new Error("非有效 HLS 播放列表");
  var lines = text.split(/\r?\n/).map(dsText).filter(function (x) { return !!x; }), variants = [], audio = {};
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf("#EXT-X-MEDIA:") === 0 && dsAttr(lines[i], "TYPE") === "AUDIO" && dsAttr(lines[i], "URI")) audio[dsAttr(lines[i], "GROUP-ID")] = dsResolve(got.url, dsAttr(lines[i], "URI"));
    if (lines[i].indexOf("#EXT-X-STREAM-INF:") !== 0) continue;
    for (var j = i + 1; j < lines.length; j++) {
      if (lines[j].charAt(0) === "#") continue;
      variants.push({ url: dsResolve(got.url, lines[j]), bandwidth: Number(dsAttr(lines[i], "BANDWIDTH")), resolution: dsAttr(lines[i], "RESOLUTION"), audio: dsAttr(lines[i], "AUDIO") });
      break;
    }
  }
  if (variants.length) {
    variants.sort(function (a, b) { return b.bandwidth - a.bandwidth; });
    for (var v = 0; v < Math.min(variants.length, 3); v++) {
      try {
        var child = await dsProbeHLS(variants[v].url, headers, deadline, depth + 1, inheritedKey);
        var audioURL = audio[variants[v].audio];
        if (audioURL) await dsProbeHLS(audioURL, headers, deadline, depth + 1, inheritedKey);
        var res = variants[v].resolution.match(/\d+x(\d+)/i);
        return { url: audioURL ? got.url : child.url, type: "HLS", quality: res ? res[1] + "P" : child.quality || "" };
      } catch (error) {}
    }
    throw new Error("没有子播放列表通过探测");
  }
  var segment = "", init = "", key = inheritedKey || "", range = { length: 1024, offset: 0 }, initRange = range;
  for (var n = 0; n < lines.length; n++) {
    var line = lines[n];
    if (line.indexOf("#EXT-X-MAP:") === 0) { init = dsResolve(got.url, dsAttr(line, "URI")); initRange = dsRange(dsAttr(line, "BYTERANGE")); }
    if (line.indexOf("#EXT-X-KEY:") === 0) {
      var method = dsAttr(line, "METHOD");
      if (method === "NONE") key = "";
      else if (method === "AES-128" && dsAttr(line, "URI")) key = dsResolve(got.url, dsAttr(line, "URI"));
      else throw new Error("不支持的加密媒体类型");
    }
    if (line.indexOf("#EXT-X-BYTERANGE:") === 0) range = dsRange(line.slice(17));
    if (line.charAt(0) !== "#") { segment = dsResolve(got.url, line); break; }
  }
  if (!segment) throw new Error("HLS 无媒体片段");
  var tasks = [dsProbeBytes(segment, headers, "segment", range.offset, range.length, deadline, !!key)];
  if (init && init !== segment) tasks.push(dsProbeBytes(init, headers, "init", initRange.offset, initRange.length, deadline, false));
  if (key) tasks.push(dsProbeBytes(key, headers, "key", 0, 16, deadline, false));
  await Promise.all(tasks);
  return { url: got.url, type: "HLS", quality: "" };
}
async function dsProbe(url, headers, mediaHint, deadline) {
  if (/\.m3u8(?:[?#]|$)/i.test(url)) return await dsProbeHLS(url, headers, deadline, 0, "");
  var initial = await dsMedia(url, dsMerge(headers, { Range: "bytes=0-4095" }), true, deadline);
  if (typeof initial.response.data !== "string") throw new Error("媒体首包无效");
  var bytes = dsBase64(initial.response.data), prefix = "";
  for (var i = 0; i < Math.min(bytes.length, 64); i++) prefix += String.fromCharCode(bytes[i]);
  if (/^(?:\u00ef\u00bb\u00bf)?\s*#EXTM3U/.test(prefix)) return await dsProbeHLS(initial.url, headers, deadline, 0, "");
  var finalURL = await dsProbeBytes(url, headers, "video", 0, 4096, deadline, false, initial);
  return { url: finalURL, type: "直链", quality: "" };
}
function dsTitleKey(value) {
  return dsText(value).toLowerCase().replace(/\[[^\]]*\]|【[^】]*】|\([^)]*\)|（[^）]*）/g, "").replace(/[\s\-_:：·.,，。!！?？/\\'"“”‘’]/g, "");
}
function dsNumber(value) {
  if (/^\d+$/.test(value)) return Number(value);
  var map = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 零: 0 }, parts = String(value || "").split("十");
  if (parts.length === 2) return (map[parts[0]] || 1) * 10 + (map[parts[1]] || 0);
  return map[value] || 0;
}
function dsSeason(value) {
  var m = dsText(value).match(/第\s*([一二三四五六七八九十两零\d]+)\s*季|\bseason\s*(\d+)\b|\bs(\d+)\b/i);
  return m ? dsNumber(m[1] || m[2] || m[3]) : 0;
}
function dsBaseTitle(value) { return dsText(value).replace(/第\s*[一二三四五六七八九十两零\d]+\s*季|\bseason\s*\d+\b|\bs\d+\b/gi, ""); }
function dsExclude(item, wanted) { return !/解说|预告|花絮|片段/.test(wanted) && /解说|预告|花絮|片段/.test(dsText(item.vod_name) + " " + dsText(item.vod_state)); }
function dsMatch(item, wanted, params) {
  if (!item.vod_id || dsExclude(item, wanted)) return 0;
  var type = dsText(params.type || params.mediaType).toLowerCase();
  if (type === "movie" && Number(item.type_id) !== 1) return 0;
  if (type === "tv" && Number(item.type_id) === 1) return 0;
  var season = Number(params.season) || dsSeason(wanted), foundSeason = dsSeason(item.vod_name);
  if (season > 1 && foundSeason !== season) return 0;
  if (season === 1 && foundSeason > 1) return 0;
  var key = dsTitleKey(item.vod_name), target = dsTitleKey(wanted), score = key === target ? 100 : 0;
  if (!score && dsTitleKey(dsBaseTitle(item.vod_name)) === dsTitleKey(dsBaseTitle(wanted))) score = 95;
  if (params.year && dsText(item.vod_year) === String(params.year)) score += score ? 5 : 0;
  return score;
}
function dsEpisode(source, requested, movie) {
  var text = dsText(source.url), entries = [], explicit = false;
  text.split("#").forEach(function (part) {
    var at = part.indexOf("$");
    if (at < 1) return;
    var title = part.slice(0, at), url = part.slice(at + 1), m = title.match(/^\s*(?:第\s*)?0*(\d{1,4})\s*(?:[集话話期]|$)/);
    if (m) explicit = true;
    entries.push({ title: title, origin: url, number: m ? Number(m[1]) : null });
  });
  if (movie) return requested === 1 ? entries[0] || null : null;
  for (var i = 0; i < entries.length; i++) if (entries[i].number === requested) return entries[i];
  return explicit ? null : entries[requested - 1] || null;
}
function dsParseTargets(source, origin) {
  var apis = [source.parse_api].concat(dsText(source.extra_parse_api).split(/\r?\n/));
  var seen = {}, targets = [];
  apis.forEach(function (api) {
    api = dsText(api);
    if (!dsValidURL(api) || seen[api]) return;
    seen[api] = true;
    if (api.indexOf("{url}") >= 0) targets.push(api.replace(/\{url\}/g, encodeURIComponent(origin)));
    else targets.push(api + encodeURIComponent(origin));
  });
  return targets.slice(0, 3);
}
function dsPlayData(object) {
  if (Array.isArray(object)) {
    for (var i = 0; i < object.length; i++) { var entry = dsPlayData(object[i]); if (entry) return entry; }
    return null;
  }
  if (typeof object === "string") return dsValidURL(object) ? { url: object, type: "", headers: {} } : null;
  if (!object || typeof object !== "object") return null;
  if (object.code != null && [1, 200].indexOf(Number(object.code)) < 0) return null;
  if (typeof object.url === "string" && dsValidURL(object.url)) return { url: object.url, type: dsText(object.type), headers: dsHeaders(object.headers || object.header) };
  return object.data && object.data !== object ? dsPlayData(object.data) : null;
}
async function dsLine(source, episode, title, deadline) {
  var start = Date.now(), headers = dsHeaders(source.headers), targetList = dsParseTargets(source, episode.origin);
  async function probeAndReturn(play) {
    var mediaHeaders = dsMerge(headers, play.headers), result = await dsProbe(play.url, mediaHeaders, play.type, deadline);
    return { name: "驰时录 · " + dsText(source.name || source.code) + (result.quality ? " · " + result.quality : ""), description: title + " · " + episode.title + " · " + result.type, url: result.url, headers: mediaHeaders, customHeaders: mediaHeaders, _latency: Date.now() - start };
  }
  if (source.parse_secret) {
    try {
      var secret = await dsAPI("secret_parse_api_url", { url: episode.origin, player_code: dsText(source.code) });
      var secretPlay = dsPlayData(secret.data);
      if (secretPlay) return await probeAndReturn(secretPlay);
    } catch (error) {}
  } else {
    for (var i = 0; i < targetList.length && Date.now() < deadline; i++) {
      try {
        var response = await Widget.http.get(targetList[i], { headers: { "User-Agent": "Dart/3.13 (dart:io)" } });
        if (!dsOK(response)) continue;
        var play = dsPlayData(dsReply(response.data));
        if (play) return await probeAndReturn(play);
      } catch (error) {}
    }
  }
  if (!source.parse_secret && /\.(?:m3u8|mp4|mkv|mov)(?:[?#]|$)/i.test(episode.origin) && Date.now() < deadline) {
    try { return await probeAndReturn({ url: episode.origin, headers: {}, type: /\.m3u8(?:[?#]|$)/i.test(episode.origin) ? "hls" : "mp4" }); }
    catch (error) {}
  }
  return null;
}
async function dsPool(items, limit, task) {
  var next = 0, output = new Array(items.length), workers = [];
  async function run() {
    while (next < items.length) { var index = next++; try { output[index] = await task(items[index], index); } catch (error) { output[index] = null; } }
  }
  for (var i = 0; i < Math.min(limit, items.length); i++) workers.push(run());
  await Promise.all(workers);
  return output;
}
async function loadResource(params) {
  params = params || {};
  var wanted = dsText(params.seriesName || params.title), requested = params.episode == null ? 1 : Number(params.episode);
  if (!wanted || !isFinite(requested) || requested < 1 || requested !== Math.floor(requested)) return [];
  var deadline = Date.now() + 18000, found = await dsAPI("search", { text: wanted, pg: 1 }), items = Array.isArray(found.data) ? found.data : [];
  function rank() { return items.map(function (item) { return { item: item, score: dsMatch(item, wanted, params) }; }).filter(function (x) { return x.score >= 95; }).sort(function (a, b) { return b.score - a.score; }); }
  var ranked = rank();
  if (!ranked.length && Number(found.pagecount) > 1 && Date.now() < deadline) {
    try { var page = await dsAPI("search", { text: wanted, pg: 2 }); items = items.concat(Array.isArray(page.data) ? page.data : []); ranked = rank(); } catch (error) {}
  }
  if (!ranked.length && dsSeason(wanted) > 0 && Date.now() < deadline) {
    try { var base = await dsAPI("search", { text: dsBaseTitle(wanted), pg: 1 }); items = items.concat(Array.isArray(base.data) ? base.data : []); ranked = rank(); } catch (error) {}
  }
  if (!ranked.length) return [];
  var info = await dsAPI("video_detail", { id: ranked[0].item.vod_id, sign_md5: "", apk_path: "", apk_length: 0 });
  var detail = info.data && info.data.vod_info;
  if (!detail || Number(detail.vod_id) !== Number(ranked[0].item.vod_id) || dsExclude(detail, wanted)) return [];
  var movie = Number(detail.type_id) === 1, sources = Array.isArray(detail.vod_url_with_player) ? detail.vod_url_with_player : [], candidates = [], seen = {};
  sources.forEach(function (source) {
    var episode = dsEpisode(source, requested, movie), identity = dsText(source.code || source.name) + ":" + (episode && episode.origin || "");
    if (!episode || !episode.origin || seen[identity]) return;
    seen[identity] = true;
    candidates.push({ source: source, episode: episode });
  });
  var all = await dsPool(candidates.slice(0, 20), 6, function (entry) {
    return Date.now() >= deadline ? null : dsLine(entry.source, entry.episode, dsText(detail.vod_name), deadline);
  });
  var used = {};
  return all.filter(function (entry) { if (!entry || used[entry.url]) return false; used[entry.url] = true; return true; }).sort(function (a, b) { return a._latency - b._latency; }).map(function (entry) { delete entry._latency; return entry; });
}
