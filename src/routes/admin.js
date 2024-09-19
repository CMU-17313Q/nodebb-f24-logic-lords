'use strict';

const helpers = require('./helpers');

module.exports = function (app, name, middleware, controllers) {
    const middlewares = [middleware.pluginHooks];

    helpers.setupAdminPageRoute(app, `/${name}`, middlewares, controllers.admin.routeIndex);

    helpers.setupAdminPageRoute(app, `/${name}/dashboard`, middlewares, controllers.admin.dashboard.get);
    helpers.setupAdminPageRoute(app, `/${name}/dashboard/logins`, middlewares, controllers.admin.dashboard.getLogins);
    helpers.setupAdminPageRoute(app, `/${name}/dashboard/users`, middlewares, controllers.admin.dashboard.getUsers);
    helpers.setupAdminPageRoute(app, `/${name}/dashboard/topics`, middlewares, controllers.admin.dashboard.getTopics);
    helpers.setupAdminPageRoute(app, `/${name}/dashboard/searches`, middlewares, controllers.admin.dashboard.getSearches);
    helpers.setupAdminPageRoute(app, `/${name}/dashboard/bug-log`, middlewares, controllers.admin.dashboard.getBugLog); // New route for bug log

    // ... other routes
};

function apiRoutes(router, name, middleware, controllers) {
    router.get(`/api/${name}/config`, middleware.ensureLoggedIn, helpers.tryRoute(controllers.admin.getConfig));
    router.get(`/api/${name}/users/csv`, middleware.ensureLoggedIn, helpers.tryRoute(controllers.admin.users.getCSV));
    router.get(`/api/${name}/groups/:groupname/csv`, middleware.ensureLoggedIn, helpers.tryRoute(controllers.admin.groups.getCSV));
    router.get(`/api/${name}/analytics`, middleware.ensureLoggedIn, helpers.tryRoute(controllers.admin.dashboard.getAnalytics));
    router.get(`/api/${name}/advanced/cache/dump`, middleware.ensureLoggedIn, helpers.tryRoute(controllers.admin.cache.dump));

    const multipart = require('connect-multiparty');
    const multipartMiddleware = multipart();

    const middlewares = [multipartMiddleware, middleware.validateFiles, middleware.applyCSRF, middleware.ensureLoggedIn];

    router.post(`/api/${name}/category/uploadpicture`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadCategoryPicture));
    router.post(`/api/${name}/uploadfavicon`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadFavicon));
    router.post(`/api/${name}/uploadTouchIcon`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadTouchIcon));
    router.post(`/api/${name}/uploadMaskableIcon`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadMaskableIcon));
    router.post(`/api/${name}/uploadlogo`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadLogo));
    router.post(`/api/${name}/uploadOgImage`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadOgImage));
    router.post(`/api/${name}/upload/file`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadFile));
    router.post(`/api/${name}/uploadDefaultAvatar`, middlewares, helpers.tryRoute(controllers.admin.uploads.uploadDefaultAvatar));
}
