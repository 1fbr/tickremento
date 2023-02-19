import{getPrices as e}from"../handlers/price-color-handler.js";import{chartConfig as t}from"../utils/chart.js";let main=document.querySelector(".main-container"),fragment=document.createDocumentFragment();export const createCard=(a,n)=>{let l=`${a.supermarket.toLowerCase()}`,d=document.createElement("article");d.classList.add(`${l}-card`);let r=document.createElement("div");r.classList.add(`${l}-product-info`);let p=document.createElement("div");p.classList.add("inner-info");let i=document.createElement("a");i.href=a.url,i.target="_blank";let c=document.createElement("img");c.src=a.img,c.alt=`Imagen del producto ${a.name}`,c.loading="lazy",c.id=a.productId;let m=document.createElement("span");m.textContent=a.supermarket,m.id="supermarket-name";let s=document.createElement("span");s.textContent=a.name,s.id="product-name";let o=document.createElement("small");o.textContent=a.details;let h=document.createElement("div");h.classList.add("price-info");let C=a.prices,u=document.createElement("span"),E=document.createElement("span");e(C,u,E);let f=document.createElement("canvas");f.id="product-chart";let g=a.months,L=a.prices;t(g,L,f),i.appendChild(c),r.appendChild(i),p.appendChild(m),p.appendChild(s),p.appendChild(o),r.appendChild(p),h.appendChild(u),h.appendChild(E),d.appendChild(r),d.appendChild(h),d.appendChild(f),fragment.appendChild(d),n.appendChild(fragment),main.appendChild(n)};