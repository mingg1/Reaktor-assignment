import { React, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
const Home = ({ data, setPackageList }) => {
  //   const [packageList, setPackageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
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
    // if (selectedFile.keys().length === 0) return alert('choose a file!');
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
    <div>
      {!data.length ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="poetry">
            Add poetry.lock file to see the list of packages!
          </label>
          <input
            ref={fileRef}
            type="file"
            name="poetry"
            id="poetry"
            accept=".lock"
            onChange={handleSelectedChange}
            required
          />
          <button type="submit">Show package list</button>
        </form>
      ) : (
        data.map((pkg, i) => (
          <div key={pkg.id} style={{ display: 'flex' }}>
            <Link to={`/${pkg.id}`}>{pkg.name}</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
