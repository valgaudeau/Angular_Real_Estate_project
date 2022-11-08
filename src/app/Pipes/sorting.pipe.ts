import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  // See https://stackoverflow.com/questions/63390812/angular-orderby-pipe
  // Made the second argument an array so we can receive multiple arguments. The first argument is the field we're sorting, and the second argument at index 1 here is the sorting direction.
  transform(array: any, args: any[]): any[] {
    const sortingField = args[0];
    const sortDirection = args[1];

    if(sortDirection =='asc') {
      array.sort((a: any, b: any) => {
        if (a[sortingField] < b[sortingField]) {
          return -1;
        } else if (a[sortingField] > b[sortingField]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if(sortDirection =='desc') {
      array.sort((a: any, b: any) => {
        if (a[sortingField] < b[sortingField]) {
          return 1;
        } else if (a[sortingField] > b[sortingField]) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    return array;
  }

}
