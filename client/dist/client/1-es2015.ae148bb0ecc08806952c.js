(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/raw-loader/index.js!./src/app/features/user/contest-application/contest-application.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/user/contest-application/contest-application.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-user-layout>\n  <nz-breadcrumb>\n    <nz-breadcrumb-item>\n      <a routerLink=\"/\">{{'main' | translate}}</a>\n    </nz-breadcrumb-item>\n    <nz-breadcrumb-item>\n      <a [routerLink]=\"'/user/applications'\">{{'applications' | translate}}</a>\n    </nz-breadcrumb-item>\n    <nz-breadcrumb-item>\n      {{'photoworks' | translate}}\n    </nz-breadcrumb-item>\n  </nz-breadcrumb>\n  <h1>Номинации</h1>\n  <div class=\"sections-wrapper\">\n    <nz-select\n      class=\"sections\"\n      [(ngModel)]=\"currentSection\"\n      nzPlaceHolder=\"Секция\"\n      (ngModelChange)=\"handleChangeSection()\"\n    >\n      <nz-option\n        *ngFor=\"let section of sections\"\n        [nzValue]=\"section.id\"\n        [nzLabel]=\"section.name\"\n      ></nz-option>\n    </nz-select>\n  </div>\n\n  <div class=\"images\">\n    <div *ngFor=\"let file of files\" class=\"thumb-wrap\">\n      <span class=\"file-name\">{{file.name}}</span>\n      <img class=\"thumb\" [src]=\"file.filename\" />\n      <div class=\"thumb-controls\">\n        <i\n          nz-icon\n          nzType=\"delete\"\n          nzTheme=\"outline\"\n          (click)=\"removeImage(file.id)\"\n        ></i>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"currentSection\">\n    <div class=\"upload-wrapper\">\n      <nz-upload\n        [(nzFileList)]=\"fileList\"\n        nzMultiple=\"true\"\n        [nzBeforeUpload]=\"beforeUpload\"\n        [nzShowUploadList]=\"false\"\n      >\n        <button nz-button>\n          <i nz-icon nzType=\"upload\"></i>\n          <span>Select File</span>\n        </button>\n      </nz-upload>\n    </div>\n\n    <div class=\"file-list\">\n      <div *ngFor=\"let file of fileList\">\n        <div class=\"file-item\">\n          <input nz-input [(ngModel)]=\"fileNames[file.name]\" />\n          <span>{{file.name}}</span>\n          <i\n            nz-icon\n            nzType=\"delete\"\n            nzTheme=\"outline\"\n            (click)=\"removeFile(file.name)\"\n          ></i>\n        </div>\n      </div>\n    </div>\n\n    <button nz-button (click)=\"upload()\" [disabled]=\"fileList.length===0\">\n      Upload\n    </button>\n  </div>\n</app-user-layout>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/user/contest-applications/contest-applications.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/user/contest-applications/contest-applications.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-user-layout>\n  <h1>Конкурсы</h1>\n  <nz-table [nzData]=\"contests\">\n    <thead>\n      <tr>\n        <th nzWidth=\"200px\">Salone</th>\n        <th nzWidth=\"200px\">Subname</th>\n        <th nzWidth=\"200px\">Date start</th>\n        <th nzWidth=\"200px\">Date stop</th>\n        <th nzWidth=\"200px\"></th>\n        <th nzWidth=\"200px\"></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let data of contests\">\n        <td nzWidth=\"200px\">{{data.salone}}</td>\n        <td nzWidth=\"200px\">{{data.subname}}</td>\n        <td nzWidth=\"200px\">{{data.dateStart | date}}</td>\n        <td nzWidth=\"200px\">{{data.dateStop}}</td>\n        <td nzWidth=\"200px\">\n          <button\n            nz-button\n            *ngIf=\"data.canApply\"\n            (click)=\"applyForContest(data.id, data.sectionCount)\"\n          >\n            Request\n          </button>\n          <div [ngSwitch]=\"data.regState\">\n            <span *ngSwitchCase=\"0\">Подана заявка</span>\n            <span *ngSwitchCase=\"1\">Принята</span>\n            <span *ngSwitchCase=\"2\">Ожидает оплаты</span>\n            <span *ngSwitchCase=\"3\">Отклонена</span>\n          </div>\n        </td>\n        <td nzWidth=\"200px\">\n          <i\n            *ngIf=\"data.canPostPhotos\"\n            nz-icon\n            nzType=\"camera\"\n            nzTheme=\"outline\"\n            [routerLink]=\"data.id\"\n          ></i>\n        </td>\n      </tr>\n    </tbody>\n  </nz-table>\n\n  <nz-modal\n    [nzOkDisabled]=\"sectionForm.invalid\"\n    nzWidth=\"300\"\n    [(nzVisible)]=\"isApplicationVisible\"\n    nzTitle=\"Заявка\"\n    (nzOnCancel)=\"handleCancelApplication()\"\n    (nzOnOk)=\"handleOkApplication()\"\n  >\n    <form nz-form [formGroup]=\"sectionForm\">\n      <nz-form-item>\n        <nz-form-label nzFor=\"maxCountImg\">Количество секций</nz-form-label>\n        <nz-form-control>\n          <input\n            nz-input\n            name=\"sectionCount\"\n            type=\"sectionCount\"\n            id=\"sectionCount\"\n            formControlName=\"sectionCount\"\n          />\n          <div\n            *ngIf=\"sectionForm.controls.sectionCount.invalid && (sectionForm.controls.sectionCount.dirty || sectionForm.controls.sectionCount.touched)\"\n          >\n            <nz-alert\n              nzType=\"error\"\n              *ngIf=\"sectionForm && sectionForm.controls && sectionForm.controls.sectionCount && sectionForm.controls.sectionCount.errors && sectionForm.controls.sectionCount.errors.required\"\n              nzMessage=\"Это поле обязательно для заполнения\"\n            ></nz-alert>\n            <nz-alert\n              nzType=\"error\"\n              *ngIf=\"sectionForm && sectionForm.controls && sectionForm.controls.sectionCount && sectionForm.controls.sectionCount.errors && sectionForm.controls.sectionCount.errors.min\"\n              nzMessage=\"Это поле должно быть больше нуля!\"\n            ></nz-alert>\n            <nz-alert\n              nzType=\"error\"\n              *ngIf=\"sectionForm && sectionForm.controls && sectionForm.controls.sectionCount && sectionForm.controls.sectionCount.errors && sectionForm.controls.sectionCount.errors.max\"\n              nzMessage=\"Это поле должно быть меньше или равно {{currentSectionCount}}\"\n            ></nz-alert>\n          </div>\n        </nz-form-control>\n      </nz-form-item>\n    </form>\n  </nz-modal>\n</app-user-layout>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/user/jury/jury.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/user/jury/jury.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-user-layout>\n  <h1>Оценка работ</h1>\n  <div nz-row>\n    <div nz-col [nzSpan]=\"10\">\n      <nz-form-item>\n        <nz-form-label nzFor=\"email\">Конкурсы</nz-form-label>\n        <nz-form-control>\n          <nz-select\n            class=\"select\"\n            [(ngModel)]=\"currentContestId\"\n            nzPlaceHolder=\"Конкурс\"\n            (ngModelChange)=\"handleChangeContest()\"\n          >\n            <nz-option\n              *ngFor=\"let contest of contests\"\n              [nzValue]=\"contest.id\"\n              [nzLabel]=\"contest.subname\"\n            ></nz-option>\n          </nz-select>\n        </nz-form-control>\n      </nz-form-item>\n    </div>\n    <div nz-col [nzSpan]=\"10\">\n      <nz-form-item>\n        <nz-form-label nzFor=\"email\">Секции</nz-form-label>\n        <nz-form-control>\n          <nz-select\n            [disabled]=\"currentContestId < 0\"\n            class=\"select\"\n            [(ngModel)]=\"currentSection\"\n            nzPlaceHolder=\"Секция\"\n            (ngModelChange)=\"handleChangeSection()\"\n          >\n            <nz-option\n              *ngFor=\"let section of sections\"\n              [nzValue]=\"section.id\"\n              [nzLabel]=\"section.name\"\n            ></nz-option>\n          </nz-select>\n        </nz-form-control>\n      </nz-form-item>\n    </div>\n  </div>\n\n  <div class=\"images\">\n    <div *ngFor=\"let file of files\" class=\"thumb-wrap\">\n      <span class=\"file-name\">{{file.name}}</span>\n      <img\n        class=\"thumb\"\n        [src]=\"file.filename\"\n        (click)=\"viewImage(file.filename)\"\n      />\n      <div class=\"thumb-controls\">\n        <nz-rate\n          [nzCount]=\"currentContest && currentContest.maxrate\"\n          [ngModel]=\"file.rate\"\n          (ngModelChange)=\"handleRateChange($event, file.id)\"\n          nzAllowHalf\n        ></nz-rate>\n      </div>\n    </div>\n  </div>\n</app-user-layout>\n\n<app-preview-image\n  [isImageVisible]=\"isImageVisible\"\n  [image]=\"currentImage\"\n  (clicked)=\"isImageVisible=false\"\n>\n</app-preview-image>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/user/layout/layout.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/user/layout/layout.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nz-layout>\n  <nz-sider nzWidth=\"200px\" nzTheme=\"light\">\n    <div class=\"logo\"></div>\n    <ul nz-menu nzTheme=\"light\" nzMode=\"inline\">\n      <ul>\n        <li nz-menu-item [nzMatchRouter]=\"true\">\n          <a routerLink=\"/user/applications\">Заявки</a>\n        </li>\n        <li nz-menu-item *ngFor=\"let item of menu\" [nzMatchRouter]=\"true\">\n          <a [routerLink]=\"item.url\">{{item.name}}</a>\n        </li>\n      </ul>\n    </ul>\n  </nz-sider>\n  <nz-layout>\n    <nz-content>\n      <div class=\"inner-content\">\n        <ng-content></ng-content>\n      </div>\n    </nz-content>\n  </nz-layout>\n</nz-layout>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/user/salones/salones.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/user/salones/salones.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-user-layout>\n  Salones\n</app-user-layout>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/features/user/short-list/short-list.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/features/user/short-list/short-list.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-user-layout>\n  <h1>Short Lists</h1>\n  <div nz-row>\n    <div nz-col [nzSpan]=\"10\">\n      <nz-form-item>\n        <nz-form-label nzFor=\"email\">Конкурсы</nz-form-label>\n        <nz-form-control>\n          <nz-select\n            class=\"select\"\n            [(ngModel)]=\"currentContestId\"\n            nzPlaceHolder=\"Конкурс\"\n            (ngModelChange)=\"handleChangeContest()\"\n          >\n            <nz-option\n              *ngFor=\"let contest of contests\"\n              [nzValue]=\"contest.id\"\n              [nzLabel]=\"contest.subname\"\n            ></nz-option>\n          </nz-select>\n        </nz-form-control>\n      </nz-form-item>\n    </div>\n    <div nz-col [nzSpan]=\"10\">\n      <nz-form-item>\n        <nz-form-label nzFor=\"email\">Секции</nz-form-label>\n        <nz-form-control>\n          <nz-select\n            [disabled]=\"currentContestId < 0\"\n            class=\"select\"\n            [(ngModel)]=\"currentSection\"\n            nzPlaceHolder=\"Секция\"\n            (ngModelChange)=\"handleChangeSection()\"\n          >\n            <nz-option\n              *ngFor=\"let section of sections\"\n              [nzValue]=\"section.id\"\n              [nzLabel]=\"section.name\"\n            ></nz-option>\n          </nz-select>\n        </nz-form-control>\n      </nz-form-item>\n    </div>\n  </div>\n\n  <nz-table #basicTable [nzData]=\"files\">\n    <tbody>\n      <tr *ngFor=\"let file of files\">\n        <td>{{file.name}}</td>\n        <td>\n          <img\n            class=\"thumb\"\n            [src]=\"file.filename\"\n            (click)=\"viewImage(file.filename)\"\n          />\n        </td>\n        <td>\n          {{file.average | number:'1.1-2'}}\n        </td>\n        <td>\n          <nz-select\n            [(ngModel)]=\"file.awardsStackId\"\n            [nzAllowClear]=\"true\"\n            style=\"width: 200px\"\n            (ngModelChange)=\"handleAwardChange(file)\"\n          >\n            <nz-option\n              *ngFor=\"let awardStack of awardsStacks\"\n              [nzDisabled]=\"awardStack.countAwards === awardStack.issued\"\n              [nzValue]=\"awardStack.id\"\n              [nzLabel]=\"awardStack.name\"\n            ></nz-option>\n          </nz-select>\n        </td>\n      </tr>\n    </tbody>\n  </nz-table>\n</app-user-layout>\n\n<app-preview-image\n  [isImageVisible]=\"isImageVisible\"\n  [image]=\"currentImage\"\n  (clicked)=\"isImageVisible=false\"\n>\n</app-preview-image>\n"

/***/ }),

/***/ "./src/app/features/user/contest-application/contest-application.component.less":
/*!**************************************************************************************!*\
  !*** ./src/app/features/user/contest-application/contest-application.component.less ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sections {\n  width: 300px;\n}\n.sections-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.upload-wrapper {\n  width: 100%;\n  margin-bottom: 10px;\n}\n.file-item {\n  display: flex;\n  align-items: center;\n}\n.file-item input {\n  width: 400px;\n}\n.file-item * {\n  margin-right: 10px;\n}\n.file-item *:last-child {\n  margin-right: 0px;\n}\n.file-item i {\n  cursor: pointer;\n}\n.file-list {\n  margin-bottom: 10px;\n}\n.images {\n  display: flex;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.images img {\n  width: 200px;\n  height: 200px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.thumb {\n  width: 150px;\n  height: 150px;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.thumb:last-child {\n  margin-right: 0px;\n}\n.thumb-wrap {\n  display: flex;\n  flex-direction: column;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  overflow: hidden;\n  max-width: 150px;\n}\n.thumb-wrap i {\n  cursor: pointer;\n}\n.file-name {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 150px;\n  display: inline-block;\n}\n"

/***/ }),

/***/ "./src/app/features/user/contest-application/contest-application.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/features/user/contest-application/contest-application.component.ts ***!
  \************************************************************************************/
/*! exports provided: ContestApplicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContestApplicationComponent", function() { return ContestApplicationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");





let ContestApplicationComponent = class ContestApplicationComponent {
    constructor(api, route, translate) {
        this.api = api;
        this.route = route;
        this.translate = translate;
        this.sections = [];
        this.fileList = [];
        this.fileNames = {};
        this.files = [];
        this.beforeUpload = (file) => {
            this.fileList = this.fileList.concat(file);
            return false;
        };
    }
    ngOnInit() {
        this.route.paramMap.subscribe(p => {
            this.api
                .get(`api/contestSections/all/${p.get('id')}/${this.translate.currentLang}`)
                .subscribe(sections => {
                this.sections = sections;
            });
        });
        this.translate.onLangChange.subscribe((t) => {
            this.route.paramMap.subscribe(p => {
                this.api
                    .get(`api/contestSections/all/${p.get('id')}/${this.translate.currentLang}`)
                    .subscribe(sections => {
                    this.sections = sections;
                });
            });
        });
    }
    upload() {
        const formData = new FormData();
        this.fileList.forEach((file) => {
            formData.append('file', file);
        });
        const keys = Object.keys(this.fileNames);
        formData.append('names', JSON.stringify(this.fileNames));
        console.log(9991);
        this.api
            .post(`api/contestSections/${this.currentSection}/uploads`, formData)
            .subscribe(() => {
            this.fileList = [];
            this.loadImages();
        });
    }
    removeFile(name) {
        this.fileList = this.fileList.filter(file => file.name !== name);
    }
    handleChangeSection() {
        this.loadImages();
    }
    loadImages() {
        this.api
            .get(`api/contestSections/${this.currentSection}/files`)
            .subscribe(files => {
            this.files = files;
        });
    }
    removeImage(id) {
        this.api.delete(`api/contestSections/files/${id}`).subscribe(() => {
            this.files = this.files.filter(f => f.id !== id);
        });
    }
};
ContestApplicationComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
];
ContestApplicationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-contest-application',
        template: __webpack_require__(/*! raw-loader!./contest-application.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/user/contest-application/contest-application.component.html"),
        styles: [__webpack_require__(/*! ./contest-application.component.less */ "./src/app/features/user/contest-application/contest-application.component.less")]
    })
], ContestApplicationComponent);



/***/ }),

/***/ "./src/app/features/user/contest-applications/contest-applications.component.less":
/*!****************************************************************************************!*\
  !*** ./src/app/features/user/contest-applications/contest-applications.component.less ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user/contest-applications/contest-applications.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/features/user/contest-applications/contest-applications.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ContestApplicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContestApplicationsComponent", function() { return ContestApplicationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");




let ContestApplicationsComponent = class ContestApplicationsComponent {
    constructor(api, fb) {
        this.api = api;
        this.fb = fb;
        this.contestRegistrations = [];
        this.contests = [];
        this.isApplicationVisible = false;
        this.sectionForm = this.fb.group({
            sectionCount: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].max(1)]]
        });
    }
    ngOnInit() {
        this.api.get("api/contests").subscribe(contests => {
            this.contests = contests;
        });
    }
    applyForContest(contestId, sectionCount) {
        this.currentContestId = contestId;
        this.currentSectionCount = sectionCount;
        this.sectionForm = this.fb.group({
            sectionCount: [sectionCount, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].max(sectionCount)]]
        });
        this.isApplicationVisible = true;
    }
    handleCancelApplication() {
        this.isApplicationVisible = false;
    }
    handleOkApplication() {
        const payload = Object.assign({ contestId: this.currentContestId }, this.sectionForm.value);
        this.api.post("api/contestApplications", payload).subscribe(userContest => {
            const contest = this.contests.find(c => c.id === userContest.id);
            if (contest) {
                contest.regState = userContest.regState;
                contest.canApply = userContest.canApply;
                contest.canPostPhotos = userContest.canPostPhotos;
            }
            this.isApplicationVisible = false;
        });
    }
};
ContestApplicationsComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
];
ContestApplicationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-contest-applications',
        template: __webpack_require__(/*! raw-loader!./contest-applications.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/user/contest-applications/contest-applications.component.html"),
        styles: [__webpack_require__(/*! ./contest-applications.component.less */ "./src/app/features/user/contest-applications/contest-applications.component.less")]
    })
], ContestApplicationsComponent);



/***/ }),

/***/ "./src/app/features/user/jury/jury.component.less":
/*!********************************************************!*\
  !*** ./src/app/features/user/jury/jury.component.less ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".select {\n  margin-top: 10px;\n  width: 300px;\n}\n.images {\n  display: flex;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.images img {\n  width: 200px;\n  height: 200px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.thumb {\n  width: 150px;\n  height: 150px;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.thumb:last-child {\n  margin-right: 0px;\n}\n.thumb-wrap {\n  display: flex;\n  flex-direction: column;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  overflow: hidden;\n  max-width: 150px;\n}\n.thumb-wrap i {\n  cursor: pointer;\n}\n.file-name {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 150px;\n  display: inline-block;\n}\nnz-form-label {\n  line-height: 20px;\n}\n"

/***/ }),

/***/ "./src/app/features/user/jury/jury.component.ts":
/*!******************************************************!*\
  !*** ./src/app/features/user/jury/jury.component.ts ***!
  \******************************************************/
/*! exports provided: JuryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JuryComponent", function() { return JuryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");




let JuryComponent = class JuryComponent {
    constructor(api, translate) {
        this.api = api;
        this.translate = translate;
        this.contests = [];
        this.currentContestId = -1;
        this.currentSection = -1;
        this.sections = [];
        this.files = [];
        this.rates = {};
        this.isImageVisible = false;
        this.currentImage = '';
    }
    ngOnInit() {
        this.api.get('/api/contests').subscribe(contests => {
            this.contests = contests;
        });
        this.translate.onLangChange.subscribe((t) => {
            this.api
                .get(`api/contestSections/all/${this.currentContestId}/${this.translate.currentLang}`)
                .subscribe(sections => {
                this.sections = sections;
            });
        });
    }
    handleChangeContest() {
        this.currentContest = this.contests.find(c => c.id === this.currentContestId);
        this.api
            .get(`/api/contestSections/all/${this.currentContestId}/${this.translate.currentLang}`)
            .subscribe(sections => {
            this.sections = sections;
        });
    }
    handleChangeSection() {
        this.api
            .get(`/api/rates/${this.currentSection}`)
            .subscribe(files => {
            this.files = files;
        });
    }
    handleRateChange(rate, id) {
        this.api
            .post(`/api/rates/${id}`, { rate, contestId: this.currentContestId })
            .subscribe(() => { });
    }
    viewImage(image) {
        this.currentImage = image;
        this.isImageVisible = true;
    }
};
JuryComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"] }
];
JuryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-jury',
        template: __webpack_require__(/*! raw-loader!./jury.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/user/jury/jury.component.html"),
        styles: [__webpack_require__(/*! ./jury.component.less */ "./src/app/features/user/jury/jury.component.less")]
    })
], JuryComponent);



/***/ }),

/***/ "./src/app/features/user/layout/layout.component.less":
/*!************************************************************!*\
  !*** ./src/app/features/user/layout/layout.component.less ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user/layout/layout.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/features/user/layout/layout.component.ts ***!
  \**********************************************************/
/*! exports provided: UserLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserLayoutComponent", function() { return UserLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");



let UserLayoutComponent = class UserLayoutComponent {
    constructor(api) {
        this.api = api;
        this.menu = [];
    }
    ngOnInit() {
        this.api.get("/api/userMenu").subscribe(menu => {
            this.menu = menu;
        });
    }
};
UserLayoutComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
UserLayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-user-layout',
        template: __webpack_require__(/*! raw-loader!./layout.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/user/layout/layout.component.html"),
        styles: [__webpack_require__(/*! ./layout.component.less */ "./src/app/features/user/layout/layout.component.less")]
    })
], UserLayoutComponent);



/***/ }),

/***/ "./src/app/features/user/salones/salones.component.less":
/*!**************************************************************!*\
  !*** ./src/app/features/user/salones/salones.component.less ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/features/user/salones/salones.component.ts":
/*!************************************************************!*\
  !*** ./src/app/features/user/salones/salones.component.ts ***!
  \************************************************************/
/*! exports provided: UserSalonesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSalonesComponent", function() { return UserSalonesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let UserSalonesComponent = class UserSalonesComponent {
    constructor() { }
    ngOnInit() {
    }
};
UserSalonesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-salones',
        template: __webpack_require__(/*! raw-loader!./salones.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/user/salones/salones.component.html"),
        styles: [__webpack_require__(/*! ./salones.component.less */ "./src/app/features/user/salones/salones.component.less")]
    })
], UserSalonesComponent);



/***/ }),

/***/ "./src/app/features/user/short-list/short-list.component.less":
/*!********************************************************************!*\
  !*** ./src/app/features/user/short-list/short-list.component.less ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".select {\n  margin-top: 10px;\n  width: 300px;\n}\n.images {\n  display: flex;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.images img {\n  width: 200px;\n  height: 200px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.thumb {\n  width: 150px;\n  height: 150px;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.thumb:last-child {\n  margin-right: 0px;\n}\n.thumb-wrap {\n  display: flex;\n  flex-direction: column;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  overflow: hidden;\n  max-width: 150px;\n}\n.thumb-wrap i {\n  cursor: pointer;\n}\n.file-name {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 150px;\n  display: inline-block;\n}\nnz-form-label {\n  line-height: 20px;\n}\n"

/***/ }),

/***/ "./src/app/features/user/short-list/short-list.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/features/user/short-list/short-list.component.ts ***!
  \******************************************************************/
/*! exports provided: ShortListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShortListComponent", function() { return ShortListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/api.service */ "./src/app/core/services/api.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");




let ShortListComponent = class ShortListComponent {
    constructor(api, translate) {
        this.api = api;
        this.translate = translate;
        this.contests = [];
        this.currentContestId = -1;
        this.currentSection = 1;
        this.sections = [];
        this.files = [];
        this.isImageVisible = false;
        this.currentImage = '';
        this.awardsStacks = [];
    }
    ngOnInit() {
        this.api.get('/api/contests').subscribe(contests => {
            this.contests = contests;
        });
        this.translate.onLangChange.subscribe(() => {
            this.api
                .get(`api/contestSections/all/${this.currentContestId}/${this.translate.currentLang}`)
                .subscribe(sections => {
                this.sections = sections;
            });
        });
    }
    handleChangeContest() {
        this.currentContest = this.contests.find(c => c.id === this.currentContestId);
        this.api
            .get(`/api/contestSections/all/${this.currentContestId}/${this.translate.currentLang}`)
            .subscribe(sections => {
            this.sections = sections;
            if (sections.length > 0) {
                this.handleChangeSection();
            }
        });
        this.loadAwardsStacks();
    }
    loadAwardsStacks() {
        this.api
            .get(`api/awardsStacks/${this.currentContestId}`)
            .subscribe(awardsStacks => {
            this.awardsStacks = awardsStacks;
        });
    }
    handleChangeSection() {
        this.api
            .get(`/api/shortLists/${this.currentSection}`)
            .subscribe(files => {
            this.files = files;
        });
    }
    viewImage(image) {
        this.currentImage = image;
        this.isImageVisible = true;
    }
    handleAwardChange(file) {
        if (file.awardsStackId) {
            this.updateAward(file);
        }
        else {
            this.removeReward(file);
        }
    }
    updateAward(file) {
        this.api
            .put('/api/awardsStacks', {
            id: file.id,
            awardsStackId: file.awardsStackId
        })
            .subscribe(() => {
            this.loadAwardsStacks();
        });
    }
    removeReward(file) {
        this.api.delete(`/api/awardsStacks/${file.id}`).subscribe(() => {
            this.loadAwardsStacks();
        });
    }
};
ShortListComponent.ctorParameters = () => [
    { type: _core_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"] }
];
ShortListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-short-list',
        template: __webpack_require__(/*! raw-loader!./short-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/features/user/short-list/short-list.component.html"),
        styles: [__webpack_require__(/*! ./short-list.component.less */ "./src/app/features/user/short-list/short-list.component.less")]
    })
], ShortListComponent);



/***/ }),

/***/ "./src/app/features/user/user-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/features/user/user-routing.module.ts ***!
  \******************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _salones_salones_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./salones/salones.component */ "./src/app/features/user/salones/salones.component.ts");
/* harmony import */ var _contest_applications_contest_applications_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contest-applications/contest-applications.component */ "./src/app/features/user/contest-applications/contest-applications.component.ts");
/* harmony import */ var _contest_application_contest_application_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contest-application/contest-application.component */ "./src/app/features/user/contest-application/contest-application.component.ts");
/* harmony import */ var _jury_jury_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jury/jury.component */ "./src/app/features/user/jury/jury.component.ts");
/* harmony import */ var _short_list_short_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./short-list/short-list.component */ "./src/app/features/user/short-list/short-list.component.ts");








const routes = [
    {
        path: '',
        children: [
            {
                path: 'salones', component: _salones_salones_component__WEBPACK_IMPORTED_MODULE_3__["UserSalonesComponent"]
            },
            {
                path: 'applications/:id', component: _contest_application_contest_application_component__WEBPACK_IMPORTED_MODULE_5__["ContestApplicationComponent"]
            },
            {
                path: 'applications', component: _contest_applications_contest_applications_component__WEBPACK_IMPORTED_MODULE_4__["ContestApplicationsComponent"]
            },
            {
                path: 'jury', component: _jury_jury_component__WEBPACK_IMPORTED_MODULE_6__["JuryComponent"]
            },
            {
                path: 'shortList', component: _short_list_short_list_component__WEBPACK_IMPORTED_MODULE_7__["ShortListComponent"]
            }
        ]
    }
];
let UserRoutingModule = class UserRoutingModule {
};
UserRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], UserRoutingModule);



/***/ }),

/***/ "./src/app/features/user/user.module.ts":
/*!**********************************************!*\
  !*** ./src/app/features/user/user.module.ts ***!
  \**********************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _layout_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout/layout.component */ "./src/app/features/user/layout/layout.component.ts");
/* harmony import */ var _salones_salones_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./salones/salones.component */ "./src/app/features/user/salones/salones.component.ts");
/* harmony import */ var _user_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-routing.module */ "./src/app/features/user/user-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _contest_applications_contest_applications_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contest-applications/contest-applications.component */ "./src/app/features/user/contest-applications/contest-applications.component.ts");
/* harmony import */ var _contest_application_contest_application_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contest-application/contest-application.component */ "./src/app/features/user/contest-application/contest-application.component.ts");
/* harmony import */ var _jury_jury_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jury/jury.component */ "./src/app/features/user/jury/jury.component.ts");
/* harmony import */ var _short_list_short_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./short-list/short-list.component */ "./src/app/features/user/short-list/short-list.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_app_core_misc_translationLoader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/misc/translationLoader */ "./src/app/core/misc/translationLoader.ts");














let UserModule = class UserModule {
};
UserModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _layout_layout_component__WEBPACK_IMPORTED_MODULE_3__["UserLayoutComponent"],
            _salones_salones_component__WEBPACK_IMPORTED_MODULE_4__["UserSalonesComponent"],
            _contest_applications_contest_applications_component__WEBPACK_IMPORTED_MODULE_7__["ContestApplicationsComponent"],
            _contest_application_contest_application_component__WEBPACK_IMPORTED_MODULE_8__["ContestApplicationComponent"],
            _jury_jury_component__WEBPACK_IMPORTED_MODULE_9__["JuryComponent"],
            _short_list_short_list_component__WEBPACK_IMPORTED_MODULE_10__["ShortListComponent"]
        ],
        imports: [
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _user_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserRoutingModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateModule"].forChild({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateLoader"],
                    useFactory: src_app_core_misc_translationLoader__WEBPACK_IMPORTED_MODULE_13__["HttpLoaderFactory"],
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"]]
                }
            })
        ]
    })
], UserModule);



/***/ })

}]);