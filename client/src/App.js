import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/SingleProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route
              path="/productlist/singleproduct"
              element={<SingleProduct />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
