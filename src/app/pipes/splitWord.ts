import { Pipe, PipeTransform  } from '@angular/core';



// split a word based on camelCase

@Pipe({name:'splitWord'}) 
export class SplitWord implements PipeTransform {
    transform(value: string): string { 
        console.log(value.replace(/([A-Z])/g, ' $1'))
     return value ? value.replace(/([A-Z])/g, ' $1') : value;
    }

}