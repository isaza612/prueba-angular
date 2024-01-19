import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString',
  standalone: true
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (value.length > length)
      return value.slice(0, length) + "...";
    else
      return value;
  }

}
