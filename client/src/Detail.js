import { React } from 'react';
import { Link, useParams } from 'react-router-dom';
import PackageInfo from './components/PackageInfo';

const Detail = ({ data }) => {
  const { id } = useParams();
  const currentPackage = data.find((pkg) => pkg.id === +id);

  const getReverseDependencies = (pkgName) => {
    return data.reduce((acc, cur, index) => {
      if (cur.dependency) {
        cur.dependency.forEach((element) => {
          if (element === pkgName) {
            acc.push({ id: index + 1, name: cur.name });
          }
        });
      }
      if (cur.extra_dependency) {
        cur.extra_dependency.forEach((element) => {
          if (element === pkgName) {
            acc.push({ id: index + 1, name: cur.name });
          }
        });
      }
      return acc;
    }, []);
  };

  const getDependencyId = (pkgName) => {
    return data.find((pkg) => pkg.name === pkgName)?.id;
  };

  return (
    <main>
      <section>
        <Link to={'/'}>back</Link>
        <h1>{currentPackage?.name}</h1>
        <hr />
        <PackageInfo title="Description">
          <p>{currentPackage?.description}</p>
        </PackageInfo>
        <PackageInfo
          title={`Dependencies (${currentPackage?.dependency?.length || 0})`}
          dependencies={currentPackage?.dependency}
          getDependencyId={getDependencyId}
        />
        <PackageInfo
          title={`Reverse Dependencies (${
            getReverseDependencies(currentPackage?.name).length || 0
          })`}
          dependencies={getReverseDependencies(currentPackage?.name)}
        />
        <PackageInfo
          title={`Optional Dependencies (${
            currentPackage?.extra_dependency?.length || 0
          })`}
          dependencies={currentPackage?.extra_dependency}
          getDependencyId={getDependencyId}
        />
      </section>
    </main>
  );
};

export default Detail;
