import { PoetryLockParser } from '../util/lockParser.js';

export const parsePoetry = (req, res) => {
  try {
    const poetryFile = req.file.buffer.toString('utf8');
    // divide the file into packages section and metadata section
    const splittedPoetry = poetryFile.trim().split('\n[metadata]');

    const lockVersion = splittedPoetry[1]
      .trim()
      .split('\n')[0]
      .split(PoetryLockParser.separator)[1];

    if (!PoetryLockParser.checkVersion(lockVersion))
      return res.json({
        error: `not targeted version (${PoetryLockParser.targetVersion})! (uploaded file: ${lockVersion})`,
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
          PoetryLockParser.addDependencies(section, extraDependencyList);
          packageObj['extra_dependency'] = extraDependencyList;
        } else if (section.includes('[package.dependencies]')) {
          PoetryLockParser.addDependencies(section, dependencyList);
          packageObj['dependency'] = dependencyList;
        } else {
          section.forEach((line) => {
            const keyVal = line.split(PoetryLockParser.separator);
            const key = keyVal[0].trim();
            const value = PoetryLockParser.removeDoubleQuotes(keyVal[1]);
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
