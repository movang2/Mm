// File: sw.js
// Service Worker, chịu trách nhiệm xử lý thông báo ngầm.

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); 
  console.log('Service Worker activated');
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Khi click vào thông báo, chuyển về tab ứng dụng
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(self.registration.scope);
      }
    })
  );
});
