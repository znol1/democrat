import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName:string): any {
    if(sName === ""){
      return value
    }
    const arr: any= [];
    for(let el in value) {
      let name: string= value[el].genre;
      if(name ==sName) {
        arr.push(value[el]);
      }
    }
    return arr;
  }
  }
