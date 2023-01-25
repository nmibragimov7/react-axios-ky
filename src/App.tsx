import React, {Suspense} from "react"
import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import Header from "./layout/Header";
import Main from "./pages/Main";
import AxiosModify from "./pages/AxiosModify";
import AxiosConfig from "./pages/AxiosConfig";
import Ky from "./pages/Ky";
import Fallback from "./components/Fallback";
import BaseToasts from "./components/base/BaseToasts/BaseToasts";

const App: React.FC = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <>
            <Route
                path={"/"}
                element={<Header />}
            >
                <Route index element={<Main />} />
                <Route path={"axios-modify"} element={<AxiosModify />}  />
                <Route path={"axios-config"} element={<AxiosConfig />}  />
                <Route path={"ky"} element={<Ky />}  />
                <Route path={"*"} element={<Main />} />
            </Route>
        </>
    ));

    return (
        <>
            <Suspense fallback={<Fallback />}>
                <RouterProvider router={router}/>
                <BaseToasts />
            </Suspense>
        </>
    )
}

export default App;
