import { observer } from 'mobx-react-lite'
import { Event } from '../../../models/section/Section'
import EventStore from "../../../viewmodels/Event/EventStore"
import EditEvent from './create/EditEvent'
import SubscribersList from './create/SubscribersList'
const eventStore = EventStore.getEventStore()

interface PropTable {
    headerList: string[],
    list?: Event[],
    currentPage?: number
}

const TableEvent = (prop: PropTable) => {

    const deleteEvent = async (event: string) => {
        await eventStore.deleteEvent('Bolea', event)
    }
    function showParticipants(event: Event) {
        eventStore.setModalSubs(true)
        eventStore.updateEvent(event)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {eventStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-start">
                                <EditEvent />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {eventStore.getModalSubs ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-start">
                                <SubscribersList headerList={['Título', 'Plazas', 'Nombre', 'Email', 'Teléfono', 'Precio', 'Suscripcion', 'Acciones']}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <tr>
                            {prop.headerList.map((item, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    <div className="min-w-max">
                                        {item}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {eventStore.getPaginatedEvents.content?.map((eventMap, index) => (
                            eventStore.getPaginatedEvents.content!!.length > 0 &&
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    <div className="tableCamp">
                                        {eventMap.title}
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <div className="tableCamp overflow-y-auto  min-w-full">
                                        {eventMap.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="tableCamp">
                                        {eventMap.hasSubscription ? "Evento de pago" : "Evento gratuito"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="tableCamp">
                                        {eventMap.reservePrice + " €"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="tableCamp">
                                        {eventMap.seats}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="tableCamp">
                                        {eventMap.capacity}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="tableCamp">
                                        {eventMap.username}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className="tableCamp">
                                        {eventMap.address}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="tableCamp">
                                        {eventMap.organization}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    <div className='h-20 flex items-center justify-center'>
                                        {eventMap.hasSubscription ? (
                                            <a href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline mr-2" onClick={() => {
                                                showParticipants(eventMap)
                                            }}>Participantes</a>
                                        ) : <></>}
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2" onClick={() => {
                                            eventStore.updateEvent(eventMap)
                                            eventStore.setModalEdit(true)
                                        }}>Editar</a>
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteEvent(eventMap.title!!)}>Eliminar</a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default observer(TableEvent)


