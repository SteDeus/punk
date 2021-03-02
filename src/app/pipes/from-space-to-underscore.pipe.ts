import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromSpaceToUnderscore'
})
export class FromSpaceToUnderscorePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(" ", "_");
  }

}
