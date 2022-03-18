export class EventHelper {
  static on(obj: HTMLElement | Document, events: string, fn: any): void {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        EventHelper.on(obj[i], events, fn);
      }
    } else {
      events.split(' ').forEach((x) => {
        obj.addEventListener(x, fn);
      });
    }
  }

  static off(obj: HTMLElement | Document, events: string, fn: any): void {
    events.split(' ').forEach((x) => {
      obj.removeEventListener(x, fn);
    });
  }
}
