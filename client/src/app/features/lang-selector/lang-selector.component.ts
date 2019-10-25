import { Component, OnInit } from '@angular/core';
import { en_US, ru_RU, NzI18nService } from 'ng-zorro-antd/i18n';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.less']
})
export class LangSelectorComponent {

  constructor(private i18n: NzI18nService, private translate: TranslateService) {

  }


  changeLanguage(locale: string) {
    switch (locale) {
      case 'en': {
        this.i18n.setLocale(en_US);
        break;
      }
      case 'ru': {
        this.i18n.setLocale(ru_RU);
        break;
      }
    }
    
    this.translate.use(locale);
  }

}
