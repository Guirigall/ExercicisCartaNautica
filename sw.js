const CACHE='aula-estret-v6';
const FILES=['./','./index.html','./style.css','./app.js','./nav.js','./instruments.js','./manifest.webmanifest','./README.html','./assets/carta.jpg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES);await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('aula-estret-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;return fetch(event.request);})());});
self.addEventListener('message',event=>{if(event.data?.type==='CHECK_OFFLINE')event.waitUntil((async()=>{const cache=await caches.open(CACHE),all=await Promise.all(FILES.map(f=>cache.match(new URL(f,self.registration.scope).href)));if(all.every(Boolean))event.source?.postMessage({type:'OFFLINE_READY'});})());});
