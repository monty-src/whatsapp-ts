import React from "react";
import { BaseComponent } from "./component.models";

type Elements = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export class SidebarModel extends BaseComponent {
  readonly _title: string;

  constructor() {
    super();
    this._title = "Sidebar";
  }
}
