export abstract class BaseApiService {

  constructor(protected readonly component: string) {}

  protected getUrl(path: string): string {
    if (this.component.endsWith('/') && path.startsWith('/')) {
      return this.component + path.substr(1, path.length);
    }

    if (!this.component.endsWith('/') && !path.startsWith('/')) {
      return `${this.component}/${path}`;
    }

    return this.component + path;
  }
}
