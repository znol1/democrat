import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rate'
})
export class RatePipe implements PipeTransform {
  

  transform(value: any, sName:boolean): any {
    if (sName){
      function compare( a, b ) {
        if ( a.mark < b.mark){
          return -1;
        }
        if ( a.mark > b.mark ){
          return 1;
        }
        return 0;
      }
      const arr = value.sort( compare );
      return arr;
    } else {
      function compare( a, b ) {
        if ( a.mark < b.mark){
          return 1;
        }
        if ( a.mark > b.mark ){
          return -1;
        }
        return 0;
      }
      const arr = value.sort( compare );
      return arr;
    }
  }

}
