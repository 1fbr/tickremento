import{renderProducts as e,renderSearchResults as t,renderSupermarketProducts as r}from"../components/render-products.js";import{renderErrors as o}from"../handlers/error-handler.js";let API_URL="https://tickremento-api.up.railway.app/api",handleResponse=e=>e.ok?e.json():Promise.reject(e),getData=async(e,t)=>{try{let r=await fetch(e),a=await handleResponse(r);t(a)}catch(s){o(s)}};export const getProducts=t=>{let r=`${API_URL}/products?page=${t}&limit=60&sort=name&order=1`;getData(r,e)};export const getSearchResults=e=>{let r=`${API_URL}/products/search/?input=${e}&sort=name&order=1`;getData(r,t)};export const getSupermarketProducts=(e,t)=>{let o=`${API_URL}/supermarkets?supermarket=${e}&page=${t}&limit=60&sort=name&order=1`;getData(o,r)};