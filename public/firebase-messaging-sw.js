self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();

    event.waitUntil(self.registration.showNotification(data.notification.title, data.notification));
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const link = event.notification.data.link || '/';
  event.waitUntil(self.clients.matchAll({ type: "window" }).then(clientList => {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url === link && 'focus' in client) return client.focus();
    }
    if (self.clients.openWindow) return self.clients.openWindow(link);
  }));
});