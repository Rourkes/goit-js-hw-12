import{a as L,s as b,i as u}from"./assets/vendor-7eea9cc0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const E="44984480-6400f6ac5e39d78263c6545e0",q="https://pixabay.com/api/";async function y(r,e){try{return(await L.get(q,{params:{key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}catch(o){throw console.error("Error fetching images:",o),o}}function S(r){return r.map(({webformatURL:e,largeImageURL:o,tags:c,likes:t,views:s,comments:n,downloads:w})=>`
        <li class="gallery-list">
          <a class="gallery-large" href="${o}">
            <img class="gallery-web" src="${e}" alt="${c}" width="360" height="152" />
            <ul class="comments-strage">
              <li class="comments-strage-list">
                <span class="windows">Likes </span>${t}
              </li>
              <li class="comments-strage-list">
                <span class="windows">Views </span>${s}
              </li>
              <li class="comments-strage-list">
                <span class="windows">Comments </span>${n}
              </li>
              <li class="comments-strage-list">
                <span class="windows">Downloads </span>${w}
              </li>
            </ul>
          </a>
        </li>
      `).join("")}function p(r){const e=document.querySelector(".gallery"),o=S(r);e.insertAdjacentHTML("beforeend",o)}function m(){const r=document.querySelector(".gallery");r.innerHTML=""}const g=document.querySelector(".search-form");document.querySelector(".gallery");const i=document.querySelector(".loader"),a=document.createElement("button");a.classList.add("load-more","is-hidden");a.textContent="Load more";document.body.appendChild(a);let d="",l=1,h=0;const f=new b(".gallery a",{captionsData:"alt",captionDelay:250});g.addEventListener("submit",v);a.addEventListener("click",$);async function v(r){if(r.preventDefault(),d=r.target.elements.search.value.trim(),l=1,d==="")return m(),u.error({title:"Error",message:"Search value is empty",position:"topRight"});m(),a.classList.add("is-hidden"),i.style.display="block";try{const e=await y(d,l);if(i.style.display="none",h=e.totalHits,e.hits.length===0)throw new Error("No images found");p(e.hits),f.refresh(),e.totalHits>15&&a.classList.remove("is-hidden"),g.reset()}catch(e){i.style.display="none",u.error({title:"Error",message:`Sorry, there are no images matching your search query. Please try again! Error: ${e.message}`,position:"topRight",backgroundColor:"#EF4040"})}}async function $(){l+=1,i.style.display="block";try{const r=await y(d,l);i.style.display="none",p(r.hits),f.refresh(),(r.hits.length<15||l*15>=h)&&(a.classList.add("is-hidden"),u.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#A9F5F5"}));const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(r){i.style.display="none",u.error({title:"Error",message:`Error: ${r.message}`,position:"topRight"})}}
//# sourceMappingURL=commonHelpers.js.map
