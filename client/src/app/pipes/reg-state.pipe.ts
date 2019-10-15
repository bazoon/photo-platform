import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regState'
})
export class RegStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
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

}
