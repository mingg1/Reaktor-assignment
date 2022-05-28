import { React, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
const Home = ({ data, setPackageList }) => {
  //   const [packageList, setPackageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  const sortPackageList = (list) => {
    return list.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      else return 0;
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!selectedFile) return alert('Choose a file first!');
    const formData = new FormData();
    formData.append('poetry', selectedFile);
    try {
      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });
      const resJson = await res.json();

      if (resJson.error) {
        return alert(resJson.error);
      }
      setPackageList(sortPackageList(resJson.packages));
      fileRef.current.value = '';
    } catch (err) {
      console.error(err);
      fileRef.current.value = '';
      return alert(err);
    }
  };

  const handleSelectedChange = (evt) => {
    setSelectedFile(evt.target.files[0]);
  };

  return (
    <main>
      {!data.length ? (
        <section>
          <h1 className="instruction">Welcome to Poetry.lock parser!</h1>
          <h3 className="instruction">
            Add <mark>poetry.lock</mark> file to see the list of packages 📂
          </h3>
          <div className="form-container">
            <h5>{selectedFile?.name || 'no file selected'}</h5>
            <form onSubmit={handleSubmit} className="main-form">
              <label htmlFor="poetry">Browse</label>
              <input
                ref={fileRef}
                type="file"
                name="poetry"
                id="poetry"
                accept=".lock"
                onChange={handleSelectedChange}
              />
              <button type="submit">Show package list</button>
            </form>
          </div>
        </section>
      ) : (
        <section>
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
