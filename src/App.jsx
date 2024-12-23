import Header from "./components/Header/Header";
import AppRoutes from "./AppRoutes";
import { Loading } from "./components/Loading/Loading";
import { useLoading } from "./Hooks/useLoading";
import setLoadingInterceptor from './Interceptors/LoadingInterceptors'
import { useEffect } from "react";
function App() {
  const {showLoading, hideLoading} = useLoading();
  useEffect(()=> {
    setLoadingInterceptor({showLoading, hideLoading});
  },[]);
  return (
    <>
      <Loading />
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
