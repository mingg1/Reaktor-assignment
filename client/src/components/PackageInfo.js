import { Link } from 'react-router-dom';

const PackageInfo = ({ title, children, dependencies, getDependencyId }) => {
  return (
    <article>
      <h3>{title}</h3>
      {children}
      {dependencies && (
        <ul className="dependencies">
          {dependencies?.map((pkg) => (
            <li key={pkg.id || getDependencyId(pkg)}>
              {pkg.id || getDependencyId(pkg) ? (
                <Link to={`/${pkg.id || getDependencyId(pkg)}`}>
                  {pkg.name || pkg}
                </Link>
              ) : (
                pkg
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
export default PackageInfo;
