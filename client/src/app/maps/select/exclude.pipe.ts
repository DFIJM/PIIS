import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'exclude' })
export class ExcludePipe implements PipeTransform {
  transform(array: any[], nameToExclude: string): any[] {
    return array.filter(({ name }) => name != nameToExclude);
  }
}
