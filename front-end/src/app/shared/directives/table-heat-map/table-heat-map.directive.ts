import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';

import { readableColor, toHex, hsla, parseToHsla } from 'color2k';

@Directive({
  selector: '[tableHeatMapCell]',
})
export class TableHeatMapCellDirective {
  @Input('tableHeatMapCell')
  tableHeatMap = 0;

  @Input('id') colId: number | string | null = null;

  constructor(public el: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[tableHeatMapColumn]',
})
export class TableHeatMapColumnDirective {
  @Input('id') colId: number | string | null = null;

  @Input('tableHeatMapColumn')
  options = {};
}

@Directive({
  selector: '[tableHeatMap]',
})
export class TableHeatMapDirective implements AfterViewInit {
  @ContentChildren(TableHeatMapCellDirective, { descendants: true }) tableHeatMapCells: QueryList<TableHeatMapCellDirective> | undefined;
  @ContentChildren(TableHeatMapColumnDirective, { descendants: true }) tableHeatMapColumns: QueryList<TableHeatMapColumnDirective> | undefined;

  highestValues: any = {};
  cells: TableHeatMapCellDirective[] = [];
  columns: TableHeatMapColumnDirective[] = [];
  config: any = {};

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.tableHeatMapCells) {
        this.cells = this.tableHeatMapCells.toArray();
      }
  
      if (this.tableHeatMapColumns) {
        this.columns = this.tableHeatMapColumns.toArray();
      }
  
      this.setOptions();
      this.calculateHighestValues();
      this.applyHeatMap();
    }, 1000);
  }

  private setOptions() {
    this.columns.forEach((col: any) => {
      this.config = {
        ...this.config,
        [col.colId]: col.options,
      };
    });
  }

  private calculateHighestValues() {
    return this.cells.forEach((cell: any) => {
      if (!Object.prototype.hasOwnProperty.call(this.highestValues, cell.colId)) {
        this.highestValues[cell.colId] = 0;
      }

      if (+cell.tableHeatMap > this.highestValues?.[cell.colId])
        this.highestValues[cell.colId] = +cell.tableHeatMap;
    });
  }

  private applyHeatMap() {
    this.cells.forEach((cell: any) => {
      const { bgColor, color } = this.getColor(cell.colId, cell.tableHeatMap);
      if (bgColor) cell.el.nativeElement.style.backgroundColor = bgColor;
      if (color) cell.el.nativeElement.style.color = color;
    });
  }

  private getColor(id: string, value: number) {
    if (value) {
      const color = this.config[id].color;
      let textColor = null;
      let bgColor = null;
      if (color != null) {
        const [h, s, l, a] = parseToHsla(color);
        const maxLightness = 1 - l;
        const percentage = (value * maxLightness) / this.highestValues[id];
        const lightness = +percentage.toFixed(3);
        bgColor = hsla(h, s, 1 - lightness, a);
        textColor = readableColor(bgColor);
      }
      return {
        bgColor,
        color: textColor,
      };
    } 
    return {
      bgColor: '#fff',
      color: '#000'
    }
  }
}
