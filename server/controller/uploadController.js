const separator = ' = ';
const doubleQuotesPattern = /^"|"$/g;
const targetVersion = 1.1;

const removeDoubleQuotes = (text) => text.replace(doubleQuotesPattern, '');

const checkVersion = (versionText) => {
  const version = parseFloat(removeDoubleQuotes(versionText));
  return version === targetVersion;
};

const addDependencies = (packageArr, list) => {
  packageArr.forEach((line) => {
    if (line[0] !== '[') {
      const dependency = line.split(separator)[0];
      list.push(dependency);
    }
  });
};

export const parsePoetry = (req, res) => {
  try {
    const poetryFile = req.file.buffer.toString('utf8');
    // divide the file into packages section and metadata section
    const splittedPoetry = poetryFile.trim().split('\n[metadata]');

    const lockVersion = splittedPoetry[1]
      .trim()
      .split('\n')[0]
      .split(separator)[1];

    if (!checkVersion(lockVersion))
      return res.json({
        error: `not targeted version (${targetVersion})! (uploaded file: ${lockVersion})`,
        packages: null,
      });

    const rawPackageList = splittedPoetry[0]
      .trim()
      .split('[[package]]\n')
      .filter((p) => p)
      .map((i) =>
        i
          .trim()
          .split('\n\n')
          .map((d) => d.split('\n'))
      );

    const packageList = rawPackageList.reduce((list, pkg, index) => {
      const packageObj = new Object();
      const extraDependencyList = [];
      const dependencyList = [];

      pkg.forEach((section) => {
        packageObj['id'] = index + 1;
        if (section.includes('[package.extras]')) {
          addDependencies(section, extraDependencyList);
          packageObj['extra_dependency'] = extraDependencyList;
        } else if (section.includes('[package.dependencies]')) {
          addDependencies(section, dependencyList);
          packageObj['dependency'] = dependencyList;
        } else {
          section.forEach((line) => {
            const keyVal = line.split(separator);
            const key = keyVal[0].trim();
            const value = removeDoubleQuotes(keyVal[1]);
            packageObj[key] = value;
          });
        }
      });

      return [...list, packageObj];
    }, []);

    return res.json({ error: null, packages: packageList });
  } catch (error) {
    return res.json({ error: error.message, packages: null });
  }
};
