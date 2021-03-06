export class PoetryLockParser {
  static #separator = ' = ';
  static #targetVersion = 1.1;
  static #doubleQuotesPattern = /^"|"$/g;

  static get separator() {
    return PoetryLockParser.#separator;
  }

  static get targetVersion() {
    return PoetryLockParser.#targetVersion;
  }

  static removeDoubleQuotes = (text) =>
    text.replace(this.#doubleQuotesPattern, '');

  static checkVersion = (versionText) => {
    const version = parseFloat(this.removeDoubleQuotes(versionText));
    return version === this.#targetVersion;
  };

  static addDependencies = (packageArr, list) => {
    packageArr.forEach((line) => {
      if (['[', ']', '{', '}'].indexOf(line.trim()[0]) === -1) {
        const dependency = this.removeDoubleQuotes(
          line.split(this.#separator)[0]
        );
        list.push(dependency);
      }
    });
  };
}
