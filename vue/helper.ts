export class EventHelper {
  static on(obj: HTMLElement | Document, events: string, fn: any): void {
    events.split(' ').forEach((x) => {
      obj.addEventListener(x, fn);
    });
  }

  static off(obj: HTMLElement | Document, events: string, fn: any): void {
    events.split(' ').forEach((x) => {
      obj.removeEventListener(x, fn);
    });
  }
}
