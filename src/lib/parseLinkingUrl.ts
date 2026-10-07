export function parseLinkingUrl(url: string): URL {
  /*
   * Hack: add a third slash to orbis:// urls so that `URL.host` is empty and
   * `URL.pathname` has the full path.
   */
  if (url.startsWith('orbis://') && !url.startsWith('orbis:///')) {
    url = url.replace('orbis://', 'orbis:///')
  }
  return new URL(url)
}
