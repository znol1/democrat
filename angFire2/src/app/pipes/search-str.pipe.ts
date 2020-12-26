import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchStr'
})
export class SearchStrPipe implements PipeTransform {

  transform(value: any, sName:string): any {
    if(sName === ""){
      return value
    }
    const arr: any= [];
    for(let el in value) {
      let name: string= value[el].address.toLowerCase();
      if(name.startsWith(sName)) {
        arr.push(value[el]);
      }
    }
    return arr;
  }

}
