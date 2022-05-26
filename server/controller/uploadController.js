const separator = ' = ';
const doubleQuotesPattern = /^"|"$/g;

const removeDoubleQuotes = (text) => text.replace(doubleQuotesPattern, '');

const addDependencies = (packageArr, list) => {
  packageArr.forEach((line) => {
    if (line !== '[') {
      const dependency = line.split(separator)[0];
      list.push(dependency);
    }
  });
};

export const parsePoetry = (req, res) => {
  try {
    const poetryFile = req.file.buffer.toString('utf8');

    const rawPackageList = poetryFile
      .trim()
      .split('[[package]]\n')
      .filter((pkg) => pkg)
      .map((pkg) =>
        pkg
          .trim()
          .split('\n\n')
          .map((section) => section.split('\n'))
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
