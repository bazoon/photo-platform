(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./features/admin/admin.module": [
		"./src/app/features/admin/admin.module.ts",
		"features-admin-admin-module"
	],
	"./features/user/user.module": [
		"./src/app/features/user/user.module.ts",
		"features-user-user-module"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nz-layout>\n  <nz-header>\n    <div class=\"logo-menu-container\">\n      <a routerLink=\"/\" class=\"logo\">\n        <i nz-icon [nzType]=\"'home'\"></i>\n      </a>\n      <ul nz-menu nzTheme=\"dark\" nzMode=\"horizontal\">\n        <li *ngFor=\"let m of staticMenu\" [routerLink]=\"m.url\" nz-submenu [nzTitle]=\"m.title | translate\">\n          <ul>\n            <li *ngFor=\"let s of m.children\" nz-menu-item [routerLink]=\"'/sections/'+s.id\">{{s.title | translate}}</li>\n          </ul>\n        </li>\n        <li *ngFor=\"let m of contestMenus\" [routerLink]=\"'/sections/'+m.id\" nz-submenu [nzTitle]=\"m.title | translate\">\n          <ul>\n            <li *ngFor=\"let s of m.children\" nz-menu-item [routerLink]=\"'/sections/'+s.id\">{{s.title | translate}}</li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n\n    <a *rbacShow=\"['superAdmin', 'admin', 'moder']\" routerLink=\"/admin/contests\">admin</a>\n\n    <a *ngIf=\"!currentUser.isLoggedIn\" routerLink=\"login\" class=\"user-login\">\n      <i nz-icon [nzType]=\"'user'\"></i>\n      {{'login' | translate}}\n    </a>\n    <span *ngIf=\"currentUser.isLoggedIn\" (click)=\"logout()\" class=\"user-login\">\n      <i nz-icon [nzType]=\"'user'\"></i>\n      {{'logout' | translate}}\n    </span>\n\n    <div class=\"logo-menu-container\">\n      <app-lang-selector></app-lang-selector>\n    </div>\n\n    <a *ngIf=\"currentUser.isLoggedIn\" routerLink=\"/user/applications\" class=\"user-login\">\n      {{currentUser.user.firstName}}\n    </a>\n  </nz-header>\n\n  <nz-content>\n    <router-outlet></router-outlet>\n  </nz-content>\n\n  <nz-footer nzTheme=\"dark\">\n    <div class=\"footer-wrap\">\n      <div class=\"left\">\n        <div>{{organizer.name}}</div>\n        <div>{{organizer.emailPub}}</div>\n      </div>\n      <div class=\"right\">\n        <div>{{organizer.address}}</div>\n        <div>{{organizer.www}}</div>\n      </div>\n    </div>\n  </nz-footer>\n</nz-layout>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/core/icons/fb/fb.component.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/core/icons/fb/fb.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" aria-label=\"Facebook\" role=\"img\" viewBox=\"0 0 512 512\">\n  <rect width=\"512\" height=\"512\" rx=\"15%\" fill=\"#1877f2\" />\n  <path d=\"M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z\"\n    fill=\"#fff\" />\n</svg>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/core/icons/vk/vk.component.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/core/icons/vk/vk.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" aria-label=\"VK\" role=\"img\" viewBox=\"0 0 512 512\">\n  <rect width=\"512\" height=\"512\" rx=\"15%\" fill=\"#5281b8\" />\n  <path fill=\"#fff\" d=\"M274 363c5-1 14-3 14-15 0 0-1-30 13-34s32 29 51 42c14 9 25 8 25 8l51-1s26-2 14-23c-1-2-9-15-39-42-31-30-26-25 11-76 23-31 33-50 30-57-4-7-20-6-20-6h-57c-6 0-9 1-12 6 0 0-9 25-21 45-25 43-35 45-40 42-9-5-7-24-7-37 0-45 7-61-13-65-13-2-59-4-73 3-7 4-11 11-8 12 3 0 12 1 17 7 8 13 9 75-2 81-15 11-53-62-62-86-2-6-5-7-12-9H79c-6 0-15 1-11 13 27 56 83 193 184 192z\"\n  />\n</svg>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/contest-photos/contest-photos.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/contest-photos/contest-photos.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <nz-breadcrumb>\n    <nz-breadcrumb-item>\n      <a routerLink=\"/\">{{'main' | translate}}</a>\n    </nz-breadcrumb-item>\n    <nz-breadcrumb-item>\n      {{'sections' | translate}}\n    </nz-breadcrumb-item>\n  </nz-breadcrumb>\n  <h1>{{'sections' | translate}}</h1>\n  <div class=\"sections\">\n    <div *ngFor=\"let section of sections\" class=\"section-wrap\" [routerLink]=\"'/photos/'+section.id\">\n      <div *ngIf=\"section.imageUrl\">\n        <img [src]=\"section.imageUrl \" />\n        <div class=\"section-name \">\n          {{section.name}}\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/lang-selector/lang-selector.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/lang-selector/lang-selector.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul nz-menu nzTheme=\"dark\" nzMode=\"horizontal\">\n  <li nz-submenu nzTitle=\"lang\">\n    <ul>\n      <li nz-menu-item (click)=\"changeLanguage('ru')\">ru</li>\n      <li nz-menu-item (click)=\"changeLanguage('en')\">en</li>\n      <li nz-menu-item (click)=\"changeLanguage('de')\">de</li>\n    </ul>\n  </li>\n</ul>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/login/fb/fb.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/login/fb/fb.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/login/login.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/login/login.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-form-container\">\n  <form nz-form [formGroup]=\"validateForm\" class=\"login-form\" (ngSubmit)=\"submitForm()\">\n    <nz-form-item>\n      <nz-form-control nzErrorTip=\"Please input your nickName!\">\n        <nz-input-group nzPrefixIcon=\"user\">\n          <input type=\"text\" nz-input formControlName=\"nickName\" placeholder=\"nickName\" />\n        </nz-input-group>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-control nzErrorTip=\"Please input your Password!\">\n        <nz-input-group nzPrefixIcon=\"lock\">\n          <input type=\"password\" nz-input formControlName=\"password\" placeholder=\"Password\" />\n        </nz-input-group>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-control>\n        <label nz-checkbox formControlName=\"remember\">\n          <span>{{'rememberMe' | translate }}</span>\n        </label>\n        <a class=\"login-form-forgot\" class=\"login-form-forgot\">{{'forgotPassword' | translate}}</a>\n        <button nz-button class=\"login-form-button\" [nzType]=\"'primary'\">{{'logIn' | translate}}</button>\n\n        <a routerLink=\"/register\" class=\"user-login\">{{'register' | translate}}</a>\n        <br>\n        <a (click)=\"vkLogin($event)\">\n          <i nz-icon style=\"width: 32px;margin-right: 5px;\">\n            <vk-icon></vk-icon>\n          </i>\n        </a>\n        <a (click)=\"fbLogin($event)\" href=\"#\">\n          <i nz-icon style=\"width: 32px;\">\n            <fb-icon></fb-icon>\n          </i>\n        </a>\n\n\n      </nz-form-control>\n    </nz-form-item>\n  </form>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/login/vk/vk.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/login/vk/vk.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/main/main.component.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/main/main.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <div class=\"competition-header\">\n    <div class=\"salone-name\">\n      <!-- {{contest && contest.name}} -->\n    </div>\n    <div class=\"contest-name\">\n      <!-- {{contest && contest.subname}} -->\n    </div>\n  </div>\n  <div class=\"image-container\">\n\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/preview-image/preview-image.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/preview-image/preview-image.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isImageVisible\" class=\"mask\" (click)=\"handleCancelImage()\">\n  <div class=\"modal\">\n    <img *ngIf=\"isImageVisible\" [src]=\"image\" class=\"img\" id=\"img\" />\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/publication/publication.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/publication/publication.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"publication\">\n    <h1>{{pub && pub.name}}</h1> -->\n    <div>{{pub && pub.dateCreate | date}}</div>\n\n    <div [innerHTML]=\"pub.content | safeHtml\">\n\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/publications/publications.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/publications/publications.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <div class=\"publications-wrapper\">\n    <ul class=\"publications\">\n      <li *ngFor=\"let pub of pubs\">\n        <div class=\"publication-name\">\n          <a [routerLink]=\"'/publications/'+pub.id\">{{pub.name}}</a>\n        </div>\n        <div class=\"publication-digest\" [innerHTML]=\"pub.digest\"></div>\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/register/register.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/register/register.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"register-container\">\n  <div nz-row>\n    <div nz-col [nzSm]=\"6\" [nzXs]=\"24\">&nbsp;</div>\n    <div nz-col [nzSm]=\"14\" [nzXs]=\"24\">\n      <h1>{{'registration' | translate}} </h1>\n    </div>\n  </div>\n  <form nz-form [formGroup]=\"validateForm\" (ngSubmit)=\"submitForm()\">\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzRequired nzFor=\"email\">{{'email' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\" nzErrorTip=\"The input is not valid E-mail!\">\n        <input nz-input formControlName=\"email\" id=\"email\" />\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzRequired nzFor=\"firstName\">{{'firstName' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\">\n        <input nz-input formControlName=\"firstName\" id=\"firstName\" />\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzRequired nzFor=\"lastName\">{{'lastName' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\">\n        <input nz-input formControlName=\"lastName\" id=\"lastName\" />\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzFor=\"password\" nzRequired>{{'password' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\" nzErrorTip=\"Please input your password!\">\n        <input nz-input type=\"password\" id=\"password\" formControlName=\"password\" (ngModelChange)=\"updateConfirmValidator()\" />\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzFor=\"checkPassword\" nzRequired>{{'confirmPassword' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\" [nzErrorTip]=\"errorTpl\">\n        <input nz-input type=\"password\" formControlName=\"checkPassword\" id=\"checkPassword\" />\n        <ng-template #errorTpl let-control>\n          <ng-container *ngIf=\"control.hasError('required')\">\n            Please confirm your password! {{'pleaseConfirmPassword' | translate}}\n          </ng-container>\n          <ng-container *ngIf=\"control.hasError('confirm')\">\n            {{'passwordsInconsistent' | translate}}\n          </ng-container>\n        </ng-template>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzFor=\"nickName\" nzRequired>\n        <span>\n          {{'nickname' | translate}}\n          <i nz-icon nz-tooltip nzTitle=\"What do you want other to call you\" nzType=\"question-circle\" nzTheme=\"outline\"></i>\n        </span>\n      </nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\" nzErrorTip=\"Please input your nickname!\">\n        <input nz-input id=\"nickName\" formControlName=\"nickName\" />\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzFor=\"phone\" nzRequired>{{'phone' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\" [nzValidateStatus]=\"validateForm.controls['phone']\" nzErrorTip=\"Please input your phone number!\">\n        <nz-input-group>\n          <input formControlName=\"phone\" id=\"'phone'\" nz-input />\n        </nz-input-group>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-label [nzSm]=\"6\" [nzXs]=\"24\" nzFor=\"email\">{{'avatar' | translate}}</nz-form-label>\n      <nz-form-control [nzSm]=\"14\" [nzXs]=\"24\">\n        <nz-upload [(nzFileList)]=\"fileList\" [nzBeforeUpload]=\"beforeUpload\">\n          <button nz-button>\n            <i nz-icon nzType=\"upload\"></i>\n            <span>{{'selectFile' | translate}}</span>\n          </button>\n        </nz-upload>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item nz-row class=\"register-area\">\n      <nz-form-control [nzSpan]=\"14\" [nzOffset]=\"6\">\n        <button nz-button nzType=\"primary\">{{'register' | translate}}</button>\n      </nz-form-control>\n    </nz-form-item>\n  </form>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/section-photos/section-photos.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/section-photos/section-photos.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <nz-breadcrumb>\n    <nz-breadcrumb-item>\n      <a routerLink=\"/\">{{'main' | translate}}</a>\n    </nz-breadcrumb-item>\n    <nz-breadcrumb-item>\n      <a routerLink=\"/photos/sections\">{{'sections' | translate}}</a>\n    </nz-breadcrumb-item>\n  </nz-breadcrumb>\n  <h1>{{section && section.name}}</h1>\n  <div class=\"photos\">\n    <div *ngFor=\"let photo of photos\" class=\"thumb-wrap\">\n      <img [src]=\"photo.imageUrl\" class=\"thumb\" (click)=\"showImage(photo.imageUrl)\" />\n      <div class=\"rate\">\n        {{photo.average | number:\"1.2-2\"}}\n      </div>\n      <div class=\"section-name\">\n        {{photo.name}}\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-preview-image [isImageVisible]=\"isImageVisible\" [image]=\"currentImage\" (clicked)=\"isImageVisible=false\">\n</app-preview-image>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/layout/user/user.component.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/layout/user/user.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nz-content>\n  <div class=\"inner-content\">\n    <router-outlet></router-outlet>\n  </div>\n</nz-content>"

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _features_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./features/login/login.component */ "./src/app/features/login/login.component.ts");
/* harmony import */ var _features_main_main_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./features/main/main.component */ "./src/app/features/main/main.component.ts");
/* harmony import */ var _features_register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./features/register/register.component */ "./src/app/features/register/register.component.ts");
/* harmony import */ var _features_publication_publication_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./features/publication/publication.component */ "./src/app/features/publication/publication.component.ts");
/* harmony import */ var _features_publications_publications_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./features/publications/publications.component */ "./src/app/features/publications/publications.component.ts");
/* harmony import */ var _features_contest_photos_contest_photos_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./features/contest-photos/contest-photos.component */ "./src/app/features/contest-photos/contest-photos.component.ts");
/* harmony import */ var _features_section_photos_section_photos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./features/section-photos/section-photos.component */ "./src/app/features/section-photos/section-photos.component.ts");
/* harmony import */ var _features_login_vk_vk_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./features/login/vk/vk.component */ "./src/app/features/login/vk/vk.component.ts");
/* harmony import */ var src_app_features_login_fb_fb_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/features/login/fb/fb.component */ "./src/app/features/login/fb/fb.component.ts");












const routes = [
    { path: '', component: _features_main_main_component__WEBPACK_IMPORTED_MODULE_4__["MainComponent"] },
    { path: 'login', component: _features_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'oauth/vk', component: _features_login_vk_vk_component__WEBPACK_IMPORTED_MODULE_10__["VkComponent"] },
    { path: 'oauth/fb', component: src_app_features_login_fb_fb_component__WEBPACK_IMPORTED_MODULE_11__["FbComponent"] },
    { path: 'register', component: _features_register_register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"] },
    { path: 'admin', loadChildren: './features/admin/admin.module#AdminModule' },
    { path: 'user', loadChildren: './features/user/user.module#UserModule' },
    {
        path: 'publications/:id', component: _features_publication_publication_component__WEBPACK_IMPORTED_MODULE_6__["PublicationComponent"]
    },
    {
        path: 'sections/:id', component: _features_publications_publications_component__WEBPACK_IMPORTED_MODULE_7__["PublicationsComponent"]
    },
    {
        path: 'photos/sections', component: _features_contest_photos_contest_photos_component__WEBPACK_IMPORTED_MODULE_8__["ContestPhotosComponent"]
    },
    {
        path: 'photos/:sectionId', component: _features_section_photos_section_photos_component__WEBPACK_IMPORTED_MODULE_9__["SectionPhotosComponent"]
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nz-header {\n  display: flex;\n  justify-content: space-between;\n  color: white;\n}\n.logo-menu-container {\n  display: flex;\n  align-items: center;\n}\n.user-login {\n  cursor: pointer;\n  font-weight: 900;\n}\nnz-content {\n  min-height: calc(100vh - 64px - 90px);\n}\nnz-footer {\n  background-color: #001529;\n  color: #fff;\n}\n.footer-wrap {\n  display: flex;\n  justify-content: space-between;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyIsImFwcC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFlBQUE7QUNDRjtBREVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FDQUY7QURHQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ0RGO0FESUE7RUFDRSxxQ0FBQTtBQ0ZGO0FES0E7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUNIRjtBRE1BO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FDSkYiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsibnotaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5sb2dvLW1lbnUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnVzZXItbG9naW4ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG59XG5cbm56LWNvbnRlbnQge1xuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gNjRweCAtIDkwcHgpO1xufVxuXG5uei1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMjEsIDQxKTtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5mb290ZXItd3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn0iLCJuei1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5sb2dvLW1lbnUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi51c2VyLWxvZ2luIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXdlaWdodDogOTAwO1xufVxubnotY29udGVudCB7XG4gIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmggLSA2NHB4IC0gOTBweCk7XG59XG5uei1mb290ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAxNTI5O1xuICBjb2xvcjogI2ZmZjtcbn1cbi5mb290ZXItd3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _state_current_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/current-user.service */ "./src/app/state/current-user.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _core_types_organizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/types/organizer */ "./src/app/core/types/organizer.ts");






let AppComponent = class AppComponent {
    constructor(api, currentUser, translate) {
        this.api = api;
        this.currentUser = currentUser;
        this.translate = translate;
        this.staticMenu = [];
        this.contestMenus = [];
        this.organizer = _core_types_organizer__WEBPACK_IMPORTED_MODULE_5__["emptyOrganizer"];
        this.translate.use('ru');
        this.loadMenu();
        this.loadFooter();
    }
    loadMenu() {
        this.api.get(`api/staticMenu`).subscribe(menu => {
            this.staticMenu = menu;
        });
        this.api.get(`api/admin/contestMenus/all`).subscribe(contestMenus => {
            this.contestMenus = contestMenus;
        });
    }
    loadFooter() {
        this.api.get(`api/organizers`).subscribe(organizer => {
            this.organizer = organizer;
        });
    }
    logout() {
        this.currentUser.logout();
    }
};
AppComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _state_current_user_service__WEBPACK_IMPORTED_MODULE_3__["CurrentUserService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/locales/ru */ "./node_modules/@angular/common/locales/ru.js");
/* harmony import */ var _angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _features_login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./features/login/login.component */ "./src/app/features/login/login.component.ts");
/* harmony import */ var _features_main_main_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./features/main/main.component */ "./src/app/features/main/main.component.ts");
/* harmony import */ var _features_register_register_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./features/register/register.component */ "./src/app/features/register/register.component.ts");
/* harmony import */ var _features_lang_selector_lang_selector_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./features/lang-selector/lang-selector.component */ "./src/app/features/lang-selector/lang-selector.component.ts");
/* harmony import */ var _layout_user_user_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./layout/user/user.component */ "./src/app/layout/user/user.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _core_misc_translationLoader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./core/misc/translationLoader */ "./src/app/core/misc/translationLoader.ts");
/* harmony import */ var _features_publication_publication_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./features/publication/publication.component */ "./src/app/features/publication/publication.component.ts");
/* harmony import */ var _features_publications_publications_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./features/publications/publications.component */ "./src/app/features/publications/publications.component.ts");
/* harmony import */ var _pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pipes/safe-html.pipe */ "./src/app/pipes/safe-html.pipe.ts");
/* harmony import */ var _features_contest_photos_contest_photos_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./features/contest-photos/contest-photos.component */ "./src/app/features/contest-photos/contest-photos.component.ts");
/* harmony import */ var _features_section_photos_section_photos_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./features/section-photos/section-photos.component */ "./src/app/features/section-photos/section-photos.component.ts");
/* harmony import */ var _features_login_vk_vk_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./features/login/vk/vk.component */ "./src/app/features/login/vk/vk.component.ts");
/* harmony import */ var _features_login_fb_fb_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./features/login/fb/fb.component */ "./src/app/features/login/fb/fb.component.ts");



























Object(_angular_common__WEBPACK_IMPORTED_MODULE_9__["registerLocaleData"])(_angular_common_locales_ru__WEBPACK_IMPORTED_MODULE_10___default.a);
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _features_login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
            _features_main_main_component__WEBPACK_IMPORTED_MODULE_12__["MainComponent"],
            _features_register_register_component__WEBPACK_IMPORTED_MODULE_13__["RegisterComponent"],
            _features_lang_selector_lang_selector_component__WEBPACK_IMPORTED_MODULE_14__["LangSelectorComponent"],
            _layout_user_user_component__WEBPACK_IMPORTED_MODULE_15__["UserComponent"],
            _features_publication_publication_component__WEBPACK_IMPORTED_MODULE_18__["PublicationComponent"],
            _features_publications_publications_component__WEBPACK_IMPORTED_MODULE_19__["PublicationsComponent"],
            _pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_20__["SafeHtmlPipe"],
            _features_contest_photos_contest_photos_component__WEBPACK_IMPORTED_MODULE_21__["ContestPhotosComponent"],
            _features_section_photos_section_photos_component__WEBPACK_IMPORTED_MODULE_22__["SectionPhotosComponent"],
            _features_login_vk_vk_component__WEBPACK_IMPORTED_MODULE_23__["VkComponent"],
            _features_login_fb_fb_component__WEBPACK_IMPORTED_MODULE_24__["FbComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__["TranslateLoader"],
                    useFactory: _core_misc_translationLoader__WEBPACK_IMPORTED_MODULE_17__["HttpLoaderFactory"],
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]]
                }
            }),
        ],
        exports: [
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
    })
], AppModule);



/***/ }),

/***/ "./src/app/core/directives/rbac-show.directive.ts":
/*!********************************************************!*\
  !*** ./src/app/core/directives/rbac-show.directive.ts ***!
  \********************************************************/
/*! exports provided: RbacShowDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RbacShowDirective", function() { return RbacShowDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _state_current_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/current-user.service */ "./src/app/state/current-user.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




let RbacShowDirective = class RbacShowDirective {
    constructor(templateRef, viewContainer, authService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.authService = authService;
        this.allowedRoles = [];
        this.roles = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]);
        this.rbacShow = [];
    }
    ngOnInit() {
        this.subscription = this.authService.roles.subscribe(roles => {
            this.allowedRoles = this.rbacShow;
            if (!this.allowedRoles || this.allowedRoles.length === 0 ||
                !this.authService.isLoggedIn) {
                this.viewContainer.clear();
                return;
            }
            const allowed = roles.filter(role => this.allowedRoles.includes(role)).length > 0;
            if (allowed) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
            else {
                this.viewContainer.clear();
            }
        });
    }
    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }
};
RbacShowDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] },
    { type: _state_current_user_service__WEBPACK_IMPORTED_MODULE_2__["CurrentUserService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], RbacShowDirective.prototype, "rbacShow", void 0);
RbacShowDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[rbacShow]'
    })
], RbacShowDirective);



/***/ }),

/***/ "./src/app/core/icons/fb/fb.component.less":
/*!*************************************************!*\
  !*** ./src/app/core/icons/fb/fb.component.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb3JlL2ljb25zL2ZiL2ZiLmNvbXBvbmVudC5sZXNzIn0= */"

/***/ }),

/***/ "./src/app/core/icons/fb/fb.component.ts":
/*!***********************************************!*\
  !*** ./src/app/core/icons/fb/fb.component.ts ***!
  \***********************************************/
/*! exports provided: FbComponentIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FbComponentIcon", function() { return FbComponentIcon; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FbComponentIcon = class FbComponentIcon {
};
FbComponentIcon = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'fb-icon',
        template: __webpack_require__(/*! raw-loader!./fb.component.html */ "./node_modules/raw-loader/index.js!./src/app/core/icons/fb/fb.component.html"),
        styles: [__webpack_require__(/*! ./fb.component.less */ "./src/app/core/icons/fb/fb.component.less")]
    })
], FbComponentIcon);



/***/ }),

/***/ "./src/app/core/icons/vk/vk.component.less":
/*!*************************************************!*\
  !*** ./src/app/core/icons/vk/vk.component.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb3JlL2ljb25zL3ZrL3ZrLmNvbXBvbmVudC5sZXNzIn0= */"

/***/ }),

/***/ "./src/app/core/icons/vk/vk.component.ts":
/*!***********************************************!*\
  !*** ./src/app/core/icons/vk/vk.component.ts ***!
  \***********************************************/
/*! exports provided: VkComponentIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VkComponentIcon", function() { return VkComponentIcon; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let VkComponentIcon = class VkComponentIcon {
};
VkComponentIcon = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'vk-icon',
        template: __webpack_require__(/*! raw-loader!./vk.component.html */ "./node_modules/raw-loader/index.js!./src/app/core/icons/vk/vk.component.html"),
        styles: [__webpack_require__(/*! ./vk.component.less */ "./src/app/core/icons/vk/vk.component.less")]
    })
], VkComponentIcon);



/***/ }),

/***/ "./src/app/core/misc/translationLoader.ts":
/*!************************************************!*\
  !*** ./src/app/core/misc/translationLoader.ts ***!
  \************************************************/
/*! exports provided: TranslationLoader, HttpLoaderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslationLoader", function() { return TranslationLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");

class TranslationLoader {
    constructor(http) {
        this.http = http;
    }
    getTranslation(lang) {
        return this.http.get('/api/translation/' + lang);
    }
}
TranslationLoader.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
];
function HttpLoaderFactory(http) {
    return new TranslationLoader(http);
}


/***/ }),

/***/ "./src/app/core/services/api.service.ts":
/*!**********************************************!*\
  !*** ./src/app/core/services/api.service.ts ***!
  \**********************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json',
    })
};
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
    }
    post(url, data) {
        /* if (!this.currentUser.isLoggedIn) { */
        /*   return; */
        /* } */
        if (data instanceof FormData) {
            return this.http.post(url, data);
        }
        else if (typeof data === 'object') {
            return this.http.post(url, JSON.stringify(data), httpOptions);
        }
        else {
            return this.http.post(url, JSON.stringify(data), httpOptions);
        }
    }
    postEmpty(url) {
        /* if (!this.currentUser.isLoggedIn) { */
        /*   return; */
        /* } */
        return this.http.post(url, '', httpOptions);
    }
    get(url) {
        /* if (!this.currentUser.isLoggedIn) { */
        /*   return; */
        /* } */
        return this.http.get(url);
    }
    put(url, data) {
        /* if (!this.currentUser.isLoggedIn) { */
        /*   return; */
        /* } */
        if (data instanceof FormData) {
            return this.http.put(url, data);
        }
        else if (typeof data === 'object') {
            return this.http.put(url, JSON.stringify(data), httpOptions);
        }
        else {
            return this.http.put(url, JSON.stringify(data), httpOptions);
        }
    }
    delete(url) {
        /* if (!this.currentUser.isLoggedIn) { */
        /*   return; */
        /* } */
        return this.http.delete(url);
    }
};
ApiService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ApiService);



/***/ }),

/***/ "./src/app/core/types/organizer.ts":
/*!*****************************************!*\
  !*** ./src/app/core/types/organizer.ts ***!
  \*****************************************/
/*! exports provided: emptyOrganizer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyOrganizer", function() { return emptyOrganizer; });
const emptyOrganizer = {
    id: -1,
    languageId: -1,
    language: '',
    name: '',
    emailSys: '',
    emailPub: '',
    addressLine1: '',
    addressLine2: '',
    www: '',
    phone: '',
    phoneTech: '',
    officer: '',
    logo: '',
    virtual: -1,
    smtp: '',
    smtpPassword: '',
    smtpUsePub: -1,
    createdAt: undefined,
    rowState: -1,
    dateStatus: undefined
};


/***/ }),

/***/ "./src/app/core/types/publicPublication.ts":
/*!*************************************************!*\
  !*** ./src/app/core/types/publicPublication.ts ***!
  \*************************************************/
/*! exports provided: emptyPublicPublication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyPublicPublication", function() { return emptyPublicPublication; });
;
const emptyPublicPublication = {
    id: undefined,
    dateCreate: undefined,
    dateShow: undefined,
    visible: undefined,
    digest: '',
    content: '',
    name: ''
};


/***/ }),

/***/ "./src/app/features/contest-photos/contest-photos.component.less":
/*!***********************************************************************!*\
  !*** ./src/app/features/contest-photos/contest-photos.component.less ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sections {\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 10px;\n}\n.section-wrap {\n  position: relative;\n  background-color: #fff;\n  width: 200px;\n  height: 200px;\n  margin-right: 10px;\n  cursor: pointer;\n}\n.section-wrap:last-child {\n  margin-right: 0;\n}\n.section-wrap img {\n  width: 200px;\n  height: 200px;\n  -o-object-fit: conver;\n     object-fit: conver;\n  -webkit-filter: brightness(0.7);\n          filter: brightness(0.7);\n}\n.section-name {\n  top: 0;\n  position: absolute;\n  width: 100%;\n  min-height: 100px;\n  color: #fff;\n  font-size: 20px;\n  font-weight: bold;\n  padding: 40px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL2NvbnRlc3QtcGhvdG9zL2NvbnRlc3QtcGhvdG9zLmNvbXBvbmVudC5sZXNzIiwiZmVhdHVyZXMvY29udGVzdC1waG90b3MvY29udGVzdC1waG90b3MuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDQ0Y7QURFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0FGO0FEQ0U7RUFDRSxlQUFBO0FDQ0o7QURUQTtFQVlJLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7S0FBQSxrQkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7QUNBSjtBREtBO0VBQ0UsTUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7QUNIRiIsImZpbGUiOiJmZWF0dXJlcy9jb250ZXN0LXBob3Rvcy9jb250ZXN0LXBob3Rvcy5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuLnNlY3Rpb24td3JhcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gIH1cblxuICBpbWcge1xuICAgIHdpZHRoOiAyMDBweDtcbiAgICBoZWlnaHQ6IDIwMHB4O1xuICAgIG9iamVjdC1maXQ6IGNvbnZlcjtcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMC43KTtcbiAgfVxuXG59XG5cbi5zZWN0aW9uLW5hbWUge1xuICB0b3A6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcGFkZGluZzogNDBweDtcbn0iLCIuc2VjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG4uc2VjdGlvbi13cmFwIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnNlY3Rpb24td3JhcDpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuLnNlY3Rpb24td3JhcCBpbWcge1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnZlcjtcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDAuNyk7XG59XG4uc2VjdGlvbi1uYW1lIHtcbiAgdG9wOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHBhZGRpbmc6IDQwcHg7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/features/contest-photos/contest-photos.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/features/contest-photos/contest-photos.component.ts ***!
  \*********************************************************************/
/*! exports provided: ContestPhotosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContestPhotosComponent", function() { return ContestPhotosComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/api.service */ "./src/app/core/services/api.service.ts");



let ContestPhotosComponent = class ContestPhotosComponent {
    constructor(api) {
        this.api = api;
        this.sections = [];
    }
    ngOnInit() {
        this.api.get('api/contestPhotos/sections').subscribe(sections => {
            this.sections = sections;
        });
    }
};
ContestPhotosComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
ContestPhotosComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-contest-photos',
        template: __webpack_require__(/*! raw-loader!./contest-photos.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/contest-photos/contest-photos.component.html"),
        styles: [__webpack_require__(/*! ./contest-photos.component.less */ "./src/app/features/contest-photos/contest-photos.component.less")]
    })
], ContestPhotosComponent);



/***/ }),

/***/ "./src/app/features/lang-selector/lang-selector.component.less":
/*!*********************************************************************!*\
  !*** ./src/app/features/lang-selector/lang-selector.component.less ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZWF0dXJlcy9sYW5nLXNlbGVjdG9yL2xhbmctc2VsZWN0b3IuY29tcG9uZW50Lmxlc3MifQ== */"

/***/ }),

/***/ "./src/app/features/lang-selector/lang-selector.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/features/lang-selector/lang-selector.component.ts ***!
  \*******************************************************************/
/*! exports provided: LangSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LangSelectorComponent", function() { return LangSelectorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/i18n */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd-i18n.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");




let LangSelectorComponent = class LangSelectorComponent {
    constructor(i18n, translate) {
        this.i18n = i18n;
        this.translate = translate;
    }
    changeLanguage(locale) {
        switch (locale) {
            case 'en': {
                this.i18n.setLocale(ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_2__["en_US"]);
                break;
            }
            case 'ru': {
                this.i18n.setLocale(ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_2__["ru_RU"]);
                break;
            }
        }
        this.translate.use(locale);
    }
};
LangSelectorComponent.ctorParameters = () => [
    { type: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_2__["NzI18nService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"] }
];
LangSelectorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-lang-selector',
        template: __webpack_require__(/*! raw-loader!./lang-selector.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/lang-selector/lang-selector.component.html"),
        styles: [__webpack_require__(/*! ./lang-selector.component.less */ "./src/app/features/lang-selector/lang-selector.component.less")]
    })
], LangSelectorComponent);



/***/ }),

/***/ "./src/app/features/login/fb/fb.component.less":
/*!*****************************************************!*\
  !*** ./src/app/features/login/fb/fb.component.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZWF0dXJlcy9sb2dpbi9mYi9mYi5jb21wb25lbnQubGVzcyJ9 */"

/***/ }),

/***/ "./src/app/features/login/fb/fb.component.ts":
/*!***************************************************!*\
  !*** ./src/app/features/login/fb/fb.component.ts ***!
  \***************************************************/
/*! exports provided: FbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FbComponent", function() { return FbComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _state_current_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../state/current-user.service */ "./src/app/state/current-user.service.ts");





let FbComponent = class FbComponent {
    constructor(route, api, currentUser) {
        this.route = route;
        this.api = api;
        this.currentUser = currentUser;
    }
    ngOnInit() {
        this.route.fragment.subscribe((fragment) => {
            const parts = fragment.split("&").map(p => p.split("="));
            const payload = parts.reduce((acc, e) => {
                const key = e[0];
                acc[key] = e[1];
                return acc;
            }, {});
            this.currentUser.loginFb(payload);
        });
    }
};
FbComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _state_current_user_service__WEBPACK_IMPORTED_MODULE_4__["CurrentUserService"] }
];
FbComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fb',
        template: __webpack_require__(/*! raw-loader!./fb.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/login/fb/fb.component.html"),
        styles: [__webpack_require__(/*! ./fb.component.less */ "./src/app/features/login/fb/fb.component.less")]
    })
], FbComponent);



/***/ }),

/***/ "./src/app/features/login/login.component.less":
/*!*****************************************************!*\
  !*** ./src/app/features/login/login.component.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-form-container {\n  margin-top: 80px;\n  display: flex;\n  justify-content: center;\n}\n.login-form {\n  max-width: 300px;\n}\n.login-form-forgot {\n  float: right;\n}\n.login-form-button {\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5sZXNzIiwiZmVhdHVyZXMvbG9naW4vbG9naW4uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQ0NGO0FERUE7RUFDRSxnQkFBQTtBQ0FGO0FER0E7RUFDRSxZQUFBO0FDREY7QURJQTtFQUNFLFdBQUE7QUNGRiIsImZpbGUiOiJmZWF0dXJlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbi1mb3JtLWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDgwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4ubG9naW4tZm9ybSB7XG4gIG1heC13aWR0aDogMzAwcHg7XG59XG5cbi5sb2dpbi1mb3JtLWZvcmdvdCB7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmxvZ2luLWZvcm0tYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG59IiwiLmxvZ2luLWZvcm0tY29udGFpbmVyIHtcbiAgbWFyZ2luLXRvcDogODBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4ubG9naW4tZm9ybSB7XG4gIG1heC13aWR0aDogMzAwcHg7XG59XG4ubG9naW4tZm9ybS1mb3Jnb3Qge1xuICBmbG9hdDogcmlnaHQ7XG59XG4ubG9naW4tZm9ybS1idXR0b24ge1xuICB3aWR0aDogMTAwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/features/login/login.component.ts":
/*!***************************************************!*\
  !*** ./src/app/features/login/login.component.ts ***!
  \***************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _state_current_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/current-user.service */ "./src/app/state/current-user.service.ts");




const fbLink = `https://www.facebook.com/v4.0/dialog/oauth?scope=email&client_id=521960325035333&redirect_uri=${location.origin}/oauth/fb&state=somestate&response_type=token`;
const vkLink = `https://oauth.vk.com/authorize?scope=email&client_id=7176269&display=page&redirect_uri=${location.origin}/oauth/vk?scope=email&response_type=token&v=5.59`;
let LoginComponent = class LoginComponent {
    constructor(fb, currentUser) {
        this.fb = fb;
        this.currentUser = currentUser;
        this.validateForm = this.fb.group({
            nickName: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            remember: [true]
        });
    }
    submitForm() {
        const { value } = this.validateForm;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        this.currentUser.login(value);
    }
    vkLogin(e) {
        e.preventDefault();
        window.location.replace(vkLink);
    }
    fbLogin(e) {
        e.preventDefault();
        window.location.replace(fbLink);
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _state_current_user_service__WEBPACK_IMPORTED_MODULE_3__["CurrentUserService"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/login/login.component.html"),
        styles: [__webpack_require__(/*! ./login.component.less */ "./src/app/features/login/login.component.less")]
    })
], LoginComponent);



/***/ }),

/***/ "./src/app/features/login/vk/vk.component.less":
/*!*****************************************************!*\
  !*** ./src/app/features/login/vk/vk.component.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZWF0dXJlcy9sb2dpbi92ay92ay5jb21wb25lbnQubGVzcyJ9 */"

/***/ }),

/***/ "./src/app/features/login/vk/vk.component.ts":
/*!***************************************************!*\
  !*** ./src/app/features/login/vk/vk.component.ts ***!
  \***************************************************/
/*! exports provided: VkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VkComponent", function() { return VkComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _state_current_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../state/current-user.service */ "./src/app/state/current-user.service.ts");





let VkComponent = class VkComponent {
    constructor(route, api, currentUser) {
        this.route = route;
        this.api = api;
        this.currentUser = currentUser;
    }
    ngOnInit() {
        this.route.fragment.subscribe((fragment) => {
            const parts = fragment.split("&").map(p => p.split("="));
            const payload = parts.reduce((acc, e) => {
                const key = e[0];
                acc[key] = e[1];
                return acc;
            }, {});
            this.currentUser.loginVk(payload);
        });
    }
};
VkComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] },
    { type: _state_current_user_service__WEBPACK_IMPORTED_MODULE_4__["CurrentUserService"] }
];
VkComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-vk',
        template: __webpack_require__(/*! raw-loader!./vk.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/login/vk/vk.component.html"),
        styles: [__webpack_require__(/*! ./vk.component.less */ "./src/app/features/login/vk/vk.component.less")]
    })
], VkComponent);



/***/ }),

/***/ "./src/app/features/main/main.component.less":
/*!***************************************************!*\
  !*** ./src/app/features/main/main.component.less ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  margin-bottom: 40px;\n}\n.image-container {\n  display: flex;\n  justify-content: center;\n  position: relative;\n  height: 500px;\n}\n.icon-left {\n  position: absolute;\n  left: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 50px;\n  color: silver;\n  cursor: pointer;\n}\n.icon-right {\n  position: absolute;\n  right: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 50px;\n  color: silver;\n  cursor: pointer;\n}\n.competition-header {\n  font-size: 30px;\n  font-weight: 900;\n  text-align: center;\n}\n.img {\n  -o-object-fit: contain;\n     object-fit: contain;\n  max-width: 800px;\n  height: 500px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL21haW4vbWFpbi5jb21wb25lbnQubGVzcyIsImZlYXR1cmVzL21haW4vbWFpbi5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FDQ0Y7QURFQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQ0FGO0FER0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUNERjtBRElBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FDRkY7QURLQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDSEY7QURPQTtFQUNFLHNCQUFBO0tBQUEsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUNMRiIsImZpbGUiOiJmZWF0dXJlcy9tYWluL21haW4uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbiB7XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG59XG5cbi5pbWFnZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDUwMHB4O1xufVxuXG4uaWNvbi1sZWZ0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAyMHB4O1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBmb250LXNpemU6IDUwcHg7XG4gIGNvbG9yOiBzaWx2ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmljb24tcmlnaHQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAyMHB4O1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBmb250LXNpemU6IDUwcHg7XG4gIGNvbG9yOiBzaWx2ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNvbXBldGl0aW9uLWhlYWRlciB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5cbi5pbWcge1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBtYXgtd2lkdGg6IDgwMHB4O1xuICBoZWlnaHQ6IDUwMHB4O1xuICBcbn0iLCIubWFpbiB7XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG59XG4uaW1hZ2UtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiA1MDBweDtcbn1cbi5pY29uLWxlZnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDIwcHg7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGZvbnQtc2l6ZTogNTBweDtcbiAgY29sb3I6IHNpbHZlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmljb24tcmlnaHQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAyMHB4O1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBmb250LXNpemU6IDUwcHg7XG4gIGNvbG9yOiBzaWx2ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jb21wZXRpdGlvbi1oZWFkZXIge1xuICBmb250LXNpemU6IDMwcHg7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5pbWcge1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBtYXgtd2lkdGg6IDgwMHB4O1xuICBoZWlnaHQ6IDUwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/features/main/main.component.ts":
/*!*************************************************!*\
  !*** ./src/app/features/main/main.component.ts ***!
  \*************************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/api.service */ "./src/app/core/services/api.service.ts");



;
let MainComponent = class MainComponent {
    constructor(api) {
        this.api = api;
    }
    ngOnInit() {
    }
    next() {
    }
    prev() {
    }
};
MainComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
MainComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-main',
        template: __webpack_require__(/*! raw-loader!./main.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/main/main.component.html"),
        styles: [__webpack_require__(/*! ./main.component.less */ "./src/app/features/main/main.component.less")]
    })
], MainComponent);



/***/ }),

/***/ "./src/app/features/preview-image/preview-image.component.less":
/*!*********************************************************************!*\
  !*** ./src/app/features/preview-image/preview-image.component.less ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".img {\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  max-height: 100%;\n  max-height: calc(100vh - 80px);\n}\n.modal {\n  padding: 20px;\n  height: calc(100vh - 40px);\n  background-color: #ffffff;\n}\n.mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1000;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.65);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL3ByZXZpZXctaW1hZ2UvcHJldmlldy1pbWFnZS5jb21wb25lbnQubGVzcyIsImZlYXR1cmVzL3ByZXZpZXctaW1hZ2UvcHJldmlldy1pbWFnZS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxzQkFBQTtLQUFBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtBQ0NGO0FERUE7RUFDRSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSx5QkFBQTtBQ0FGO0FER0E7RUFDRSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EscUNBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQ0RGIiwiZmlsZSI6ImZlYXR1cmVzL3ByZXZpZXctaW1hZ2UvcHJldmlldy1pbWFnZS5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDgwcHgpO1xufVxuXG4ubW9kYWwge1xuICBwYWRkaW5nOiAyMHB4O1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA0MHB4KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cblxuLm1hc2sge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTAwMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn0iLCIuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSA4MHB4KTtcbn1cbi5tb2RhbCB7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDQwcHgpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuLm1hc2sge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTAwMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/features/preview-image/preview-image.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/features/preview-image/preview-image.component.ts ***!
  \*******************************************************************/
/*! exports provided: PreviewImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewImageComponent", function() { return PreviewImageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PreviewImageComponent = class PreviewImageComponent {
    constructor() {
        this.image = "";
        this.isImageVisible = false;
        this.clicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    handleCancelImage() {
        this.clicked.emit();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PreviewImageComponent.prototype, "image", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], PreviewImageComponent.prototype, "isImageVisible", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], PreviewImageComponent.prototype, "clicked", void 0);
PreviewImageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-preview-image',
        template: __webpack_require__(/*! raw-loader!./preview-image.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/preview-image/preview-image.component.html"),
        styles: [__webpack_require__(/*! ./preview-image.component.less */ "./src/app/features/preview-image/preview-image.component.less")]
    })
], PreviewImageComponent);



/***/ }),

/***/ "./src/app/features/publication/publication.component.less":
/*!*****************************************************************!*\
  !*** ./src/app/features/publication/publication.component.less ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".publications {\n  list-style-type: none;\n}\n.publications li {\n  margin-bottom: 10px;\n}\n.publication-name {\n  font-weight: 600;\n  margin-bottom: 10px;\n  font-size: 16px;\n}\n.publication-digest {\n  font-weight: 200;\n  font-size: 12px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL3B1YmxpY2F0aW9uL3B1YmxpY2F0aW9uLmNvbXBvbmVudC5sZXNzIiwiZmVhdHVyZXMvcHVibGljYXRpb24vcHVibGljYXRpb24uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtBQ0NGO0FERkE7RUFHSSxtQkFBQTtBQ0VKO0FERUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQ0FGO0FER0E7RUFDRSxnQkFBQTtFQUNBLGVBQUE7QUNERiIsImZpbGUiOiJmZWF0dXJlcy9wdWJsaWNhdGlvbi9wdWJsaWNhdGlvbi5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wdWJsaWNhdGlvbnMge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIGxpIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG59XG5cbi5wdWJsaWNhdGlvbi1uYW1lIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgZm9udC1zaXplOiAxNnB4OyAgXG59XG5cbi5wdWJsaWNhdGlvbi1kaWdlc3Qge1xuICBmb250LXdlaWdodDogMjAwO1xuICBmb250LXNpemU6IDEycHg7XG59IiwiLnB1YmxpY2F0aW9ucyB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbn1cbi5wdWJsaWNhdGlvbnMgbGkge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuLnB1YmxpY2F0aW9uLW5hbWUge1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBmb250LXNpemU6IDE2cHg7XG59XG4ucHVibGljYXRpb24tZGlnZXN0IHtcbiAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/features/publication/publication.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/features/publication/publication.component.ts ***!
  \***************************************************************/
/*! exports provided: PublicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicationComponent", function() { return PublicationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_types_publicPublication__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/types/publicPublication */ "./src/app/core/types/publicPublication.ts");





let PublicationComponent = class PublicationComponent {
    constructor(api, route) {
        this.api = api;
        this.route = route;
        this.pub = _core_types_publicPublication__WEBPACK_IMPORTED_MODULE_4__["emptyPublicPublication"];
    }
    ngOnInit() {
        this.route.paramMap.subscribe(p => {
            this.api.get(`api/publications/single/${p.get('id')}`).subscribe(pub => {
                this.pub = pub;
            });
        });
    }
};
PublicationComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
PublicationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-publication',
        template: __webpack_require__(/*! raw-loader!./publication.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/publication/publication.component.html"),
        styles: [__webpack_require__(/*! ./publication.component.less */ "./src/app/features/publication/publication.component.less")]
    })
], PublicationComponent);



/***/ }),

/***/ "./src/app/features/publications/publications.component.less":
/*!*******************************************************************!*\
  !*** ./src/app/features/publications/publications.component.less ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".publications {\n  list-style-type: none;\n}\n.publications li {\n  margin-bottom: 10px;\n}\n.publication-name {\n  font-size: 16px;\n  font-weight: 900;\n}\n.publication-digest {\n  font-weight: 300;\n  font-size: 12px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL3B1YmxpY2F0aW9ucy9wdWJsaWNhdGlvbnMuY29tcG9uZW50Lmxlc3MiLCJmZWF0dXJlcy9wdWJsaWNhdGlvbnMvcHVibGljYXRpb25zLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7QUNDRjtBREZBO0VBR0ksbUJBQUE7QUNFSjtBREVBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDQUY7QURJQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQ0ZGIiwiZmlsZSI6ImZlYXR1cmVzL3B1YmxpY2F0aW9ucy9wdWJsaWNhdGlvbnMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHVibGljYXRpb25zIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBsaSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfVxufVxuXG4ucHVibGljYXRpb24tbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcblxufVxuXG4ucHVibGljYXRpb24tZGlnZXN0IHtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuIiwiLnB1YmxpY2F0aW9ucyB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbn1cbi5wdWJsaWNhdGlvbnMgbGkge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuLnB1YmxpY2F0aW9uLW5hbWUge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG59XG4ucHVibGljYXRpb24tZGlnZXN0IHtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/features/publications/publications.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/features/publications/publications.component.ts ***!
  \*****************************************************************/
/*! exports provided: PublicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicationsComponent", function() { return PublicationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");





let PublicationsComponent = class PublicationsComponent {
    constructor(api, route, translate) {
        this.api = api;
        this.route = route;
        this.translate = translate;
        this.pubs = [];
    }
    ngOnInit() {
        this.route.paramMap.subscribe(p => {
            this.load(this.translate.currentLang, p.get('id'));
        });
        this.translate.onLangChange.subscribe((t) => {
            this.route.paramMap.subscribe(p => {
                this.load(this.translate.currentLang, p.get('id'));
            });
        });
    }
    load(lang, menuId) {
        this.api.get(`api/publications/${menuId}/${lang}`).subscribe(pubs => {
            this.pubs = pubs;
        });
    }
};
PublicationsComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
];
PublicationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-publications',
        template: __webpack_require__(/*! raw-loader!./publications.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/publications/publications.component.html"),
        styles: [__webpack_require__(/*! ./publications.component.less */ "./src/app/features/publications/publications.component.less")]
    })
], PublicationsComponent);



/***/ }),

/***/ "./src/app/features/register/register.component.less":
/*!***********************************************************!*\
  !*** ./src/app/features/register/register.component.less ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".register-container {\n  margin-top: 80px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5sZXNzIiwiZmVhdHVyZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtBQ0NGIiwiZmlsZSI6ImZlYXR1cmVzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlZ2lzdGVyLWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDgwcHg7XG4gIFxufSIsIi5yZWdpc3Rlci1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiA4MHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/features/register/register.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/features/register/register.component.ts ***!
  \*********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _state_current_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/current-user.service */ "./src/app/state/current-user.service.ts");




let RegisterComponent = class RegisterComponent {
    constructor(fb, currentUser) {
        this.fb = fb;
        this.currentUser = currentUser;
        this.fileList = [];
        this.beforeUpload = (file) => {
            this.fileList = [file];
            return false;
        };
        this.confirmationValidator = (control) => {
            if (!control.value) {
                return { required: true };
            }
            else if (control.value !== this.validateForm.controls.password.value) {
                return { confirm: true, error: true };
            }
            return {};
        };
        this.validateForm = this.fb.group({
            email: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            firstName: [],
            lastName: [],
            password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            checkPassword: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, this.confirmationValidator]],
            nickName: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            phone: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            agree: [false]
        });
    }
    submitForm() {
        const { value } = this.validateForm;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        this.currentUser.register(Object.assign({}, value, { avatar: this.fileList[0] }));
    }
    updateConfirmValidator() {
        Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }
};
RegisterComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _state_current_user_service__WEBPACK_IMPORTED_MODULE_3__["CurrentUserService"] }
];
RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(/*! raw-loader!./register.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/register/register.component.html"),
        styles: [__webpack_require__(/*! ./register.component.less */ "./src/app/features/register/register.component.less")]
    })
], RegisterComponent);



/***/ }),

/***/ "./src/app/features/section-photos/section-photos.component.less":
/*!***********************************************************************!*\
  !*** ./src/app/features/section-photos/section-photos.component.less ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".thumb {\n  width: 150px;\n  height: 150px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.thumb:last-child {\n  margin-right: 0px;\n}\n.thumb-wrap {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  overflow: hidden;\n  max-width: 150px;\n}\n.thumb-wrap i {\n  cursor: pointer;\n}\n.thumb-wrap:hover .rate {\n  display: block;\n}\n.thumb:hover {\n  -webkit-filter: brightness(0.4);\n          filter: brightness(0.4);\n}\n.photos {\n  display: flex;\n  flex-wrap: wrap;\n}\n.rate {\n  font-size: 14px;\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  color: white;\n  font-weight: bold;\n  transform: translate(-50%, -50%);\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92bi9wcm9qZWN0cy93b3JrL3Bob3RvLXBsYXRmb3JtL2NsaWVudC9zcmMvYXBwL2ZlYXR1cmVzL3NlY3Rpb24tcGhvdG9zL3NlY3Rpb24tcGhvdG9zLmNvbXBvbmVudC5sZXNzIiwiZmVhdHVyZXMvc2VjdGlvbi1waG90b3Mvc2VjdGlvbi1waG90b3MuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUNDRjtBREFFO0VBQ0UsaUJBQUE7QUNFSjtBREVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0FGO0FEUEE7RUFTSSxlQUFBO0FDQ0o7QURFRTtFQUVJLGNBQUE7QUNETjtBRE9FO0VBQ0UsK0JBQUE7VUFBQSx1QkFBQTtBQ0xKO0FEVUE7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBQ1JGO0FEV0E7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQ0FBQTtBQ1RGIiwiZmlsZSI6ImZlYXR1cmVzL3NlY3Rpb24tcGhvdG9zL3NlY3Rpb24tcGhvdG9zLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLnRodW1iIHsgXG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gICY6bGFzdC1jaGlsZCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XG4gIH1cbn1cblxuLnRodW1iLXdyYXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWF4LXdpZHRoOiAxNTBweDtcbiAgaSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgLnJhdGUge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICB9XG59XG5cbi50aHVtYiB7XG4gICY6aG92ZXIge1xuICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwLjQpO1xuICB9XG59XG5cblxuLnBob3RvcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnJhdGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59IiwiLnRodW1iIHtcbiAgd2lkdGg6IDE1MHB4O1xuICBoZWlnaHQ6IDE1MHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi50aHVtYjpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLXJpZ2h0OiAwcHg7XG59XG4udGh1bWItd3JhcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXgtd2lkdGg6IDE1MHB4O1xufVxuLnRodW1iLXdyYXAgaSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi50aHVtYi13cmFwOmhvdmVyIC5yYXRlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4udGh1bWI6aG92ZXIge1xuICBmaWx0ZXI6IGJyaWdodG5lc3MoMC40KTtcbn1cbi5waG90b3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG4ucmF0ZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/features/section-photos/section-photos.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/features/section-photos/section-photos.component.ts ***!
  \*********************************************************************/
/*! exports provided: SectionPhotosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionPhotosComponent", function() { return SectionPhotosComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




;
let SectionPhotosComponent = class SectionPhotosComponent {
    constructor(api, route) {
        this.api = api;
        this.route = route;
        this.photos = [];
        this.isImageVisible = false;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(p => {
            const id = p.get('sectionId');
            this.api.get(`api/contestPhotos/photos/${id}`).subscribe(photos => {
                this.photos = photos;
            });
            this.api.get(`api/contestSections/${id}`).subscribe(section => {
                this.section = section;
            });
        });
    }
    showImage(image) {
        this.isImageVisible = true;
        this.currentImage = image;
    }
};
SectionPhotosComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
SectionPhotosComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-section-photos',
        template: __webpack_require__(/*! raw-loader!./section-photos.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/section-photos/section-photos.component.html"),
        styles: [__webpack_require__(/*! ./section-photos.component.less */ "./src/app/features/section-photos/section-photos.component.less")]
    })
], SectionPhotosComponent);



/***/ }),

/***/ "./src/app/layout/user/user.component.less":
/*!*************************************************!*\
  !*** ./src/app/layout/user/user.component.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsYXlvdXQvdXNlci91c2VyLmNvbXBvbmVudC5sZXNzIn0= */"

/***/ }),

/***/ "./src/app/layout/user/user.component.ts":
/*!***********************************************!*\
  !*** ./src/app/layout/user/user.component.ts ***!
  \***********************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let UserComponent = class UserComponent {
    constructor() { }
    ngOnInit() {
    }
};
UserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-user-layout',
        template: __webpack_require__(/*! raw-loader!./user.component.html */ "./node_modules/raw-loader/index.js!./src/app/layout/user/user.component.html"),
        styles: [__webpack_require__(/*! ./user.component.less */ "./src/app/layout/user/user.component.less")]
    })
], UserComponent);



/***/ }),

/***/ "./src/app/pipes/moder-state.pipe.ts":
/*!*******************************************!*\
  !*** ./src/app/pipes/moder-state.pipe.ts ***!
  \*******************************************/
/*! exports provided: ModerStatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModerStatePipe", function() { return ModerStatePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ModerStatePipe = class ModerStatePipe {
    transform(value, ...args) {
        switch (value) {
            case 0:
                return "не модерирована";
            case 1:
                return "Одобрен";
            case 2:
                return "Запрещен";
        }
    }
};
ModerStatePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'moderState'
    })
], ModerStatePipe);



/***/ }),

/***/ "./src/app/pipes/reg-state.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/reg-state.pipe.ts ***!
  \*****************************************/
/*! exports provided: RegStatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegStatePipe", function() { return RegStatePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let RegStatePipe = class RegStatePipe {
    transform(value, ...args) {
        switch (value) {
            case 0:
                return "Подана заявка";
            case 1:
                return "Принята";
            case 2:
                return "Ожидает оплаты";
            case 3:
                return "Отклонена";
        }
    }
};
RegStatePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'regState'
    })
], RegStatePipe);



/***/ }),

/***/ "./src/app/pipes/safe-html.pipe.ts":
/*!*****************************************!*\
  !*** ./src/app/pipes/safe-html.pipe.ts ***!
  \*****************************************/
/*! exports provided: SafeHtmlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafeHtmlPipe", function() { return SafeHtmlPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
let SafeHtmlPipe = class SafeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
};
SafeHtmlPipe.ctorParameters = () => [
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] }
];
SafeHtmlPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'safeHtml',
    })
], SafeHtmlPipe);



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _pipes_reg_state_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pipes/reg-state.pipe */ "./src/app/pipes/reg-state.pipe.ts");
/* harmony import */ var _pipes_moder_state_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pipes/moder-state.pipe */ "./src/app/pipes/moder-state.pipe.ts");
/* harmony import */ var _features_preview_image_preview_image_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../features/preview-image/preview-image.component */ "./src/app/features/preview-image/preview-image.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _core_directives_rbac_show_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/directives/rbac-show.directive */ "./src/app/core/directives/rbac-show.directive.ts");
/* harmony import */ var _core_icons_vk_vk_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/icons/vk/vk.component */ "./src/app/core/icons/vk/vk.component.ts");
/* harmony import */ var _core_icons_fb_fb_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/icons/fb/fb.component */ "./src/app/core/icons/fb/fb.component.ts");











let SharedModule = class SharedModule {
};
SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _pipes_reg_state_pipe__WEBPACK_IMPORTED_MODULE_4__["RegStatePipe"],
            _pipes_moder_state_pipe__WEBPACK_IMPORTED_MODULE_5__["ModerStatePipe"],
            _features_preview_image_preview_image_component__WEBPACK_IMPORTED_MODULE_6__["PreviewImageComponent"],
            _core_directives_rbac_show_directive__WEBPACK_IMPORTED_MODULE_8__["RbacShowDirective"],
            _core_icons_vk_vk_component__WEBPACK_IMPORTED_MODULE_9__["VkComponentIcon"],
            _core_icons_fb_fb_component__WEBPACK_IMPORTED_MODULE_10__["FbComponentIcon"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NgZorroAntdModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        ],
        providers: [{ provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NZ_I18N"], useValue: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["ru_RU"] }],
        exports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NgZorroAntdModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _pipes_reg_state_pipe__WEBPACK_IMPORTED_MODULE_4__["RegStatePipe"],
            _pipes_moder_state_pipe__WEBPACK_IMPORTED_MODULE_5__["ModerStatePipe"],
            _features_preview_image_preview_image_component__WEBPACK_IMPORTED_MODULE_6__["PreviewImageComponent"],
            _core_directives_rbac_show_directive__WEBPACK_IMPORTED_MODULE_8__["RbacShowDirective"],
            _core_icons_vk_vk_component__WEBPACK_IMPORTED_MODULE_9__["VkComponentIcon"],
            _core_icons_fb_fb_component__WEBPACK_IMPORTED_MODULE_10__["FbComponentIcon"]
        ]
    })
], SharedModule);



/***/ }),

/***/ "./src/app/state/current-user.service.ts":
/*!***********************************************!*\
  !*** ./src/app/state/current-user.service.ts ***!
  \***********************************************/
/*! exports provided: CurrentUserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentUserService", function() { return CurrentUserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");





const emptyUser = {
    id: -1,
    firstName: '',
    lastName: '',
    nickName: '',
    avatar: '',
    email: '',
    phone: '',
    userType: -1,
    emailState: -1,
    emailCode: '',
    biography: '',
    awards: '',
    createdAt: new Date(),
    rowState: -1,
};
let CurrentUserService = class CurrentUserService {
    constructor(api, router) {
        this.api = api;
        this.router = router;
        this.isLoggedIn = false;
        this._roles = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](['']);
        this.roles = this._roles.asObservable();
        this.load();
    }
    login(loginData) {
        this.api.post('api/login', loginData).subscribe(u => {
            this.user = u;
            this.isLoggedIn = true;
            this.save();
            this.updateRoles();
            this.router.navigate(['/']);
        });
    }
    loginFb(payload) {
        this.api.post(`api/login-fb`, payload).subscribe(user => {
            this.user = user;
            this.isLoggedIn = true;
            this.save();
            this.updateRoles();
            this.router.navigate(['/']);
        });
    }
    loginVk(payload) {
        this.api.post(`api/login-vk`, payload).subscribe(user => {
            this.user = user;
            this.isLoggedIn = true;
            this.save();
            this.updateRoles();
            this.router.navigate(['/']);
        });
    }
    register(user) {
        const formData = new FormData();
        for (const f in user) {
            formData.append(f, user[f]);
        }
        this.api.post('api/register', formData).subscribe(u => {
            this.user = u;
            this.isLoggedIn = true;
            this.save();
            this.updateRoles();
            this.router.navigate(['/']);
        });
    }
    save() {
        localStorage.setItem('user', JSON.stringify(this.user));
    }
    load() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
            this.isLoggedIn = true;
            this.updateRoles();
        }
    }
    remove() {
        localStorage.removeItem('user');
    }
    logout() {
        this.api.postEmpty('api/logout').subscribe(() => {
            this.remove();
            this.isLoggedIn = false;
            this.user = undefined;
            this.updateRoles();
            this.router.navigate(['/']);
        });
    }
    updateRoles() {
        this.api.get('api/roles').subscribe(role => {
            this._roles.next([role.role]);
        }, () => this._roles.next([]));
    }
    getRoles() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(this.roles);
    }
};
CurrentUserService.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
CurrentUserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CurrentUserService);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vn/projects/work/photo-platform/client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map