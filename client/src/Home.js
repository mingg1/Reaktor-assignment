import { React, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FileForm from './components/FileForm';
const Home = ({
  data,
  setPackageList,
  uploadedFileName,
  setUploadedFileName,
}) => {
  return (
    <main>
      {!data.length ? (
        <section>
          <h1 className="instruction">Welcome to Poetry.lock parser!</h1>
          <h3 className="instruction">
            Add <mark>poetry.lock</mark> file to see the list of packages 🗂
          </h3>
          <FileForm
            uploadedFileName={uploadedFileName}
            setPackageList={setPackageList}
            setUploadedFileName={setUploadedFileName}
          />
        </section>
      ) : (
        <section>
          <h3>🗂 {uploadedFileName}</h3>
          <h1>Packages ({data.length})</h1>
          <ul>
            {data.map((pkg) => (
              <li key={pkg.id} style={{ display: 'flex' }}>
                <Link to={`/${pkg.id}`}>{pkg.name}</Link>
                <hr />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Home;
