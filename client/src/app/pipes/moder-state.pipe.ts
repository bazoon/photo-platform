import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moderState'
})
export class ModerStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 0:
        return "не модерирована";
      case 1:
        return "Одобрен";
      case 2:
        return "Запрещен";
    }
  }
}
