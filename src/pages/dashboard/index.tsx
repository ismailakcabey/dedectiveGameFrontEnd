import { IUser } from "../../models/user"
import { LocalStorageUtils } from "../../utils/localstorage"
import { EKEYS } from "../../config"
import { Link } from "react-router-dom"

const DashBoard = () => {
    //@ts-ignore
    const user:IUser = LocalStorageUtils.getItem(EKEYS.userKey)
    return(
        <>
        <div className="flex items-center justify-center h-screen">
        <div className="container">
        
<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://cdn-icons-png.flaticon.com/128/3067/3067572.png" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Hoşgeldin Dedektif {user?.userName}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Hadi Vakaları Çözmeye Başlayalım</span>
        <Link to="/events">
        <div className="flex mt-4 space-x-3 md:mt-6">
            <a  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Olaylara Göz At</a>
        </div>
        </Link>
    </div>
</div>

        </div>
        </div>
        </>
    )
}

export default DashBoard