var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(t,e){t.appendChild(e)}function s(t){t.parentNode.removeChild(t)}function i(t){return document.createElement(t)}function a(){return t=" ",document.createTextNode(t);var t}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let l;function d(t){l=t}const p=[],h=[],$=[],g=[],m=Promise.resolve();let b=!1;function y(t){$.push(t)}let _=!1;const x=new Set;function v(){if(!_){_=!0;do{for(let t=0;t<p.length;t+=1){const e=p[t];d(e),k(e.$$)}for(p.length=0;h.length;)h.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];x.has(e)||(x.add(e),e())}$.length=0}while(p.length);for(;g.length;)g.pop()();b=!1,_=!1,x.clear()}}function k(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(y)}}const E=new Set;function w(t,e){-1===t.$$.dirty[0]&&(p.push(t),b||(b=!0,m.then(v)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function j(c,u,i,a,f,p,h=[-1]){const $=l;d(c);const g=u.props||{},m=c.$$={fragment:null,ctx:null,props:p,update:t,not_equal:f,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map($?$.$$.context:[]),callbacks:n(),dirty:h,skip_bound:!1};let b=!1;if(m.ctx=i?i(c,g,(t,e,...n)=>{const o=n.length?n[0]:e;return m.ctx&&f(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),b&&w(c,t)),e}):[],m.update(),b=!0,o(m.before_update),m.fragment=!!a&&a(m.ctx),u.target){if(u.hydrate){const t=function(t){return Array.from(t.childNodes)}(u.target);m.fragment&&m.fragment.l(t),t.forEach(s)}else m.fragment&&m.fragment.c();u.intro&&((_=c.$$.fragment)&&_.i&&(E.delete(_),_.i(x))),function(t,n,c){const{fragment:u,on_mount:s,on_destroy:i,after_update:a}=t.$$;u&&u.m(n,c),y(()=>{const n=s.map(e).filter(r);i?i.push(...n):o(n),t.$$.on_mount=[]}),a.forEach(y)}(c,u.target,u.anchor),v()}var _,x;d($)}function A(e){let n,o,r,c,l,d;return{c(){n=i("main"),o=i("h1"),o.textContent="Doodle Uploader",r=a(),c=i("input"),f(o,"class","svelte-1tky8bj"),f(c,"type","file"),f(c,"accept","image/*"),f(n,"class","svelte-1tky8bj")},m(t,s){var i,a,f,p;!function(t,e,n){t.insertBefore(e,n||null)}(t,n,s),u(n,o),u(n,r),u(n,c),l||(i=c,a="change",f=e[0],i.addEventListener(a,f,p),d=()=>i.removeEventListener(a,f,p),l=!0)},p:t,i:t,o:t,d(t){t&&s(n),l=!1,d()}}}function C(t){return[t=>{console.log(t.target.files)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),j(this,t,C,A,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
