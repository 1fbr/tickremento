import{getProducts as e,getSearchResults as a,getSearchResultsBySupermarket as r,getSupermarketProducts as t}from"./services/products.js";import{maxPages as n,supermarketPages as l}from"./utils/supermarket-pages.js";import{removeChilds as s,debounce as c,isModalDisplayed as u}from"./utils/event-utils.js";let mainContainer=document.querySelector(".main-container"),search=document.querySelector(".product-filter"),cleanSearch=document.querySelector(".clean-search"),checkboxesWrapper=document.querySelector(".checkboxes-wrapper"),supermarkets=document.querySelectorAll("input[type='checkbox']"),spinner=document.querySelector(".spinner"),actualPage=1,searchTerm="",supermarketName="";document.addEventListener("DOMContentLoaded",()=>{e(actualPage)}),search.addEventListener("input",c(t=>{spinner.style.display="block",s(mainContainer),searchTerm=t.target.value.toLowerCase(),t.target.value.length>=2&&(cleanSearch.disabled=!1,spinner.style.display="none",""!==supermarketName?r(supermarketName,searchTerm):a(searchTerm)),0===t.target.value.length&&(cleanSearch.disabled=!0,e(actualPage=1))},250)),cleanSearch.addEventListener("click",()=>{spinner.style.display="block",s(mainContainer),cleanSearch.disabled=!0,search.value="",actualPage=1});let handleSupermarketChange=a=>{if(spinner.style.display="block",!u()){a.preventDefault(),s(mainContainer),search.value="",actualPage=1;for(let r=0;r<supermarkets.length;r++){if(supermarkets[r].checked){supermarketName=supermarkets[r].id;break}supermarketName=""}supermarketName?t(supermarketName,actualPage):e(actualPage)}};checkboxesWrapper.addEventListener("change",function(e){let a=e.target;if("checkbox"===a.type){let r=supermarkets;for(let t=0;t<r.length;t++)r[t]!==a&&(r[t].checked=!1);handleSupermarketChange(e)}});let debouncePagination=c(e=>{let{scrollHeight:a,scrollTop:r}=e.target.documentElement;0===search.value.length&&r+window.innerHeight>=a&&setTimeout(newPage,150)},200);window.addEventListener("scroll",debouncePagination);let newPage=()=>{if(u())return;actualPage++;let a=""!==supermarketName?l[supermarketName]:n;if(actualPage>a){spinner.style.display="none";return}""!==supermarketName?t(supermarketName,actualPage):e(actualPage)};