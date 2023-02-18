export default function isContentful(string: string | undefined) {
  return string ? string.replace(/(\s|\t|\n)/g, "") !== "" : false
}
