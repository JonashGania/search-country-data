import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const Root = () => {
    return (
        <div className="font-inter bg-white dark:bg-black">
            <Header />
            <Outlet />
        </div>
    )  
}

export default Root