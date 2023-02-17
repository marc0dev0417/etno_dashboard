import { observer } from "mobx-react-lite"
import TourismStore from "../../../viewmodels/tourism/TourismStore"
import "../../../index.css"
import { ToastContainer } from "react-toastify"
const tourismStore = TourismStore.getTourismStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableTourism = (prop: PropTable) => {
    const deleteTourism = async (event: string) => {
        await tourismStore.deleteTourism('Bolea', event)
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase  bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        {prop.headerList.map((item, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tourismStore.getPaginatedTourism.content?.map((tourism, index) => (
                        tourismStore.getPaginatedTourism.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                            <div className="tableCamp">
                                {tourism.type}
                                </div>
                            </th>
                            <td className="px-6 py-4">
                            <div className="tableCamp">
                                {tourism.title}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                            <div className="tableCamp overflow-y-auto items-start min-w-full">
                                {tourism.description}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                            <div className="h-20 flex items-center justify-center">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteTourism(tourism.title!!)}>Eliminar</a>
                           </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    )
}

export default observer(TableTourism)