import{renderProducts as e,renderSearchResults as t,renderSupermarketProducts as r}from"../components/render-products.js";import{renderErrors as a}from"../handlers/error-handler.js";let API_URL="https://tickremento-api.up.railway.app/api",handleResponse=e=>e.ok?e.json():Promise.reject(e),getData=async(e,t)=>{try{let r=await fetch(e),o=await handleResponse(r);t(o)}catch(s){a(s)}};export const getProducts=t=>{let r=`${API_URL}/?page=${t}&limit=60&sort=name&order=1`;getData(r,e)};export const getSearchResults=e=>{let r=`${API_URL}/search/?input=${e}&sort=name&order=1`;getData(r,t)};export const getSearchResultsBySupermarket=(e,r)=>{let a=`${API_URL}/search/${e}?input=${r}&sort=name&order=1`;getData(a,t)};export const getSupermarketProducts=(e,t)=>{let a=`${API_URL}/supermarkets/?supermarket=${e}&page=${t}&limit=60&sort=name&order=1`;getData(a,r)};