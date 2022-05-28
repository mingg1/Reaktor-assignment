import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import FileForm from './FileForm';
const Header = ({
  uploadedFileName,
  setUploadedFileName,
  setPackageList,
  isData,
}) => (
  <header>
    <Link to="/">
      <img src={logo} width="50" height="50" alt="logo" />
    </Link>
    <h3>poetry.lock parser</h3>
    {isData && (
      <FileForm
        isInHeader={true}
        uploadedFileName={uploadedFileName}
        setPackageList={setPackageList}
        setUploadedFileName={setUploadedFileName}
      />
    )}
  </header>
);

export default Header;
