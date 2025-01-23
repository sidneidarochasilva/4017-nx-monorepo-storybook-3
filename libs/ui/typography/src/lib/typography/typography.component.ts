import { Size, Subtitle1Component, Subtitle2Component, H2Component, H1Component, H3Component, SpanComponent, H4Component, H5Component } from './dymanic.component';

import {
  Component,
  Input,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type Text =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'title5'
  | 'subtitle1'
  | 'subtitle2'
  | 'normal';

@Component({
  selector: 'ab-typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.css',
})
export class TypographyComponent implements OnInit {
  @Input() variant: Text = 'normal';
  @Input() size!: Size;

  @ViewChild('template', {
    static: true,
  })
  template!: TemplateRef<any>;

  dynamicComponentContent!: any[][];

  component: any;

  get inputs()  {
    return {
      size: this.size,
    };
  }

  private componentsMap = {
    title1: H1Component,
    title2: H2Component,
    title3: H3Component,
    title4: H4Component,
    title5: H5Component,
    subtitle1: Subtitle1Component,
    subtitle2: Subtitle2Component,
    normal: SpanComponent,
  } satisfies { [key in Text]: any };

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    if (!this.component) {
      this.component = this.componentsMap[this.variant];

      const templateContent = this.viewContainerRef.createEmbeddedView(
        this.template
      ).rootNodes;

      this.dynamicComponentContent = [templateContent];
    }
  }
}
