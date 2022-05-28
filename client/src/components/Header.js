import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
const Header = ({ file, handleSubmit, isData }) => (
  <header>
    <Link to="/">
      <img src={logo} width="50" height="50" />
    </Link>
    <h3>poetry.lock parser</h3>
    <h5>{file?.name}</h5>
    {isData && (
      <form>
        <label>
          <input
            type="file"
            name="poetry"
            id="poetry"
            accept=".lock"
            onSubmit={handleSubmit}
            required
          />
        </label>
        <button type="submit">Upload</button>
      </form>
    )}
  </header>
);

export default Header;
