/* Acid 2.0.0 */(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.$=t()})(this,function(){'use strict';let e;const t=(...t)=>{return e(...t)};t.superMethod=(t)=>{e=t};const n=Object,i=n.keys,r=n.is,s=n.assign,a=n.getOwnPropertyDescriptor,l=n.defineProperty,d=n.getOwnPropertyNames,c=(e)=>{return i(e).length};s(t,{assign:s,defineProperty:l,getOwnPropertyDescriptor:a,getOwnPropertyNames:d,is:r,keys:i,objectSize:c});const p=Array,o=p.from;s(t,{toArray:o});const u=Reflect.apply;s(t,{apply:u});const h=(e,t)=>{const n=e.length;for(let i=0;i<n;i++)t(e[i],i,e,n);return e},y=(e,t)=>{const n=e.length;for(let i=n-1;0<=i;i--)t(e[i],i,e,n);return e},g=(e,t)=>{const n=e.length;for(let i=0;i<n;i++)if(!1===t(e[i],i,e,n))return!1;return!0},m=(e,t,n=[])=>{return h(e,(e,i,r,s)=>{!0===t(e,i,n,r,s)&&n.push(e)}),n},f=((e)=>{return(t,n,i=[])=>{return e(t,(e,t,r,s)=>{i[t]=n(e,t,i,r,s)}),i}})(h),k=(e,t,n=[])=>{return h(e,(e,i,r,s)=>{const a=t(e,i,n,r,s);O(a)&&n.push(a)}),n};s(t,{compactMapArray:k,eachArray:h,eachArrayRight:y,filterArray:m,mapArray:f,mapArrayRight:(e,t,n=[])=>{let i=0;const r=e.length;for(let s=r-1;0<=s;s--)n[i]=t(e[s],s,e,r),i++;return n},mapWhile:(e,t,n=[])=>{const i=e.length;for(let r=0;r<i;r++){const s=t(e[r],r,n,e,i);if(!1===s)break;n[r]=s}return n},whileArray:g});const A=(e)=>{return`[object ${e}]`},x=function(e){return void 0===e},b=(e)=>{return null===e},O=(e)=>{return!x(e)&&!b(e)},w=(e)=>{return(t)=>{return!!O(t)&&t.toString()===e}},S=(e)=>{return(t)=>{return!!O(t)&&t.constructor===e}},v=/\.|\+/,j=Array.isArray,C=S(String),N=S(Number),M=(e)=>{return!!O(e)&&'Object('===e.constructor.toString().trim().slice(9,16)},F=(e)=>{return!!O(e)&&e instanceof Function},R=(e)=>{return!!e.length},I=(e)=>{return(t)=>{return!!O(t)&&e.test(t)}},E=I(/\.css$/),U=I(/\.json$/),L=I(/\.js$/),P=I(/\.html$/),D=I(/\./),B=/\.([0-9a-z]+)/;h(['Arguments','Map','Set','WeakMap'],(e)=>{t[`is${e}`]=w(A(e))});h(['ArrayBuffer','Float32Array','Float64Array','Int8Array','Int16Array','Int32Array','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array'],(e)=>{t[`is${e}`]=(t)=>{return!!O(t)&&t.constructor.name===e}}),s(t,{getFileExtension:(e)=>{const t=e.match(B);if(t)return t[1]},has:(e,...t)=>{return e.includes(...t)},hasDot:D,hasLength:R,hasValue:O,isArray:j,isBoolean:(e)=>{return'Boolean'===e.constructor.name},isDate:(e)=>{return e instanceof Date},isDecimal:(e)=>{return v.test(e.toString())},isEmpty:(e)=>{return C(e)||j(e)?!R(e):M(e)?!c(e):!O(e)},isFileCSS:E,isFileHTML:P,isFileJS:L,isFileJSON:U,isFunction:F,isNull:b,isNumber:N,isPlainObject:M,isRegExp:(e)=>{return e instanceof RegExp},isString:C,isUndefined:x});s(t,{asyncEach:async(e,t)=>{const n=e.length;for(let i=0;i<n;i++){const r=e[i];await r(t,i,e,n)}return e}});const q=(e)=>{return j(e)?e:[e]};s(t,{ensureArray:q});const K=(e)=>{return e.reduce((e,t)=>{return e.concat(j(t)?K(t):t)},[])};s(t,{flatten:(e,t=1)=>{let n=e;for(let r=0;r<t;r++)n=n.reduce((e,t)=>{return e.concat(q(t))},[]);return n},flattenDeep:K});s(t,{remove:(e,...t)=>{let n=e.length;for(let i=0;i<n;i++){const r=e[i];t.includes(r)&&(e.splice(i,1),i--,n--)}return e},removeBy:(e,t)=>{let n=e.length;for(let i=0;i<n;i++){const r=e[i];t(r,i)&&(e.splice(i,1),i--,n--)}return e}});s(t,{chunk:(e,t=1)=>{const n=[];let i=0;return e.forEach((e,r)=>{r%t||(n.push([]),r&&i++),n[i].push(e)}),n}});s(t,{rest:(e)=>{return e.slice(1,e.length)}});const T=(e)=>{return e.length=0,e};s(t,{clear:T});s(t,{right:(e,t)=>{return e[e.length-1-t]}});s(t,{cloneArray:(e)=>{return e.slice()}});const z=Math,W=z.floor,$=z.random,Z=(e,t=0)=>{return W($()*(e-t))+t};s(t,{add:(e,t)=>{return e+t},deduct:(e)=>{return e-1},divide:(e,t)=>{return e/t},increment:(e)=>{return e+1},minus:(e,t)=>{return e-t},multiply:(e,t)=>{return e*t},randomArbitrary:(e,t=0)=>{return $()*(e-t)+t},randomInt:Z,remainder:(e,t)=>{return e%t}});const J=(e,t=e.length)=>{if(1>=e.length)return o(e);const n=o(e);for(let i,r,s=0;s<t;)i=Z(n.length-1,0),r=n[s],n[s]=n[i],n[i]=r,s++;return n};s(t,{shuffle:J});s(t,{sample:(e,t=1)=>{if(!e)return!1;const n=e.length;if(n===t||t>n)return J(e);if(1===t)return[e[Z(n-1,0)]];const i=[],r={};for(let n,s=0;s<t;)n=Z(e.length-1,0),r[n]||(i.push(e[n]),r[n]=!0,s++);return i}});s(t,{compact:(e)=>{return e.filter((e)=>{return C(e)&&!e.length?!1:e})}});s(t,{initial:(e)=>{return e.slice(0,e.length-1)}});const V=Math.min;s(t,{smallest:(e)=>{return V(...e)}});const _=(e,t,n)=>{const i=[];for(let r=e;r<t;)i.push(r),r+=n;return i},H=(e,t,n)=>{const i=0>n?-1*n:n,r=[];for(let s=e;s<t;)r.push(s),s-=i;return r};s(t,{range:(e,t,n=1)=>{return e<t?_(e,t,n):H(e,t,n)},rangeRight:(e,t,n=1)=>{return H(t,e,n)}});s(t,{intersect:(e,...t)=>{return k(e,(e)=>{const n=g(t,(t)=>{return t.includes(e)});if(n)return e})}});s(t,{difference:(e,...t)=>{const n=K(t);return k(e,(e)=>{if(!n.includes(e))return e})}});const Y=(e,t,n=e.length)=>{return e.splice(t,n)};s(t,{drop:Y,dropRight:(e,t,n=e.length)=>{return Y(e,0,n-t)}});const X=(e,t)=>{return e.length===t.length&&g(e,(e,n)=>{return t[n]===e})};s(t,{isMatchArray:X});s(t,{sortedIndex:(e,t)=>{let n=0;return g(e,(e,i)=>{return n=i,!!(t>e)}),n}});const Q=Math.max;s(t,{largest:(e)=>{return Q(...e)}});s(t,{sum:(e)=>{return e.reduce((e,t)=>{return e+t},0)}});const G=async(e,t)=>{const n=e.length;for(let i=0;i<n;i++)await t(e[i],i,e,n);return e},ee=async(e,t)=>{const n=e.length;for(let i=n-1;0<=i;i--)await t(e[i],i,e,n);return e};s(t,{eachAsync:G,eachAsyncRight:ee});s(t,{last:(e,t)=>{const n=e.length;return t?e.slice(n-t,n):e[n-1]}});s(t,{take:(e,t=1)=>{return e.slice(0,t)},takeRight:(e,t=1)=>{const n=e.length;return e.slice(n-t,n)}});const te=async(e,t)=>{const n=[];return await G(e,async(e,i,r)=>{n[i]=await t(e,i,r)}),n};s(t,{mapAsync:te});const ne=(e,t,n)=>{return n.indexOf(e)===t},ie=(e,t,n)=>{return e!==n[t-1]},re=(e,t)=>{return t?e.filter(ie):e.filter(ne)};s(t,{unique:re});s(t,{union:(...e)=>{return re(K(e))}});s(t,{compactMapAsync:async(e,t)=>{const n=[];let i;return await G(e,async(e,r,s)=>{i=await t(e,r,n,s),O(i)&&n.push(i)}),n}});const se=(e,t)=>{return e-t};s(t,{numSort:(e)=>{return e.sort(se)}});s(t,{arrayToObject:(e,t)=>{const n={};return h(e,(e,i)=>{n[t[i]]=e}),n}});s(t,{without:(e,t)=>{return e.filter((e)=>{return!t.includes(e)})}});s(t,{partition:(e,t)=>{const n=[];return[k(e,(e)=>{return t(e)?e:void n.push(e)}),n]}});s(t,{xor:(...e)=>{const t=[];return h(e,(e)=>{h(re(e),(e)=>{t.includes(e)?t.splice(t.indexOf(e),1):t.push(e)})}),t}});s(t,{unZip:(e)=>{return e[0].map((t,n)=>{return e.map((e)=>{return e[n]})})},zip:(...e)=>{return e[0].map((t,n)=>{return e.map((e)=>{return e[n]})})}});s(t,{first:(e,t)=>{return t?e.slice(0,t):e[0]}});const ae=(e,t)=>{return t-e};s(t,{rNumSort:(e)=>{return e.sort(ae)}});const le=(e,t,n)=>{const i=n?e:0,r=n?t:e;for(let s=i;s<r;s++)(n||t)(s,i,r)};s(t,{times:le,timesMap:(e,t,n,i=[])=>{const r=n?e:0,s=n?t:e;let a;return le(r,s,(e)=>{a=(n||t)(e,r,s,i),O(a)&&i.push(a)}),i}});const de=(e,t,n=!0)=>{const i=n?e:[...e];return i.sort((e,n)=>{return n[t]?e[t]?e[t]<n[t]?1:e[t]>n[t]?-1:0:1:-1})};s(t,{getNewest:(e,t)=>{return de(e,t,!1)[0]},sortNewest:de});const ce=(e,t='id',n=!0)=>{const i=n?e:[...e];return i.sort((e,n)=>{return n[t]?e[t]?e[t]<n[t]?-1:e[t]>n[t]?1:0:-1:1})};s(t,{getOldest:(e,t='id')=>{return ce(e,t)[0]},sortOldest:ce});s(t,{groupBy:(e,t)=>{const n={};return h(e,(e)=>{const i=t(e);n[i]||(n[i]=[]),n[i].push(e)}),n}});s(t,{countBy:(e,t)=>{const n={};let i;return h(e,(e)=>{i=t(e),n[i]||(n[i]=0),n[i]++}),n},countKey:(e,t)=>{let n=0;return h(e,(e)=>{e[t]&&n++}),n},countWithoutKey:(e,t)=>{let n=0;return h(e,(e)=>{e[t]||n++}),n}});s(t,{indexBy:(e,t='id')=>{const n={};return h(e,(e)=>{n[e[t]]=e}),n}});s(t,{pluck:(e,t)=>{return f(e,(e)=>{const n=e[t];return n})}});const pe=(e,t)=>{return f(t,(t)=>{return e[t]})};s(t,{pluckObject:pe});s(t,{pluckValues:(e,t)=>{return f(e,(e)=>{return pe(e,t)})}});s(t,{invoke:(e,t,n)=>{return f(e,(e,i)=>{return e[t](n,i)})}});s(t,{invokeAsync:(e,t,n)=>{return te(e,async(e,i)=>{return e[t](n,i)})}});const oe=(e,t,n,i,r)=>{if(e[r]===i)return!0};s(t,{findIndex:(e,t,n='id')=>{const i=e.findIndex((i,r)=>{return oe(i,r,e,t,n)});return-1!==i&&i},findItem:(e,t,n='id')=>{const i=e.find((i,r)=>{return oe(i,r,e,t,n)});return-1!==i&&i}});s(t,{sortAlphabetical:(e,t)=>{return e.sort((e,n)=>{const i=e[t],r=n[t];return i<r?-1:i>r?1:0})}});s(t,{ary:(e,t)=>{return(...n)=>{return e(...n.splice(0,t))}}});s(t,{curry:(e,t=e.length)=>{const n=[],i=(...r)=>{if(n.push(...r),n.length===t){const t=e(...n);return T(n),t}return i};return i},curryRight:(e,t=e.length)=>{const n=[],i=(...r)=>{if(n.unshift(...r),n.length===t){const t=e(...n);return T(n),t}return i};return i}});s(t,{after:(e,t)=>{let n,i=e;return(...e)=>{return null!==i&&i--,0>=i&&(n=t(...e),i=null),n}},before:(e,t)=>{let n,i=e;return(...e)=>{return null!==i&&i--,1<=i?n=t(...e):i=null,n}},once:(e)=>{let t;return(...n)=>{return O(t)||(t=e(...n)),t}}});s(t,{noop:()=>{},stubArray:()=>{return[]},stubFalse:()=>{return!1},stubObject:()=>{return{}},stubString:()=>{return''},stubTrue:()=>{return!0}});const ue=(e,t)=>{const n=i(e);h(n,(i,r,s,a)=>{t(e[i],i,e,a,n)})},he=(e,t)=>{const n=i(e);return g(n,(n,i,r,s)=>{return t(e[n],n,e,s,r)})},ye=(e,t,n={})=>{return ue(e,(e,i,r,s,a)=>{!0===t(e,i,n,r,s,a)&&(n[i]=e)}),n},ge=(e,t,n={})=>{return ue(e,(e,i,r,s,a)=>{n[i]=t(e,i,n,r,s,a)}),n},me=(e,t,n={})=>{return ue(e,(e,i,r,s,a)=>{const l=t(e,i,n,s,a);O(l)&&(n[i]=l)}),n};s(t,{compactMapObject:me,eachObject:ue,filterObject:ye,mapObject:ge,whileObject:he});const fe=(e,t)=>{return e.forEach(t)},ke=(e,t)=>{return(n,i,r)=>{let s;if(O(n))return s=j(n)?e:M(n)||F(n)?t:n.forEach?fe:t,s(n,i,r)}},Ae=ke(g,he),xe=ke(h,ue),be=ke(m,ye),Oe=ke(f,ge),we=ke(k,me);s(t,{compactMap:we,each:xe,eachWhile:Ae,filter:be,map:Oe});s(t,{bindAll:(e,t)=>{return Oe(e,(e)=>{return F(e)?e.bind(t):e})}});s(t,{ifInvoke:(e,...t)=>{if(F(e))return e(...t)}});s(t,{negate:(e)=>{return(...t)=>{return!e(...t)}}});s(t,{every:Ae});s(t,{over:(e)=>{return(...t)=>{return Oe(e,(e)=>{return e(...t)})}},overEvery:(e)=>{return(...t)=>{return Ae(e,(e)=>{return e(...t)})}}});const Se=(e,t)=>{return setTimeout(e,t)},ve=(e,t)=>{return setInterval(e,t)},je=(e,t)=>{return()=>{le(0,e(()=>{},0),(e)=>{t(e)})}},Ce=je(Se,clearTimeout),Ne=je(ve,clearInterval);s(t,{clearIntervals:Ne,clearTimers:Ce,debounce:(e,t)=>{let n=!1;const i=(...i)=>{!1!=n&&clearTimeout(n),n=Se(()=>{e(...i),n=!1},t)};return i.clear=()=>{n&&(clearTimeout(n),n=!1)},i},interval:ve,throttle:(e,t)=>{let n,i=!1;const r=(...r)=>{return i?void(n=!0):void(e(...r),i=Se(()=>{n&&e(...r),i=!1},t))};return r.clear=()=>{clearTimeout(i),i=!1},r},timer:Se});const Me=(e,t)=>{return xe(t,(t,n)=>{e.methods[n]=(...n)=>{return t(e.value,...n),e.methods}}),e};s(t,{chain:(e)=>{const t=(e)=>{return t.value=e,t.methods};return s(t,{add(e){return Me(t,e)},done(){const e=t.value;return t.value=null,e},methods:{}}),t.add(e),t}});s(t,{inAsync:async(e,t)=>{return G(e,async(e)=>{await e(t)})},inSync:(e,t)=>{return xe(e,(e)=>{e(t)})}});s(t,{nthArg:(e=0)=>{return(...t)=>{return t[e]}}});s(t,{reArg:(e,t)=>{return(...n)=>{return e(...t.map((e)=>{return n[e]}))}}});s(t,{wrap:(e,t)=>{return(...n)=>{return t(e,...n)}}});s(t,{isNumberEqual:(e,t)=>{return e===t},isNumberInRange:(e,t,n)=>{return e>t&&e<n},isZero:(e)=>{return 0===e}});const Fe=(e,t)=>{const n=i(e);return g(t,(e)=>{return n.includes(e)})};s(t,{hasAnyKeys:(e,t)=>{const n=i(e);return!!t.find((e)=>{return n.includes(e)})},hasKeys:Fe});s(t,{pick:(e,t,n={})=>{return h(t,(t)=>{n[t]=e[t]}),n}});s(t,{compactKeys:(e)=>{const t=[];return ue(e,(e,n)=>{e&&t.push(n)}),t}});s(t,{isMatchObject:(e,t)=>{const n=i(e);return!!X(n,i(t))&&g(n,(n)=>{return e[n]===t[n]})}});s(t,{unZipObject:(e)=>{const t=[],n=[];return ue(e,(e,i)=>{t.push(i),n.push(e)}),[t,n]},zipObject:(e,t)=>{const n={};return h(e,(e,i)=>{n[e]=t[i]}),n}});s(t,{invert:(e,t={})=>{return ue(e,(e,n)=>{t[e]=n}),t}});s(t,{omit:(e,t)=>{return ye(e,(e,n)=>{return!t.includes(n)})}});const Re=/[-_]/g,Ie=/ (.)/g;s(t,{camelCase:(e)=>{return e.toLowerCase().replace(Ie,(e)=>{return e.toUpperCase().replace(/ /g,'')})},kebabCase:(e)=>{return e.replace(Re,' ').trim().toLowerCase().replace(Ie,'-$1')},snakeCase:(e)=>{return e.replace(Re,' ').trim().toLowerCase().replace(Ie,'_$1')},upperCase:(e)=>{return e.replace(Re,' ').trim().toUpperCase()}});const Ee=(e,t=1)=>{return e.substr(t)};s(t,{chunkString:(e,t)=>{return e.match(new RegExp(`(.|[\r\n]){1,${t}}`,'g'))},initialString:(e,t=1)=>{return e.slice(0,-1*t)},insertInRange:(e,t,n)=>{return e.slice(0,t)+n+e.slice(t,e.length)},restString:Ee,rightString:(e,t=1)=>{return e[e.length-t]}});s(t,{replaceList:(e,t,n)=>{return e.replace(new RegExp('\\b'+t.join('|')+'\\b','gi'),n)}});const Ue=/%(?![\da-f]{2})/gi,Le=/&/g,Pe=/</g,De=/>/g,Be=/"/g,qe=(e)=>{return decodeURIComponent(e.replace(Ue,()=>{return'%25'}))},Ke=(e)=>{return e.replace(Le,'&amp;').replace(Pe,'&lt;').replace(De,'&gt;').replace(Be,'&quot;')};s(t,{htmlEntities:Ke,rawURLDecode:qe,sanitize:(e)=>{return Ke(qe(e))}});const Te=/\S+/g,ze=/\w+/g;s(t,{tokenize:(e)=>{return e.match(Te)||[]},words:(e)=>{return e.match(ze)||[]}});const We=(e,t,n)=>{const i=e.split(''),r=i.length;let s,a=n-t;for(;a<r&&0<=a&&(s=i[a],' '!==s);a--);return e.slice(0,a).trim()},$e=(e,t,n)=>{const i=e.split(''),r=i.length;let s,a=t;for(;a<r&&0<a&&(s=i[a],' '!==s);a++);return e.substr(a,n).trim()};s(t,{truncate:(e,t)=>{const n=e.length;return n>t?We(e,t,n):e},truncateRight:(e,t)=>{const n=e.length;return n>t?$e(e,t,n):e}});const Ze=/ (.)/g,Je=(e)=>{return e[0].toUpperCase()},Ve=(e)=>{return Je(e)+Ee(e).toLowerCase()};s(t,{upperFirst:(e)=>{return Je(e)+Ee(e)},upperFirstAll:(e)=>{return e.replace(Ze,(e)=>{return e.toUpperCase()})},upperFirstLetter:Je,upperFirstOnly:Ve,upperFirstOnlyAll:(e)=>{return Ve(e.toLowerCase()).replace(Ze,(e)=>{return e.toUpperCase()})}});const _e=(e,t,n=!0)=>{return xe(t,(t,i)=>{M(t)&&M(e[i])?_e(e[i],t,n):n&&j(t)&&j(e[i])?e[i].push(...t):e[i]=t}),e};s(t,{assignDeep:_e});const He=Function.prototype;s(t,{cacheNativeMethod:function(e){return He.call.bind(e)}});s(t,{ifNotEqual:(e,t,n)=>{return t&&!O(e[t])&&(e[t]=n),e}});const Ye=(e,t)=>{if(e===t)return!0;if(e.toString()===t.toString())if(M(e)){const n=i(e);if(Fe(t,n))return g(n,(n)=>{return Ye(e[n],t[n])})}else if(j(e)&&e.length===t.length)return g(e,(e,n)=>{return Ye(e,t[n])});return!1};s(t,{isEqual:Ye});s(t,{propertyMatch:(e,t,n=i(e))=>{return g(n,(n)=>{return Ye(e[n],t[n])})}});const Xe=/\.|\[/,Qe=/]/g,Ge=(e)=>{return e.replace(Qe,'').split(Xe)};s(t,{toPath:Ge});let et=0;const tt=[],nt={},it=()=>{let e=tt.shift(tt);return O(e)||(e=et,nt[e]=!0,et++),e};it.free=(e)=>{nt[e]=null,tt.push(e)},s(t,{uid:it});const rt=(e,n=t)=>{let i=n;return g(Ge(e),(e)=>{return i=i[e],O(i)}),i};s(t,{get:rt});const st=JSON,at=st.parse,lt=st.stringify;s(t,{jsonParse:at,stringify:lt});const dt=(e,t)=>{return O(t)&&(dt[e]=t),rt(e,dt)};t.superMethod(dt),s(t,{model:dt});s(t,{promise:(e)=>{return new Promise(e)}});s(t,{toggle:(e,t,n)=>{return Ye(t,e)?n:t}});const ct=(e)=>{return(...t)=>{return(n)=>{let i=n;return e(t,(e)=>{i=e(i)}),i}}},pt=ct(h),ot=ct(y);s(t,{flow:pt,flowRight:ot});const ut=(e)=>{return(...t)=>{return async(n)=>{let i=n;return await e(t,async(e)=>{i=await e(i)}),i}}},ht=ut(G),yt=ut(ee);return s(t,{flowAsync:ht,flowAsyncRight:yt}),t});
//# sourceMappingURL=index.js.map
