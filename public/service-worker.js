// public/service-worker.js
'use strict';

self.addEventListener('fetch', function (event) {
    // Ignore requests to chrome-extension:// URLs
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    // Allow POST requests to go through
    if (event.request.method === 'POST') {
        event.respondWith(
            fetch(event.request).catch(error => {
                console.error('Fetch failed:', error);
                throw error;
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (!response) {
                return fetch(event.request).catch(error => {
                    console.error('Fetch failed:', error);
                    throw error;
                });
            }

            return response;
        })
    );
});