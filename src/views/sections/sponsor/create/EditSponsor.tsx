import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import logoEtno from '../../../../assets/logo_etno.png'
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"
import { Sponsor } from '../../../../models/section/Section';
import HoverSectionStore from '../../../../viewmodels/hoverSection/HoverSectionStore';
import SideBarStore from '../../../../viewmodels/sidebar/SideBarStore';
import SposnsorStore from '../../../../viewmodels/sponsor/SponsorStore';

const sideBarStore = SideBarStore.getSideBarStore()
const hoverSectionStore = HoverSectionStore.getHoverSectionStore()
const sponsorStore = SposnsorStore.getSponsorStore()

const EditSponsor = () => {

    const [sponsor] = useState(sponsorStore.getSponsor)
    const inputRef = useRef<HTMLInputElement>(null)
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)

    const [sponsorTitle, setSponsorTitle] = useState<string>(sponsor.title!!)
    const [sponsorDescription, setSponsorDescription] = useState<string>(sponsor.description!!)
    const [sponsorTel, setSponsorTel] = useState<string>(sponsor.phone!!)
    const [file, setFile] = useState<File>()
    const [emptyName, setEmptyName] = useState<boolean>(false)
    const [emptyTel, setEmptyTel] = useState<boolean>(false)
    const [emptyDescption, setEmptyDescription] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    function updateSponsor(sponsorId: string) {
        chekIfEmpty()
        if (sponsorTitle === "" || sponsorDescription === "" || sponsorTel === "" || sponsorTel.length < 9
        ) {
            toast.error('Rellene los campos', {
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
            const newSponsor: Sponsor = {
                title: sponsorTitle,
                description: sponsorDescription,
                phone: sponsorTel,
            }
            sponsorStore.editSponsor('Bolea', sponsorId, newSponsor, file!!)
            sideBarStore.updateSection('Patrocinadores')
            hoverSectionStore.setName('Patrocinadores')
        }
    }

    function chekIfEmpty() {
        sponsorTitle === "" ? setEmptyName(true) : setEmptyName(false)
        sponsorTel === "" ? setEmptyTel(true) : setEmptyTel(false)
        sponsorTel.length < 9 ? setEmptyTel(true) : setEmptyTel(false)
        sponsorDescription === "" ? setEmptyDescription(true) : setEmptyDescription(false)
    }

    return (
        <div className="flex flex-col lg:m-auto lg:w-1/2 w-11/12 lg:h-screen border-2 rounded-md bg-white">
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro que quiere abandonar la pagina?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => sponsorStore.setModalEdit(false)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <div>
                <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
                    <div className="w-full flex flex-row p-2 justify-between">
                        <img src={logoEtno} alt="logo_Etno"></img>
                        <p className='flex  text-white lg:text-3xl text-xl  p-3 uppercase'>Editar PATROCINADOR</p>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-5 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <input autoFocus placeholder=" " defaultValue={sponsor.title} name="sponsorTitle" type="text" className={`inputCamp peer ${emptyName ? 'border-red-600'
                            : ''
                            }`} onChange={(e) => {
                                setSponsorTitle(e.currentTarget.value)
                                setEmptyName(false)
                            }} onKeyUp={(e) => {
                                if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                    if (txtAreaRef.current != null) {
                                        txtAreaRef.current.focus()
                                    }
                                }
                            }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}/>
                        <label className={"labelFloatInput"}>Título</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="flex flex-col p-1 relative">
                        <textarea ref={txtAreaRef} placeholder=" " defaultValue={sponsor.description} name="sponsorDescription" rows={3}
                            className={`inputCamp peer ${emptyDescption ? 'border-red-600'
                                : ''
                                }`} onChange={(e) => {
                                    setSponsorDescription(e.currentTarget.value)
                                    setEmptyDescription(false)
                                }} onKeyUp={(e) => {
                                    if ((e.code === "NumpadEnter")) {
                                        if (inputRef.current != null) {
                                            inputRef.current.focus()
                                        }
                                    }
                                }} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/^\s+/g, '')}/>
                        <label className={"labelFloatTxtArea"}>Descripción</label>
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3 ">
                    <div className="flex flex-col p-1 relative">
                        <input ref={inputRef} placeholder=" " defaultValue={sponsor.phone} name="sponsorTel" type="text" onInput={(e) =>
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/, "")} className={`inputCamp peer w-1/4 ${emptyTel ? 'border-red-600'
                                : ''
                                }`} maxLength={9} minLength={9} onChange={(e) => {
                                    setSponsorTel(e.currentTarget.value)
                                    setEmptyTel(false)
                                }} onKeyUp={(e) => {
                                    if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                                        if (btnRef.current != null) {
                                            btnRef.current.focus()
                                        }
                                    }
                                }} />
                        <label className={"labelFloatInput"}>Teléfono</label>
                        {emptyTel ? <label className='text-red-600 font-medium'>Numero tiene que tener 9 cifras</label> : ""}
                    </div>
                </div>
                <div className="w-full flex flex-1 flex-col mt-3 pl-3">
                    <div className="text-left p-1 relative">
                        <div className={"photoBoard"}>
                            <div className='pl-3'>
                                Foto {file?.name}
                            </div>
                            <form id="form-file-upload" className=" w-full flex justify-center">
                                <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                                    setFile(e.currentTarget.files!![0])
                                }} />
                                <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                                    <div className="flex m-auto flex-col items-center font-normal text-gray-400 text-xl">
                                        <img src={add_Photo} alt="add_photo"></img>
                                        <p>Pulse en la zona para añadir una imagen</p>
                                    </div>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="lg:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
                    <button ref={btnRef} name="sponsorBtnSave" className="btnStandard mr-10" onClick={() => {
                        updateSponsor(sponsor.idSponsor!!)
                    }}>Publicar</button>
                    <button name="sponsorBtnCancel" className="btnStandard" onClick={() => setConfirm(true)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default EditSponsor