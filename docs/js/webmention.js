(()=>{(function(){"use strict";window.i18next=window.i18next||{t:function(o){return o}};let a=window.i18next.t.bind(window.i18next);function c(t,o){return document.currentScript.getAttribute("data-"+t)||o}let y=c("page-url",window.location.href.replace(/#.*$/,"")),h=c("add-urls",void 0),v=c("id","webmentions"),f=c("wordcount"),E=c("max-webmentions",30),w=c("prevent-spoofing")?"wm-source":"url",j=c("sort-by","published"),R=c("sort-dir","up"),C=c("comments-are-reactions"),I={"in-reply-to":a("replied"),"like-of":a("liked"),"repost-of":a("reposted"),"bookmark-of":a("bookmarked"),"mention-of":a("mentioned"),rsvp:a("RSVPed"),"follow-of":a("followed")},L={"in-reply-to":"\u{1F4AC}","like-of":"\u2764\uFE0F","repost-of":"\u{1F504}","bookmark-of":"\u2B50\uFE0F","mention-of":"\u{1F4AC}",rsvp:"\u{1F4C5}","follow-of":"\u{1F41C}"},$={yes:"\u2705",no:"\u274C",interested:"\u{1F4A1}",maybe:"\u{1F4AD}"};function p(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function g(t,o){let n=p(t.author?.name??t.url.split("/")[2]),e=I[t["wm-property"]]||a("reacted");!o&&t.content&&t.content.text&&(e+=": "+k(t));let s="";t.author&&t.author.photo&&(s=`<img src="${p(t.author.photo)}" loading="lazy" decoding="async" alt="${n}">`);let i="";return t.rsvp&&$[t.rsvp]&&(i=`<sub>${$[t.rsvp]}</sub>`),`<a class="reaction" rel="nofollow ugc" title="${n} ${e}" href="${t[w]}">${s} ${L[t["wm-property"]]||"\u{1F4A5}"} ${i}</a>`}function m(t){return t.substr(t.indexOf("//"))}function b(t){let o=[],n={};return t.forEach(function(e){let s=m(e.url);n[s]||(o.push(e),n[s]=!0)}),o}function k(t){let o=p(t.content.text);if(f){let n=o.replace(/\s+/g," ").split(" ",f+1);n.length>f&&(n[f-1]+="&hellip;",n=n.slice(0,f),o=n.join(" "))}return o}function S(t){let o=`<h2 class="subtitle">${a("Webmention")}</h2>`,n=t.map(e=>{let s=g(e,!0),i=p(e.url.split("/")[2]);e.author&&e.author.name&&(i=p(e.author.name));let d=`<a class="source" rel="nofollow ugc" href="${e[w]}">${i}</a>`,l="name",u=`(${a("mention")})`;e.name?(l="name",u=e.name):e.content&&e.content.text&&(l="text",u=k(e));let r=`<span class="${l}">${u}</span>`;return`<li>${s} ${d} ${r}</li>`}).join("");return`${o} <ul class="comments">${n}</ul>`}function T(t){let o=`<h2>${a("Reactions")}</h2>`,n=t.map(e=>g(e)).join("");return`${o} <ul class="reacts">${n}</ul>`}window.addEventListener("load",async function(){let t=document.getElementById(v);if(!t)return;let o=[m(y)];h&&h.split("|").forEach(function(r){o.push(m(r))});let n=`https://webmention.io/api/mentions.jf2?per-page=${E}&sort-by=${j}&sort-dir=${R}`;o.forEach(function(r){n+=`&target[]=${encodeURIComponent("https:"+r)}`});let e={};try{let r=await window.fetch(n);r.status>=200&&r.status<300?e=await r.json():(console.error("Could not parse response"),new Error(r.statusText))}catch(r){console.error("Request failed",r)}let s=[],i=[];C&&(s=i);let d={"in-reply-to":s,"like-of":i,"repost-of":i,"bookmark-of":i,"follow-of":i,"mention-of":s,rsvp:s};e.children.forEach(function(r){let x=d[r["wm-property"]];x&&x.push(r)});let l="";s.length>0&&s!==i&&(l=S(b(s)));let u="";i.length>0&&(u=T(b(i))),t.innerHTML=`${l}${u}`})})();})();
