// public/service-worker.js
'use strict';

self.addEventListener('fetch', function (event) {
    // Allow POST requests to go through
    if (event.request.method === 'POST') {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(caches.match(event.request).then(function (response) {
        if (!response) {
            return fetch(event.request);
        }

        return response;
    }));
});