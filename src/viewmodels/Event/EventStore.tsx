import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Event, PaginatedEvent } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class EventStore {
    static eventStore: EventStore
    serverIp: string = "192.168.241.51"

    static getEventStore() {
        if (this.eventStore === undefined) {
            this.eventStore = new EventStore()
        }
        return this.eventStore
    }

    //Observables =>
    paginatedEvent: PaginatedEvent = {}
    event: Event = {}
    modalCreate: boolean = false
    modalEdit: boolean = false
    modalSubs: boolean = false

    constructor() {
        makeObservable(this, {
            modalEdit: observable,
            modalCreate: observable,
            modalSubs: observable,
            setModalCreate: action,
            setModalSubs: action,
            getModalEdit: computed,
            getModalCreate: computed,
            paginatedEvent: observable,
            event: observable,
            getRequestEvents: action,
            updatePaginatedEvents: action,
            updateEventList: action,
            editEvent: action,
            updateEvent: action,
            deleteEvent: action,
            getPaginatedEvents: computed,
            getEvent: computed,
            getModalSubs: computed
        })
    }
    setModalSubs(mode: boolean) {
        this.modalSubs = mode
    }
    get getModalSubs() {
        return this.modalSubs
    }
    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
    }

    async addRequestEvent(locality: string, event: Event, file: File) {
        await imageStore.addImageAPI('Bolea', 'evento', 'evento', file!!)
        event.imageUrl = imageStore.getImage.link
        const response = await fetch(`http://${this.serverIp}:8080/users/add/event?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (response.ok) {
            this.paginatedEvent.content?.push(event)
            this.event = event
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toast.error('No se ha añadido correctamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }

    async editEvent(locality: string, eventId: string, event: Event, file: File) {
        if (file !== undefined) {
            await imageStore.addImageAPI('Bolea', 'anuncio', 'anuncio', file!!)
            event.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`http://${this.serverIp}:8080/users/update/event?username=${locality}&eventId=${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        if (response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toast.error('No se ha actualizado', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        }
    }

    async getRequestEvents(locality: string, pageNum: number, elementSize: number) {
        const response = await fetch(`http://${this.serverIp}:8080/events?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET'
        })
        const events = await response.json()
        this.updatePaginatedEvents(events)
    }

    updatePaginatedEvents(paginatedEvents: PaginatedEvent) {
        this.paginatedEvent = paginatedEvents
    }
    updateEventList(events: Event[]) {
        this.paginatedEvent.content = events
    }
    updateEvent(event: Event) {
        this.event = event
    }

    get getPaginatedEvents() {
        return this.paginatedEvent
    }
    get getEvent() {
        return this.event
    }

    async deleteEvent(username: string, title: string) {
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/event?username=${username}&title=${title}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        if (response.ok) {
            const newPaginatedEvents = this.paginatedEvent.content!!.filter((item) => item.title !== title)
            this.updateEventList(newPaginatedEvents)
            this.updateEvent({})
            toast.success('Se ha eliminado exitosamente', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error('No se ha eliminado exitosamente', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }
}
export default EventStore