import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import Header from './components/Header';

const App = () => {
  const [packageList, setPackageList] = useState([]);
  return (
    <>
      <Header isData={packageList.length !== 0} />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home data={packageList} setPackageList={setPackageList} />}
        ></Route>
        <Route
          path="/:id"
          exact
          element={<Detail data={packageList} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
