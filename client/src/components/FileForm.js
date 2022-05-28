import { useRef, React, useState } from 'react';

const FileForm = ({
  uploadedFileName,
  setPackageList,
  setUploadedFileName,
  isInHeader,
}) => {
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
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const resJson = await res.json();

      if (resJson.error) {
        return alert(resJson.error);
      }

      setPackageList(sortPackageList(resJson.packages));
      setUploadedFileName(selectedFile.name);
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
    <div className={`form-container ${isInHeader ? 'header' : ''}`}>
      <h5>{selectedFile?.name || uploadedFileName || 'no file selected'}</h5>
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
  );
};

export default FileForm;
