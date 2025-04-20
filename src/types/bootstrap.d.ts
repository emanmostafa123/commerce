declare module 'bootstrap' {
    export class Toast {
      constructor(element: Element, options?: Partial<{
        animation: boolean;
        autohide: boolean;
        delay: number;
      }>);
  
      show(): void;
      hide(): void;
      dispose(): void;
    }
  }
  