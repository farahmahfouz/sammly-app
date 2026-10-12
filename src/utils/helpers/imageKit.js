export function ikUrl(url, width) {
  if (!url || !url.includes("ik.imagekit.io")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}tr=w-${width},f-auto,q-80`;
}