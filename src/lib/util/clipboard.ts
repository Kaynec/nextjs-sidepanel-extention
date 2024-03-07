export function copyToClipBoard (text) {
  navigator.clipboard.writeText(text)
  alert('Copied: ' + text)
}
