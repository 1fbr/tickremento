import{getPriceColor as e}from"../handlers/price-color-handler.js";import{chartConfig as t}from"../utils/chart.js";let main=document.querySelector(".main-container"),fragment=document.createDocumentFragment(),range=document.createRange();export const createCard=(a,n)=>{let{supermarket:r,url:l,img:d,productId:i,name:c,details:p,prices:o,months:s}=a,m=`${r.toLowerCase()}`,u=document.createElement("article");u.classList.add(`${m}-card`);let h=`
    <div class='${m}-product-info'>
        <a href='${l}' target='_blank'>
          <img src="${d}" alt="Imagen del producto ${c}" loading="lazy" id="${i}">
        </a>
        <div class='inner-info'>
          <span id='supermarket-name'>${r}</span>
          <span id='product-name'>${c}</span>
          <small>${p}</small>
        </div>
    </div>
  `,g=document.createElement("div");g.classList.add("price-info");let C=document.createElement("span");C.id="current-price";let v=document.createElement("span");v.id="increase";let f=o[0],x=o[o.length-1],E=(x-f).toFixed(2),$=((x-f)/f*100).toFixed(2),F=(E>0?"+":"")+E,O=($>0?"+":"")+$;C.textContent=convertToOutput(x,"€"),v.textContent=`${convertToOutput(F,"€")} (${convertToOutput(O,"%")})`,e(E,C,v);let T=document.createElement("canvas");T.id="product-chart";let L=s,j=o;t(L,j,T),g.appendChild(C),g.appendChild(v),u.appendChild(range.createContextualFragment(h)),u.appendChild(g),u.appendChild(T),fragment.appendChild(u),n.appendChild(fragment),main.appendChild(n)};let convertToOutput=(e,t)=>`${e.replace(".",",")}${t}`;