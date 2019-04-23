"use strict";const inputEl=document.querySelector("#form-search__input"),buttonEl=document.querySelector(".form-search__button"),containerFavEl=document.querySelector(".series__highlight"),favoriteSeriesEl=document.querySelector(".series__favorites"),listSeriesEl=document.querySelector(".series__search"),apiUrl="http://api.tvmaze.com/search/shows?q=",imageDefault="https://via.placeholder.com/210x295/eeeeee/666666/?text=TV",favoriteArr=[];function queryApi(){const e=inputEl.value;fetch(apiUrl+e).then(e=>e.json()).then(e=>{for(const t of e){const{show:e}=t,a=e.name,r=e.image,i=e.id;paintSeries(a,r?r.medium:imageDefault,i)}}).catch(e=>console.log(`Tienes un error por aquí: ${e}`))}const createElement=e=>document.createElement(e),selectedFavoriteSerie=e=>e.classList.toggle("favorite"),savedLocalStorage=e=>localStorage.setItem("favoriteArr",JSON.stringify(e)),savedFavSeriesArr=JSON.parse(localStorage.getItem("favoriteArr"));function savedArrayFavorites(e,t,a){const r={name:e,image:t,id:a};favoriteArr.push(r),paintFavorites(e,t,a)}function paintFavorites(e,t,a){const r=createElement("li");r.classList.add("favorites"),r.setAttribute("data-id",a);const i=createElement("div");i.classList.add("wrapper__serie-fav");const s=createElement("h4");s.classList.add("favorites__title");const n=document.createTextNode(e);s.appendChild(n);const o=createElement("img");o.classList.add("favorites__image"),o.setAttribute("src",t),o.alt=`Portada serie "${e}"`;const c=createElement("i");c.classList.add("far","fa-trash-alt"),i.appendChild(o),i.appendChild(s),r.appendChild(i),r.appendChild(c),favoriteSeriesEl.appendChild(r),c.addEventListener("click",deleteSerieFav),c.addEventListener("click",function(){deleteObjOfArray(savedFavSeriesArr,a)})}function deleteSerieFav(e){e.currentTarget.parentElement.outerHTML=""}function deleteObjOfArray(e,t){for(let a=0;a<e.length;a++)t===e[a].id&&e.splice(a,1);savedLocalStorage(e)}function paintSeries(e,t,a){const r=createElement("li");r.classList.add("search"),r.setAttribute("data-id",a);const i=createElement("h2");i.classList.add("search__title");const s=document.createTextNode(e);i.appendChild(s);const n=createElement("img");n.setAttribute("src",t),n.alt=`Portada serie "${e}"`,r.appendChild(n),r.appendChild(i),listSeriesEl.appendChild(r),r.addEventListener("click",function(){selectedFavoriteSerie(r)}),r.addEventListener("click",function(){savedArrayFavorites(e,t,a)}),r.addEventListener("click",function(){savedLocalStorage(favoriteArr)})}function reloadPage(){if(savedFavSeriesArr)for(const e of savedFavSeriesArr)paintFavorites(e.name,e.image,e.id)}function handleButtonClick(e){e.preventDefault(),listSeriesEl.innerHTML="",queryApi()}reloadPage(),buttonEl.addEventListener("click",handleButtonClick);