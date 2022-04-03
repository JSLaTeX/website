import{g as Sr}from"./index.45849c19.js";function Er(e,r){return r.forEach(function(t){t&&typeof t!="string"&&!Array.isArray(t)&&Object.keys(t).forEach(function(l){if(l!=="default"&&!(l in e)){var a=Object.getOwnPropertyDescriptor(t,l);Object.defineProperty(e,l,a.get?a:{enumerable:!0,get:function(){return t[l]}})}})}),Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var $r={},Or=Object.freeze(Object.defineProperty({__proto__:null,default:$r},Symbol.toStringTag,{value:"Module"})),de=Sr(Or),ze=Object.defineProperty,Pr=Object.defineProperties,jr=Object.getOwnPropertyDescriptor,Dr=Object.getOwnPropertyDescriptors,_r=Object.getOwnPropertyNames,Qe=Object.getOwnPropertySymbols,fr=Object.prototype.hasOwnProperty,Ar=Object.prototype.propertyIsEnumerable,Xe=(e,r,t)=>r in e?ze(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,Ge=(e,r)=>{for(var t in r||(r={}))fr.call(r,t)&&Xe(e,t,r[t]);if(Qe)for(var t of Qe(r))Ar.call(r,t)&&Xe(e,t,r[t]);return e},Ze=(e,r)=>Pr(e,Dr(r)),Tr=(e,r)=>{for(var t in r)ze(e,t,{get:r[t],enumerable:!0})},Mr=(e,r,t,l)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of _r(r))!fr.call(e,a)&&a!==t&&ze(e,a,{get:()=>r[a],enumerable:!(l=jr(r,a))||l.enumerable});return e},Nr=e=>Mr(ze({},"__esModule",{value:!0}),e),Te={};Tr(Te,{analyzeMetafile:()=>it,analyzeMetafileSync:()=>ut,build:()=>rt,buildSync:()=>at,default:()=>dt,formatMessages:()=>lt,formatMessagesSync:()=>st,initialize:()=>ft,serve:()=>tt,transform:()=>nt,transformSync:()=>ot,version:()=>et});var er=Nr(Te);function rr(e){let r=l=>{if(l===null)t.write8(0);else if(typeof l=="boolean")t.write8(1),t.write8(+l);else if(typeof l=="number")t.write8(2),t.write32(l|0);else if(typeof l=="string")t.write8(3),t.write(ke(l));else if(l instanceof Uint8Array)t.write8(4),t.write(l);else if(l instanceof Array){t.write8(5),t.write32(l.length);for(let a of l)r(a)}else{let a=Object.keys(l);t.write8(6),t.write32(a.length);for(let o of a)t.write(ke(o)),r(l[o])}},t=new cr;return t.write32(0),t.write32(e.id<<1|+!e.isRequest),r(e.value),Ke(t.buf,t.len-4,0),t.buf.subarray(0,t.len)}function Cr(e){let r=()=>{switch(t.read8()){case 0:return null;case 1:return!!t.read8();case 2:return t.read32();case 3:return De(t.read());case 4:return t.read();case 5:{let i=t.read32(),y=[];for(let s=0;s<i;s++)y.push(r());return y}case 6:{let i=t.read32(),y={};for(let s=0;s<i;s++)y[De(t.read())]=r();return y}default:throw new Error("Invalid packet")}},t=new cr(e),l=t.read32(),a=(l&1)===0;l>>>=1;let o=r();if(t.ptr!==e.length)throw new Error("Invalid packet");return{id:l,isRequest:a,value:o}}var cr=class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let r=new Uint8Array((this.len+e)*2);r.set(this.buf),this.buf=r}return this.len+=e,this.len-e}write8(e){let r=this._write(1);this.buf[r]=e}write32(e){let r=this._write(4);Ke(this.buf,e,r)}write(e){let r=this._write(4+e.length);Ke(this.buf,e.length,r),this.buf.set(e,r+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return dr(this.buf,this._read(4))}read(){let e=this.read32(),r=new Uint8Array(e),t=this._read(r.length);return r.set(this.buf.subarray(t,t+e)),r}},ke,De;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let e=new TextEncoder,r=new TextDecoder;ke=t=>e.encode(t),De=t=>r.decode(t)}else if(typeof Buffer<"u")ke=e=>{let r=Buffer.from(e);return r instanceof Uint8Array||(r=new Uint8Array(r)),r},De=e=>{let{buffer:r,byteOffset:t,byteLength:l}=e;return Buffer.from(r,t,l).toString()};else throw new Error("No UTF-8 codec found");function dr(e,r){return e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24}function Ke(e,r,t){e[t++]=r,e[t++]=r>>8,e[t++]=r>>16,e[t++]=r>>24}function tr(e){if(e+="",e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}var Le=()=>null,z=e=>typeof e=="boolean"?null:"a boolean",Fr=e=>typeof e=="boolean"||typeof e=="object"&&!Array.isArray(e)?null:"a boolean or an object",p=e=>typeof e=="string"?null:"a string",Be=e=>e instanceof RegExp?null:"a RegExp object",je=e=>typeof e=="number"&&e===(e|0)?null:"an integer",He=e=>typeof e=="function"?null:"a function",H=e=>Array.isArray(e)?null:"an array",we=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object",Lr=e=>typeof e=="object"&&e!==null?null:"an array or an object",nr=e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null",hr=e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean",Br=e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object",Rr=e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array",Ir=e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array";function n(e,r,t,l){let a=e[t];if(r[t+""]=!0,a===void 0)return;let o=l(a);if(o!==null)throw new Error(`"${t}" must be ${o}`);return a}function Q(e,r,t){for(let l in e)if(!(l in r))throw new Error(`Invalid option ${t}: "${l}"`)}function Wr(e){let r=Object.create(null),t=n(e,r,"wasmURL",p),l=n(e,r,"worker",z);return Q(e,r,"in startService() call"),{wasmURL:t,worker:l}}function mr(e){let r;if(e!==void 0){r=Object.create(null);for(let t of Object.keys(e)){let l=e[t];if(typeof l=="string"||l===!1)r[t]=l;else throw new Error(`Expected ${JSON.stringify(t)} in mangle cache to map to either a string or false`)}}return r}function Re(e,r,t,l,a){let o=n(r,t,"color",z),i=n(r,t,"logLevel",p),y=n(r,t,"logLimit",je);o!==void 0?e.push(`--color=${o}`):l&&e.push("--color=true"),e.push(`--log-level=${i||a}`),e.push(`--log-limit=${y||0}`)}function gr(e,r,t){let l=n(r,t,"legalComments",p),a=n(r,t,"sourceRoot",p),o=n(r,t,"sourcesContent",z),i=n(r,t,"target",Rr),y=n(r,t,"format",p),s=n(r,t,"globalName",p),m=n(r,t,"mangleProps",Be),w=n(r,t,"reserveProps",Be),E=n(r,t,"mangleQuoted",z),$=n(r,t,"minify",z),O=n(r,t,"minifySyntax",z),N=n(r,t,"minifyWhitespace",z),J=n(r,t,"minifyIdentifiers",z),le=n(r,t,"drop",H),ue=n(r,t,"charset",p),ie=n(r,t,"treeShaking",z),fe=n(r,t,"ignoreAnnotations",z),he=n(r,t,"jsx",p),pe=n(r,t,"jsxFactory",p),me=n(r,t,"jsxFragment",p),ye=n(r,t,"define",we),Ee=n(r,t,"pure",H),_e=n(r,t,"keepNames",z);if(l&&e.push(`--legal-comments=${l}`),a!==void 0&&e.push(`--source-root=${a}`),o!==void 0&&e.push(`--sources-content=${o}`),i&&(Array.isArray(i)?e.push(`--target=${Array.from(i).map(tr).join(",")}`):e.push(`--target=${tr(i)}`)),y&&e.push(`--format=${y}`),s&&e.push(`--global-name=${s}`),$&&e.push("--minify"),O&&e.push("--minify-syntax"),N&&e.push("--minify-whitespace"),J&&e.push("--minify-identifiers"),ue&&e.push(`--charset=${ue}`),ie!==void 0&&e.push(`--tree-shaking=${ie}`),fe&&e.push("--ignore-annotations"),le)for(let h of le)e.push(`--drop:${h}`);if(m&&e.push(`--mangle-props=${m.source}`),w&&e.push(`--reserve-props=${w.source}`),E!==void 0&&e.push(`--mangle-quoted=${E}`),he&&e.push(`--jsx=${he}`),pe&&e.push(`--jsx-factory=${pe}`),me&&e.push(`--jsx-fragment=${me}`),ye)for(let h in ye){if(h.indexOf("=")>=0)throw new Error(`Invalid define: ${h}`);e.push(`--define:${h}=${ye[h]}`)}if(Ee)for(let h of Ee)e.push(`--pure:${h}`);_e&&e.push("--keep-names")}function Ur(e,r,t,l,a){var o;let i=[],y=[],s=Object.create(null),m=null,w=null,E=null;Re(i,r,s,t,l),gr(i,r,s);let $=n(r,s,"sourcemap",hr),O=n(r,s,"bundle",z),N=n(r,s,"watch",Fr),J=n(r,s,"splitting",z),le=n(r,s,"preserveSymlinks",z),ue=n(r,s,"metafile",z),ie=n(r,s,"outfile",p),fe=n(r,s,"outdir",p),he=n(r,s,"outbase",p),pe=n(r,s,"platform",p),me=n(r,s,"tsconfig",p),ye=n(r,s,"resolveExtensions",H),Ee=n(r,s,"nodePaths",H),_e=n(r,s,"mainFields",H),h=n(r,s,"conditions",H),c=n(r,s,"external",H),u=n(r,s,"loader",we),d=n(r,s,"outExtension",we),R=n(r,s,"publicPath",p),C=n(r,s,"entryNames",p),D=n(r,s,"chunkNames",p),P=n(r,s,"assetNames",p),F=n(r,s,"inject",H),_=n(r,s,"banner",we),S=n(r,s,"footer",we),T=n(r,s,"entryPoints",Lr),L=n(r,s,"absWorkingDir",p),j=n(r,s,"stdin",we),U=(o=n(r,s,"write",z))!=null?o:a,ne=n(r,s,"allowOverwrite",z),A=n(r,s,"incremental",z)===!0,b=n(r,s,"mangleCache",we);if(s.plugins=!0,Q(r,s,`in ${e}() call`),$&&i.push(`--sourcemap${$===!0?"":`=${$}`}`),O&&i.push("--bundle"),ne&&i.push("--allow-overwrite"),N)if(i.push("--watch"),typeof N=="boolean")E={};else{let f=Object.create(null),k=n(N,f,"onRebuild",He);Q(N,f,`on "watch" in ${e}() call`),E={onRebuild:k}}if(J&&i.push("--splitting"),le&&i.push("--preserve-symlinks"),ue&&i.push("--metafile"),ie&&i.push(`--outfile=${ie}`),fe&&i.push(`--outdir=${fe}`),he&&i.push(`--outbase=${he}`),pe&&i.push(`--platform=${pe}`),me&&i.push(`--tsconfig=${me}`),ye){let f=[];for(let k of ye){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${k}`);f.push(k)}i.push(`--resolve-extensions=${f.join(",")}`)}if(R&&i.push(`--public-path=${R}`),C&&i.push(`--entry-names=${C}`),D&&i.push(`--chunk-names=${D}`),P&&i.push(`--asset-names=${P}`),_e){let f=[];for(let k of _e){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid main field: ${k}`);f.push(k)}i.push(`--main-fields=${f.join(",")}`)}if(h){let f=[];for(let k of h){if(k+="",k.indexOf(",")>=0)throw new Error(`Invalid condition: ${k}`);f.push(k)}i.push(`--conditions=${f.join(",")}`)}if(c)for(let f of c)i.push(`--external:${f}`);if(_)for(let f in _){if(f.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${f}`);i.push(`--banner:${f}=${_[f]}`)}if(S)for(let f in S){if(f.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${f}`);i.push(`--footer:${f}=${S[f]}`)}if(F)for(let f of F)i.push(`--inject:${f}`);if(u)for(let f in u){if(f.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${f}`);i.push(`--loader:${f}=${u[f]}`)}if(d)for(let f in d){if(f.indexOf("=")>=0)throw new Error(`Invalid out extension: ${f}`);i.push(`--out-extension:${f}=${d[f]}`)}if(T)if(Array.isArray(T))for(let f of T)y.push(["",f+""]);else for(let[f,k]of Object.entries(T))y.push([f+"",k+""]);if(j){let f=Object.create(null),k=n(j,f,"contents",p),W=n(j,f,"resolveDir",p),x=n(j,f,"sourcefile",p),g=n(j,f,"loader",p);Q(j,f,'in "stdin" object'),x&&i.push(`--sourcefile=${x}`),g&&i.push(`--loader=${g}`),W&&(w=W+""),m=k?k+"":""}let v=[];if(Ee)for(let f of Ee)f+="",v.push(f);return{entries:y,flags:i,write:U,stdinContents:m,stdinResolveDir:w,absWorkingDir:L,incremental:A,nodePaths:v,watch:E,mangleCache:mr(b)}}function zr(e,r,t,l){let a=[],o=Object.create(null);Re(a,r,o,t,l),gr(a,r,o);let i=n(r,o,"sourcemap",hr),y=n(r,o,"tsconfigRaw",Br),s=n(r,o,"sourcefile",p),m=n(r,o,"loader",p),w=n(r,o,"banner",p),E=n(r,o,"footer",p),$=n(r,o,"mangleCache",we);return Q(r,o,`in ${e}() call`),i&&a.push(`--sourcemap=${i===!0?"external":i}`),y&&a.push(`--tsconfig-raw=${typeof y=="string"?y:JSON.stringify(y)}`),s&&a.push(`--sourcefile=${s}`),m&&a.push(`--loader=${m}`),w&&a.push(`--banner=${w}`),E&&a.push(`--footer=${E}`),{flags:a,mangleCache:mr($)}}function wr(e){let r=new Map,t=new Map,l=new Map,a=new Map,o=null,i=0,y=0,s=new Uint8Array(16*1024),m=0,w=h=>{let c=m+h.length;if(c>s.length){let d=new Uint8Array(c*2);d.set(s),s=d}s.set(h,m),m+=h.length;let u=0;for(;u+4<=m;){let d=dr(s,u);if(u+4+d>m)break;u+=4,le(s.subarray(u,u+d)),u+=d}u>0&&(s.copyWithin(0,u,m),m-=u)},E=h=>{o={reason:h?": "+(h.message||h):""};const c="The service was stopped"+o.reason;for(let u of r.values())u(c,null);r.clear();for(let u of a.values())u.onWait(c);a.clear();for(let u of l.values())try{u(new Error(c),null)}catch(d){console.error(d)}l.clear()},$=(h,c,u)=>{if(o)return u("The service is no longer running"+o.reason,null);let d=i++;r.set(d,(R,C)=>{try{u(R,C)}finally{h&&h.unref()}}),h&&h.ref(),e.writeToStdin(rr({id:d,isRequest:!0,value:c}))},O=(h,c)=>{if(o)throw new Error("The service is no longer running"+o.reason);e.writeToStdin(rr({id:h,isRequest:!1,value:c}))},N=async(h,c)=>{try{switch(c.command){case"ping":{O(h,{});break}case"on-start":{let u=t.get(c.key);u?O(h,await u(c)):O(h,{});break}case"on-resolve":{let u=t.get(c.key);u?O(h,await u(c)):O(h,{});break}case"on-load":{let u=t.get(c.key);u?O(h,await u(c)):O(h,{});break}case"serve-request":{let u=a.get(c.key);u&&u.onRequest&&u.onRequest(c.args),O(h,{});break}case"serve-wait":{let u=a.get(c.key);u&&u.onWait(c.error),O(h,{});break}case"watch-rebuild":{let u=l.get(c.key);try{u&&u(null,c.args)}catch(d){console.error(d)}O(h,{});break}default:throw new Error("Invalid command: "+c.command)}}catch(u){O(h,{errors:[$e(u,e,null,void 0,"")]})}},J=!0,le=h=>{if(J){J=!1;let u=String.fromCharCode(...h);if(u!=="0.14.30")throw new Error(`Cannot start service: Host version "0.14.30" does not match binary version ${JSON.stringify(u)}`);return}let c=Cr(h);if(c.isRequest)N(c.id,c.value);else{let u=r.get(c.id);r.delete(c.id),c.value.error?u(c.value.error,{}):u(null,c.value)}},ue=async(h,c,u,d,R)=>{let C=[],D=[],P={},F={},_=0,S=0,T=[],L=!1;c=[...c];for(let A of c){let b={};if(typeof A!="object")throw new Error(`Plugin at index ${S} must be an object`);const v=n(A,b,"name",p);if(typeof v!="string"||v==="")throw new Error(`Plugin at index ${S} is missing a name`);try{let f=n(A,b,"setup",He);if(typeof f!="function")throw new Error("Plugin is missing a setup function");Q(A,b,`on plugin ${JSON.stringify(v)}`);let k={name:v,onResolve:[],onLoad:[]};S++;let x=f({initialOptions:h,resolve:(g,B={})=>{if(!L)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof g!="string")throw new Error("The path to resolve must be a string");let M=Object.create(null),X=n(B,M,"pluginName",p),Y=n(B,M,"importer",p),K=n(B,M,"namespace",p),ee=n(B,M,"resolveDir",p),G=n(B,M,"kind",p),I=n(B,M,"pluginData",Le);return Q(B,M,"in resolve() call"),new Promise((q,Z)=>{const V={command:"resolve",path:g,key:u,pluginName:v};X!=null&&(V.pluginName=X),Y!=null&&(V.importer=Y),K!=null&&(V.namespace=K),ee!=null&&(V.resolveDir=ee),G!=null&&(V.kind=G),I!=null&&(V.pluginData=d.store(I)),$(R,V,(ce,re)=>{ce!==null?Z(new Error(ce)):q({errors:ge(re.errors,d),warnings:ge(re.warnings,d),path:re.path,external:re.external,sideEffects:re.sideEffects,namespace:re.namespace,suffix:re.suffix,pluginData:d.load(re.pluginData)})})})},onStart(g){let B='This error came from the "onStart" callback registered here:',M=Ne(new Error(B),e,"onStart");C.push({name:v,callback:g,note:M})},onEnd(g){let B='This error came from the "onEnd" callback registered here:',M=Ne(new Error(B),e,"onEnd");D.push({name:v,callback:g,note:M})},onResolve(g,B){let M='This error came from the "onResolve" callback registered here:',X=Ne(new Error(M),e,"onResolve"),Y={},K=n(g,Y,"filter",Be),ee=n(g,Y,"namespace",p);if(Q(g,Y,`in onResolve() call for plugin ${JSON.stringify(v)}`),K==null)throw new Error("onResolve() call is missing a filter");let G=_++;P[G]={name:v,callback:B,note:X},k.onResolve.push({id:G,filter:K.source,namespace:ee||""})},onLoad(g,B){let M='This error came from the "onLoad" callback registered here:',X=Ne(new Error(M),e,"onLoad"),Y={},K=n(g,Y,"filter",Be),ee=n(g,Y,"namespace",p);if(Q(g,Y,`in onLoad() call for plugin ${JSON.stringify(v)}`),K==null)throw new Error("onLoad() call is missing a filter");let G=_++;F[G]={name:v,callback:B,note:X},k.onLoad.push({id:G,filter:K.source,namespace:ee||""})},esbuild:e.esbuild});x&&await x,T.push(k)}catch(f){return{ok:!1,error:f,pluginName:v}}}const j=async A=>{switch(A.command){case"on-start":{let b={errors:[],warnings:[]};return await Promise.all(C.map(async({name:v,callback:f,note:k})=>{try{let W=await f();if(W!=null){if(typeof W!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(v)} to return an object`);let x={},g=n(W,x,"errors",H),B=n(W,x,"warnings",H);Q(W,x,`from onStart() callback in plugin ${JSON.stringify(v)}`),g!=null&&b.errors.push(...be(g,"errors",d,v)),B!=null&&b.warnings.push(...be(B,"warnings",d,v))}}catch(W){b.errors.push($e(W,e,d,k&&k(),v))}})),b}case"on-resolve":{let b={},v="",f,k;for(let W of A.ids)try{({name:v,callback:f,note:k}=P[W]);let x=await f({path:A.path,importer:A.importer,namespace:A.namespace,resolveDir:A.resolveDir,kind:A.kind,pluginData:d.load(A.pluginData)});if(x!=null){if(typeof x!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(v)} to return an object`);let g={},B=n(x,g,"pluginName",p),M=n(x,g,"path",p),X=n(x,g,"namespace",p),Y=n(x,g,"suffix",p),K=n(x,g,"external",z),ee=n(x,g,"sideEffects",z),G=n(x,g,"pluginData",Le),I=n(x,g,"errors",H),q=n(x,g,"warnings",H),Z=n(x,g,"watchFiles",H),V=n(x,g,"watchDirs",H);Q(x,g,`from onResolve() callback in plugin ${JSON.stringify(v)}`),b.id=W,B!=null&&(b.pluginName=B),M!=null&&(b.path=M),X!=null&&(b.namespace=X),Y!=null&&(b.suffix=Y),K!=null&&(b.external=K),ee!=null&&(b.sideEffects=ee),G!=null&&(b.pluginData=d.store(G)),I!=null&&(b.errors=be(I,"errors",d,v)),q!=null&&(b.warnings=be(q,"warnings",d,v)),Z!=null&&(b.watchFiles=Ce(Z,"watchFiles")),V!=null&&(b.watchDirs=Ce(V,"watchDirs"));break}}catch(x){return{id:W,errors:[$e(x,e,d,k&&k(),v)]}}return b}case"on-load":{let b={},v="",f,k;for(let W of A.ids)try{({name:v,callback:f,note:k}=F[W]);let x=await f({path:A.path,namespace:A.namespace,suffix:A.suffix,pluginData:d.load(A.pluginData)});if(x!=null){if(typeof x!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(v)} to return an object`);let g={},B=n(x,g,"pluginName",p),M=n(x,g,"contents",Ir),X=n(x,g,"resolveDir",p),Y=n(x,g,"pluginData",Le),K=n(x,g,"loader",p),ee=n(x,g,"errors",H),G=n(x,g,"warnings",H),I=n(x,g,"watchFiles",H),q=n(x,g,"watchDirs",H);Q(x,g,`from onLoad() callback in plugin ${JSON.stringify(v)}`),b.id=W,B!=null&&(b.pluginName=B),M instanceof Uint8Array?b.contents=M:M!=null&&(b.contents=ke(M)),X!=null&&(b.resolveDir=X),Y!=null&&(b.pluginData=d.store(Y)),K!=null&&(b.loader=K),ee!=null&&(b.errors=be(ee,"errors",d,v)),G!=null&&(b.warnings=be(G,"warnings",d,v)),I!=null&&(b.watchFiles=Ce(I,"watchFiles")),q!=null&&(b.watchDirs=Ce(q,"watchDirs"));break}}catch(x){return{id:W,errors:[$e(x,e,d,k&&k(),v)]}}return b}default:throw new Error("Invalid command: "+A.command)}};let U=(A,b,v)=>v();D.length>0&&(U=(A,b,v)=>{(async()=>{for(const{name:f,callback:k,note:W}of D)try{await k(A)}catch(x){A.errors.push(await new Promise(g=>b(x,f,W&&W(),g)))}})().then(v)}),L=!0;let ne=0;return{ok:!0,requestPlugins:T,runOnEndCallbacks:U,pluginRefs:{ref(){++ne===1&&t.set(u,j)},unref(){--ne===0&&t.delete(u)}}}},ie=(h,c,u,d)=>{let R={},C=n(c,R,"port",je),D=n(c,R,"host",p),P=n(c,R,"servedir",p),F=n(c,R,"onRequest",He),_,S=new Promise((T,L)=>{_=j=>{a.delete(d),j!==null?L(new Error(j)):T()}});return u.serve={},Q(c,R,"in serve() call"),C!==void 0&&(u.serve.port=C),D!==void 0&&(u.serve.host=D),P!==void 0&&(u.serve.servedir=P),a.set(d,{onRequest:F,onWait:_}),{wait:S,stop(){$(h,{command:"serve-stop",key:d},()=>{})}}};const fe="warning",he="silent";let pe=h=>{let c=y++;const u=lr();let d,{refs:R,options:C,isTTY:D,callback:P}=h;if(typeof C=="object"){let S=C.plugins;if(S!==void 0){if(!Array.isArray(S))throw new Error('"plugins" must be an array');d=S}}let F=(S,T,L,j)=>{let U=[];try{Re(U,C,{},D,fe)}catch{}const ne=$e(S,e,u,L,T);$(R,{command:"error",flags:U,error:ne},()=>{ne.detail=u.load(ne.detail),j(ne)})},_=(S,T)=>{F(S,T,void 0,L=>{P(Oe("Build failed",[L],[]),null)})};if(d&&d.length>0){if(e.isSync)return _(new Error("Cannot use plugins in synchronous API calls"),"");ue(C,d,c,u,R).then(S=>{if(!S.ok)_(S.error,S.pluginName);else try{me(Ze(Ge({},h),{key:c,details:u,logPluginError:F,requestPlugins:S.requestPlugins,runOnEndCallbacks:S.runOnEndCallbacks,pluginRefs:S.pluginRefs}))}catch(T){_(T,"")}},S=>_(S,""))}else try{me(Ze(Ge({},h),{key:c,details:u,logPluginError:F,requestPlugins:null,runOnEndCallbacks:(S,T,L)=>L(),pluginRefs:null}))}catch(S){_(S,"")}},me=({callName:h,refs:c,serveOptions:u,options:d,isTTY:R,defaultWD:C,callback:D,key:P,details:F,logPluginError:_,requestPlugins:S,runOnEndCallbacks:T,pluginRefs:L})=>{const j={ref(){L&&L.ref(),c&&c.ref()},unref(){L&&L.unref(),c&&c.unref()}};let U=!e.isBrowser,{entries:ne,flags:A,write:b,stdinContents:v,stdinResolveDir:f,absWorkingDir:k,incremental:W,nodePaths:x,watch:g,mangleCache:B}=Ur(h,d,R,fe,U),M={command:"build",key:P,entries:ne,flags:A,write:b,stdinContents:v,stdinResolveDir:f,absWorkingDir:k||C,incremental:W,nodePaths:x};S&&(M.plugins=S),B&&(M.mangleCache=B);let X=u&&ie(j,u,M,P),Y,K,ee=(I,q)=>{I.outputFiles&&(q.outputFiles=I.outputFiles.map(Jr)),I.metafile&&(q.metafile=JSON.parse(I.metafile)),I.mangleCache&&(q.mangleCache=I.mangleCache),I.writeToStdout!==void 0&&console.log(De(I.writeToStdout).replace(/\n$/,""))},G=(I,q)=>{let Z={errors:ge(I.errors,F),warnings:ge(I.warnings,F)};ee(I,Z),T(Z,_,()=>{if(Z.errors.length>0)return q(Oe("Build failed",Z.errors,Z.warnings),null);if(I.rebuild){if(!Y){let V=!1;Y=()=>new Promise((ce,re)=>{if(V||o)throw new Error("Cannot rebuild");$(j,{command:"rebuild",key:P},(se,xr)=>{if(se)return q(Oe("Build failed",[{pluginName:"",text:se,location:null,notes:[],detail:void 0}],[]),null);G(xr,(Ve,kr)=>{Ve?re(Ve):ce(kr)})})}),j.ref(),Y.dispose=()=>{V||(V=!0,$(j,{command:"rebuild-dispose",key:P},()=>{}),j.unref())}}Z.rebuild=Y}if(I.watch){if(!K){let V=!1;j.ref(),K=()=>{V||(V=!0,l.delete(P),$(j,{command:"watch-stop",key:P},()=>{}),j.unref())},g&&l.set(P,(ce,re)=>{if(ce){g.onRebuild&&g.onRebuild(ce,null);return}let se={errors:ge(re.errors,F),warnings:ge(re.warnings,F)};ee(re,se),T(se,_,()=>{if(se.errors.length>0){g.onRebuild&&g.onRebuild(Oe("Build failed",se.errors,se.warnings),null);return}re.rebuildID!==void 0&&(se.rebuild=Y),se.stop=K,g.onRebuild&&g.onRebuild(null,se)})})}Z.stop=K}q(null,Z)})};if(b&&e.isBrowser)throw new Error('Cannot enable "write" in the browser');if(W&&e.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(g&&e.isSync)throw new Error('Cannot use "watch" with a synchronous build');$(j,M,(I,q)=>{if(I)return D(new Error(I),null);if(X){let Z=q,V=!1;j.ref();let ce={port:Z.port,host:Z.host,wait:X.wait,stop(){V||(V=!0,X.stop(),j.unref())}};return j.ref(),X.wait.then(j.unref,j.unref),D(null,ce)}return G(q,D)})};return{readFromStdout:w,afterClose:E,service:{buildOrServe:pe,transform:({callName:h,refs:c,input:u,options:d,isTTY:R,fs:C,callback:D})=>{const P=lr();let F=_=>{try{if(typeof u!="string")throw new Error('The input to "transform" must be a string');let{flags:S,mangleCache:T}=zr(h,d,R,he),L={command:"transform",flags:S,inputFS:_!==null,input:_!==null?_:u};T&&(L.mangleCache=T),$(c,L,(j,U)=>{if(j)return D(new Error(j),null);let ne=ge(U.errors,P),A=ge(U.warnings,P),b=1,v=()=>{if(--b===0){let f={warnings:A,code:U.code,map:U.map};U.mangleCache&&(f.mangleCache=U?.mangleCache),D(null,f)}};if(ne.length>0)return D(Oe("Transform failed",ne,A),null);U.codeFS&&(b++,C.readFile(U.code,(f,k)=>{f!==null?D(f,null):(U.code=k,v())})),U.mapFS&&(b++,C.readFile(U.map,(f,k)=>{f!==null?D(f,null):(U.map=k,v())})),v()})}catch(S){let T=[];try{Re(T,d,{},R,he)}catch{}const L=$e(S,e,P,void 0,"");$(c,{command:"error",flags:T,error:L},()=>{L.detail=P.load(L.detail),D(Oe("Transform failed",[L],[]),null)})}};if(typeof u=="string"&&u.length>1024*1024){let _=F;F=()=>C.writeFile(u,_)}F(null)},formatMessages:({callName:h,refs:c,messages:u,options:d,callback:R})=>{let C=be(u,"messages",null,"");if(!d)throw new Error(`Missing second argument in ${h}() call`);let D={},P=n(d,D,"kind",p),F=n(d,D,"color",z),_=n(d,D,"terminalWidth",je);if(Q(d,D,`in ${h}() call`),P===void 0)throw new Error(`Missing "kind" in ${h}() call`);if(P!=="error"&&P!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${h}() call`);let S={command:"format-msgs",messages:C,isWarning:P==="warning"};F!==void 0&&(S.color=F),_!==void 0&&(S.terminalWidth=_),$(c,S,(T,L)=>{if(T)return R(new Error(T),null);R(null,L.messages)})},analyzeMetafile:({callName:h,refs:c,metafile:u,options:d,callback:R})=>{d===void 0&&(d={});let C={},D=n(d,C,"color",z),P=n(d,C,"verbose",z);Q(d,C,`in ${h}() call`);let F={command:"analyze-metafile",metafile:u};D!==void 0&&(F.color=D),P!==void 0&&(F.verbose=P),$(c,F,(_,S)=>{if(_)return R(new Error(_),null);R(null,S.result)})}}}}function lr(){const e=new Map;let r=0;return{load(t){return e.get(t)},store(t){if(t===void 0)return-1;const l=r++;return e.set(l,t),l}}}function Ne(e,r,t){let l,a=!1;return()=>{if(a)return l;a=!0;try{let o=(e.stack+"").split(`
`);o.splice(1,1);let i=pr(r,o,t);if(i)return l={text:e.message,location:i},l}catch{}}}function $e(e,r,t,l,a){let o="Internal error",i=null;try{o=(e&&e.message||e)+""}catch{}try{i=pr(r,(e.stack+"").split(`
`),"")}catch{}return{pluginName:a,text:o,location:i,notes:l?[l]:[],detail:t?t.store(e):-1}}function pr(e,r,t){let l="    at ";if(e.readFileSync&&!r[0].startsWith(l)&&r[1].startsWith(l))for(let a=1;a<r.length;a++){let o=r[a];if(!!o.startsWith(l))for(o=o.slice(l.length);;){let i=/^(?:new |async )?\S+ \((.*)\)$/.exec(o);if(i){o=i[1];continue}if(i=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(o),i){o=i[1];continue}if(i=/^(\S+):(\d+):(\d+)$/.exec(o),i){let y;try{y=e.readFileSync(i[1],"utf8")}catch{break}let s=y.split(/\r\n|\r|\n|\u2028|\u2029/)[+i[2]-1]||"",m=+i[3]-1,w=s.slice(m,m+t.length)===t?t.length:0;return{file:i[1],namespace:"file",line:+i[2],column:ke(s.slice(0,m)).length,length:ke(s.slice(m,m+w)).length,lineText:s+`
`+r.slice(1).join(`
`),suggestion:""}}break}}return null}function Oe(e,r,t){let l=5,a=r.length<1?"":` with ${r.length} error${r.length<2?"":"s"}:`+r.slice(0,l+1).map((i,y)=>{if(y===l)return`
...`;if(!i.location)return`
error: ${i.text}`;let{file:s,line:m,column:w}=i.location,E=i.pluginName?`[plugin: ${i.pluginName}] `:"";return`
${s}:${m}:${w}: ERROR: ${E}${i.text}`}).join(""),o=new Error(`${e}${a}`);return o.errors=r,o.warnings=t,o}function ge(e,r){for(const t of e)t.detail=r.load(t.detail);return e}function ir(e,r){if(e==null)return null;let t={},l=n(e,t,"file",p),a=n(e,t,"namespace",p),o=n(e,t,"line",je),i=n(e,t,"column",je),y=n(e,t,"length",je),s=n(e,t,"lineText",p),m=n(e,t,"suggestion",p);return Q(e,t,r),{file:l||"",namespace:a||"",line:o||0,column:i||0,length:y||0,lineText:s||"",suggestion:m||""}}function be(e,r,t,l){let a=[],o=0;for(const i of e){let y={},s=n(i,y,"pluginName",p),m=n(i,y,"text",p),w=n(i,y,"location",nr),E=n(i,y,"notes",H),$=n(i,y,"detail",Le),O=`in element ${o} of "${r}"`;Q(i,y,O);let N=[];if(E)for(const J of E){let le={},ue=n(J,le,"text",p),ie=n(J,le,"location",nr);Q(J,le,O),N.push({text:ue||"",location:ir(ie,O)})}a.push({pluginName:s||l,text:m||"",location:ir(w,O),notes:N,detail:t?t.store($):-1}),o++}return a}function Ce(e,r){const t=[];for(const l of e){if(typeof l!="string")throw new Error(`${JSON.stringify(r)} must be an array of strings`);t.push(l)}return t}function Jr({path:e,contents:r}){let t=null;return{path:e,contents:r,get text(){return t===null&&(t=De(r)),t}}}var Pe=de,ar=de,ae=de,Ie={}.ESBUILD_BINARY_PATH||Ie,We={"win32 arm64 LE":"esbuild-windows-arm64","win32 ia32 LE":"esbuild-windows-32","win32 x64 LE":"esbuild-windows-64"},Ue={"android arm64 LE":"esbuild-android-arm64","darwin arm64 LE":"esbuild-darwin-arm64","darwin x64 LE":"esbuild-darwin-64","freebsd arm64 LE":"esbuild-freebsd-arm64","freebsd x64 LE":"esbuild-freebsd-64","linux arm LE":"esbuild-linux-arm","linux arm64 LE":"esbuild-linux-arm64","linux ia32 LE":"esbuild-linux-32","linux mips64el LE":"esbuild-linux-mips64le","linux ppc64 LE":"esbuild-linux-ppc64le","linux riscv64 LE":"esbuild-linux-riscv64","linux s390x BE":"esbuild-linux-s390x","linux x64 LE":"esbuild-linux-64","netbsd x64 LE":"esbuild-netbsd-64","openbsd x64 LE":"esbuild-openbsd-64","sunos x64 LE":"esbuild-sunos-64"},or={"android x64 LE":"esbuild-android-64"};function Yr(){let e,r,t=!1,l=`${process.platform} ${ar.arch()} ${ar.endianness()}`;if(l in We)e=We[l],r="esbuild.exe";else if(l in Ue)e=Ue[l],r="bin/esbuild";else if(l in or)e=or[l],r="bin/esbuild",t=!0;else throw new Error(`Unsupported platform: ${l}`);return{pkg:e,subpath:r,isWASM:t}}function Vr(){const e=require.resolve("esbuild"),r=ae.dirname(ae.dirname(ae.dirname(e)));if(ae.basename(r)==="node_modules"){for(const t in Ue)try{const l=Ue[t];if(Pe.existsSync(ae.join(r,l)))return l}catch{}for(const t in We)try{const l=We[t];if(Pe.existsSync(ae.join(r,l)))return l}catch{}}return null}function Kr(e,r){const t=ae.dirname(require.resolve("esbuild"));return ae.join(t,`downloaded-${e}-${ae.basename(r)}`)}function Hr(){if(Ie)return{binPath:Ie,isWASM:!1};const{pkg:e,subpath:r,isWASM:t}=Yr();let l;try{l=require.resolve(`${e}/${r}`)}catch(o){if(l=Kr(e,r),!Pe.existsSync(l)){try{require.resolve(e)}catch{const i=Vr();throw i?new Error(`
You installed esbuild on another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.

Specifically the "${i}" package is present but this platform
needs the "${e}" package instead. People often get into this
situation by installing esbuild on Windows or macOS and copying "node_modules"
into a Docker image that runs Linux, or by copying "node_modules" between
Windows and WSL environments.

If you are installing with npm, you can try not copying the "node_modules"
directory when you copy the files over, and running "npm ci" or "npm install"
on the destination platform after the copy. Or you could consider using yarn
instead which has built-in support for installing a package on multiple
platforms simultaneously.

If you are installing with yarn, you can try listing both this platform and the
other platform in your ".yarnrc.yml" file using the "supportedArchitectures"
feature: https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.

Another alternative is to use the "esbuild-wasm" package instead, which works
the same way on all platforms. But it comes with a heavy performance cost and
can sometimes be 10x slower than the "esbuild" package, so you may also not
want to do that.
`):new Error(`The package "${e}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" flag. The "optionalDependencies" package.json feature is used
by esbuild to install the correct binary executable for your current platform.`)}throw o}}let a=!1;try{require("pnpapi"),a=!0}catch{}if(a){const o=ae.dirname(require.resolve("esbuild")),i=ae.join(o,`pnpapi-${e}-${ae.basename(r)}`);return Pe.existsSync(i)||(Pe.copyFileSync(l,i),Pe.chmodSync(i,493)),{binPath:i,isWASM:t}}return{binPath:l,isWASM:t}}var yr=de,qr=de,qe=de,ve=de,Qr=de,Xr=de,te;if({}.ESBUILD_WORKER_THREADS!=="0"){try{te=require("worker_threads")}catch{}let[e,r]=process.versions.node.split(".");(+e<12||+e==12&&+r<17||+e==13&&+r<13)&&(te=void 0)}var sr,Me=((sr=te?.workerData)==null?void 0:sr.esbuildVersion)==="0.14.30",br=()=>{if((!Ie||!1)&&(qe.basename(__filename)!=="main.js"||qe.basename(__dirname)!=="lib"))throw new Error(`The esbuild JavaScript API cannot be bundled. Please mark the "esbuild" package as external so it's not included in the bundle.

More information: The file containing the code for esbuild's JavaScript API (${__filename}) does not appear to be inside the esbuild package on the file system, which usually means that the esbuild package was bundled into another file. This is problematic because the API needs to run a binary executable inside the esbuild package which is located using a relative path from the API code to the executable. If the esbuild package is bundled, the relative path will be incorrect and the executable won't be found.`);const{binPath:e,isWASM:r}=Hr();return r?["node",[e]]:[e,[]]},Ae=()=>Xr.isatty(2),Gr={readFile(e,r){try{let t=ve.readFileSync(e,"utf8");try{ve.unlinkSync(e)}catch{}r(null,t)}catch(t){r(t,null)}},writeFile(e,r){try{let t=vr();ve.writeFileSync(t,e),r(t)}catch{r(null)}}},Zr={readFile(e,r){try{ve.readFile(e,"utf8",(t,l)=>{try{ve.unlink(e,()=>r(t,l))}catch{r(t,l)}})}catch(t){r(t,null)}},writeFile(e,r){try{let t=vr();ve.writeFile(t,e,l=>r(l!==null?null:t))}catch{r(null)}}},et="0.14.30",rt=e=>Se().build(e),tt=(e,r)=>Se().serve(e,r),nt=(e,r)=>Se().transform(e,r),lt=(e,r)=>Se().formatMessages(e,r),it=(e,r)=>Se().analyzeMetafile(e,r),at=e=>{if(te&&!Me)return oe||(oe=Ye(te)),oe.buildSync(e);let r;return Je(t=>t.buildOrServe({callName:"buildSync",refs:null,serveOptions:null,options:e,isTTY:Ae(),defaultWD:xe,callback:(l,a)=>{if(l)throw l;r=a}})),r},ot=(e,r)=>{if(te&&!Me)return oe||(oe=Ye(te)),oe.transformSync(e,r);let t;return Je(l=>l.transform({callName:"transformSync",refs:null,input:e,options:r||{},isTTY:Ae(),fs:Gr,callback:(a,o)=>{if(a)throw a;t=o}})),t},st=(e,r)=>{if(te&&!Me)return oe||(oe=Ye(te)),oe.formatMessagesSync(e,r);let t;return Je(l=>l.formatMessages({callName:"formatMessagesSync",refs:null,messages:e,options:r,callback:(a,o)=>{if(a)throw a;t=o}})),t},ut=(e,r)=>{if(te&&!Me)return oe||(oe=Ye(te)),oe.analyzeMetafileSync(e,r);let t;return Je(l=>l.analyzeMetafile({callName:"analyzeMetafileSync",refs:null,metafile:typeof e=="string"?e:JSON.stringify(e),options:r,callback:(a,o)=>{if(a)throw a;t=o}})),t},ur=!1,ft=e=>{if(e=Wr(e||{}),e.wasmURL)throw new Error('The "wasmURL" option only works in the browser');if(e.worker)throw new Error('The "worker" option only works in the browser');if(ur)throw new Error('Cannot call "initialize" more than once');return Se(),ur=!0,Promise.resolve()},xe=process.cwd(),Fe,Se=()=>{if(Fe)return Fe;let[e,r]=br(),t=yr.spawn(e,r.concat("--service=0.14.30","--ping"),{windowsHide:!0,stdio:["pipe","pipe","inherit"],cwd:xe}),{readFromStdout:l,afterClose:a,service:o}=wr({writeToStdin(w){t.stdin.write(w,E=>{E&&a(E)})},readFileSync:ve.readFileSync,isSync:!1,isBrowser:!1,esbuild:Te});t.stdin.on("error",a),t.on("error",a);const i=t.stdin,y=t.stdout;y.on("data",l),y.on("end",a);let s=0;t.unref(),i.unref&&i.unref(),y.unref&&y.unref();const m={ref(){++s===1&&t.ref()},unref(){--s===0&&t.unref()}};return Fe={build:w=>new Promise((E,$)=>{o.buildOrServe({callName:"build",refs:m,serveOptions:null,options:w,isTTY:Ae(),defaultWD:xe,callback:(O,N)=>O?$(O):E(N)})}),serve:(w,E)=>{if(w===null||typeof w!="object")throw new Error("The first argument must be an object");return new Promise(($,O)=>o.buildOrServe({callName:"serve",refs:m,serveOptions:w,options:E,isTTY:Ae(),defaultWD:xe,callback:(N,J)=>N?O(N):$(J)}))},transform:(w,E)=>new Promise(($,O)=>o.transform({callName:"transform",refs:m,input:w,options:E||{},isTTY:Ae(),fs:Zr,callback:(N,J)=>N?O(N):$(J)})),formatMessages:(w,E)=>new Promise(($,O)=>o.formatMessages({callName:"formatMessages",refs:m,messages:w,options:E,callback:(N,J)=>N?O(N):$(J)})),analyzeMetafile:(w,E)=>new Promise(($,O)=>o.analyzeMetafile({callName:"analyzeMetafile",refs:m,metafile:typeof w=="string"?w:JSON.stringify(w),options:E,callback:(N,J)=>N?O(N):$(J)}))},Fe},Je=e=>{let[r,t]=br(),l=new Uint8Array,{readFromStdout:a,afterClose:o,service:i}=wr({writeToStdin(s){if(l.length!==0)throw new Error("Must run at most one command");l=s},isSync:!0,isBrowser:!1,esbuild:Te});e(i);let y=yr.execFileSync(r,t.concat("--service=0.14.30"),{cwd:xe,windowsHide:!0,input:l,maxBuffer:+{}.ESBUILD_MAX_BUFFER||16*1024*1024});a(y),o(null)},vr=()=>qe.join(Qr.tmpdir(),`esbuild-${qr.randomBytes(32).toString("hex")}`),oe=null,Ye=e=>{let{port1:r,port2:t}=new e.MessageChannel,l=new e.Worker(__filename,{workerData:{workerPort:t,defaultWD:xe,esbuildVersion:"0.14.30"},transferList:[t],execArgv:[]}),a=0,o=m=>{let w=new Error(`Build failed with 1 error:
error: ${m}`),E=[{pluginName:"",text:m,location:null,notes:[],detail:void 0}];return w.errors=E,w.warnings=[],w},i=m=>{if(!m)return;let w=m.plugins,E=m.incremental,$=m.watch;if(w&&w.length>0)throw o("Cannot use plugins in synchronous API calls");if(E)throw o('Cannot use "incremental" with a synchronous build');if($)throw o('Cannot use "watch" with a synchronous build')},y=(m,w)=>{for(let E in w)m[E]=w[E]},s=(m,w)=>{let E=a++,$=new SharedArrayBuffer(8),O=new Int32Array($),N={sharedBuffer:$,id:E,command:m,args:w};l.postMessage(N);let J=Atomics.wait(O,0,0);if(J!=="ok"&&J!=="not-equal")throw new Error("Internal error: Atomics.wait() failed: "+J);let{message:{id:le,resolve:ue,reject:ie,properties:fe}}=e.receiveMessageOnPort(r);if(E!==le)throw new Error(`Internal error: Expected id ${E} but got id ${le}`);if(ie)throw y(ie,fe),ie;return ue};return l.unref(),{buildSync(m){return i(m),s("build",[m])},transformSync(m,w){return s("transform",[m,w])},formatMessagesSync(m,w){return s("formatMessages",[m,w])},analyzeMetafileSync(m,w){return s("analyzeMetafile",[m,w])}}},ct=()=>{let e=te.workerData.workerPort,r=te.parentPort,t=Se();xe=te.workerData.defaultWD;let l=a=>{let o={};if(a&&typeof a=="object")for(let i in a)o[i]=a[i];return o};r.on("message",a=>{(async()=>{let{sharedBuffer:o,id:i,command:y,args:s}=a,m=new Int32Array(o);try{switch(y){case"build":e.postMessage({id:i,resolve:await t.build(s[0])});break;case"transform":e.postMessage({id:i,resolve:await t.transform(s[0],s[1])});break;case"formatMessages":e.postMessage({id:i,resolve:await t.formatMessages(s[0],s[1])});break;case"analyzeMetafile":e.postMessage({id:i,resolve:await t.analyzeMetafile(s[0],s[1])});break;default:throw new Error(`Invalid command: ${y}`)}}catch(w){e.postMessage({id:i,reject:w,properties:l(w)})}Atomics.add(m,0,1),Atomics.notify(m,0,1/0)})()})};Me&&ct();var dt=Te,mt=Er({__proto__:null,default:er},[er]);export{mt as m};