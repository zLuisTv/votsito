declare module '@mojs/core' {
  export class CustomShape {
    then(...args: unknown[]): this;
    tune(options: Record<string, unknown>): this;
    replay(): this;
    play(): this;
    pause(): this;
    stop(): this;
  }

  export class Shape extends CustomShape {
    constructor(options?: Record<string, unknown>);
  }

  export class Burst extends CustomShape {
    constructor(options?: Record<string, unknown>);
  }

  export class Html extends CustomShape {
    constructor(options?: Record<string, unknown>);
  }

  export class Timeline {
    add(...animations: CustomShape[]): this;
    play(): this;
    replay(): this;
  }

  export namespace easing {
    function path(path: string): (progress: number) => number;
  }

  export function addShape(name: string, shape: typeof CustomShape): void;
}
