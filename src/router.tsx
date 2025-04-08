import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/error";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage error={new Error("An error occurred")} reset={() => window.location.reload()} />,
    }
])