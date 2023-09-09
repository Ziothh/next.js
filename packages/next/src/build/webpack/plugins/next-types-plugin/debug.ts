export namespace dev {
  export const debug = (...params: Parameters<typeof console.debug>) =>
    console.debug('\n\n\n\n\n\n\nDEBUG:', ...params, '\n\n\n\n\n\n\n')
}
