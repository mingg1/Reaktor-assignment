import { React, useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

const Detail = ({ data }) => {
  const { id } = useParams();
  const currentPackage = data.find((pkg) => pkg.id === +id);
  //const [reverseDependency, setReverseDependency] = useState([]);

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

  return (
    <div>
      <Link to={'/'}>back</Link>
      <h1>{currentPackage?.name}</h1>
      <h3>Description</h3>
      {currentPackage?.description}
      <h3>Dependencies ({currentPackage?.dependency?.length || 0})</h3>
      {currentPackage?.dependency?.map((dep) => {
        const depId = data.find((pkg) => pkg.name === dep).id;
        console.log(depId);
        return <Link to={`/${depId}`}>{dep}</Link>;
      })}
      <h3>Reverse dependencies</h3>
      {getReverseDependencies(currentPackage.name).map((dep) => {
        return <Link to={`/${dep.id}`}>{dep.name}</Link>;
      })}
      <h3>Optional dependencies</h3>
      {currentPackage?.extra_dependency?.map((dep, i) => (
        <p key={i}>{dep}</p>
      ))}
    </div>
  );
};

export default Detail;
