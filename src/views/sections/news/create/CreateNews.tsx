import logoEtno from '../../../../assets/logo_etno.png'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import add_Photo from '../../../../assets/menu/add_photo.svg'
import "../../../../index.css"

import NewsStore from '../../../../viewmodels/news/NewsStore'
import { News } from '../../../../models/section/Section'

const newsStore = NewsStore.getNewsStore()

const CreateNews = () => {
  const navigate = useNavigate()

  const inputRefTit = useRef<HTMLInputElement>(null)
  const inputRefDate = useRef<HTMLInputElement>(null)
  const inputRefLink = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [newsCategory, setNewsCategory] = useState<string>("")
  const [newsTitle, setNewsTitle] = useState<string>("")
  const [newsDate, setNewsDate] = useState<string>("")
  const [newsDescription, setNewsDescription] = useState<string>("")
  const [newsLink, setNewstLink] = useState<string>("")
  const [newsPhoto, setNewsPhoto] = useState<string>("")

  //funcion temporal para comprobar  datos  que guardamos con consol.log
  function addNews() {
    const news: News = {
        category: newsCategory,
        title: newsTitle,
        description: newsDescription,
        publicationDate: newsDate
    }
      newsStore.addRequestNews('Bolea', news)
  }

  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 md:h-screen border-2 rounded-md">
      <div>
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
          <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>NOTICIAS</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 mt-5 relative">
          <input autoFocus placeholder=" " name="newsCategory" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] 
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800 " onChange={(value) => {
              setNewsCategory(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefTit.current != null) {
                  inputRefTit.current.focus()
                }
              }
            }} />
          <label className={"float-input-lbl"}>Categoria</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 mt-3 relative">

          <input ref={inputRefTit} placeholder=" " name="newsTitle" type="text" className="autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]
           border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
              setNewsTitle(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
                if (inputRefDate.current != null) {
                  inputRefDate.current.focus()
                }
              }
            }} />
          <label className={"float-input-lbl"}>Titulo</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col mt-5 pl-3">
        <div className="flex flex-col p-1 mt-3 relative">
          <input ref={inputRefDate} type="date" name="newsDate" className="w-40 border-2 rounded-md focus:outline-none peer
           focus:border-indigo-800" onChange={(value) => {
              setNewsDate(value.currentTarget.value)
            }} onKeyUp={(e) => {
              if ((e.code === "NumpadEnter")) {
                if (txtAreaRef.current != null) {
                  txtAreaRef.current.focus()
                }
              }
            }} />
          <label className={"float-date-lbl"}>Fecha</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 relative mt-3">
          <textarea ref={txtAreaRef} placeholder=" " name="newsDescription" rows={3} className="border-2 rounded-md p-2 peer
           focus:outline-none focus:border-indigo-800 autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)]" onChange={(value) => {
              setNewsDescription(value.currentTarget.value)
            }} onKeyDown={(e) => {
              if (e.code === "NumpadEnter") {
                if (inputRefLink.current != null) {
                  inputRefLink.current.focus()
                }
              }
            }} />
          <label className={"float-txtArea-lbl"}>Descricíon</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1 relative mt-3">
          <input ref={inputRefLink} placeholder=" " name="newsUrl" type="text" className=" autofill:shadow-[inset_0_0_0px_30px_rgb(255,255,255)] border-2 rounded-md p-2 peer focus:outline-none focus:border-indigo-800" onChange={(value) => {
            setNewstLink(value.currentTarget.value)
          }} onKeyDown={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (btnRef.current != null) {
                btnRef.current.focus()
              }
            }
          }} />
          <label className={"float-input-lbl"}>Pagina Web</label>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="text-left p-1 ">
          <div className={"photoBoard"}>
            <div className='absolute left-3'>
              Foto
            </div>
            <form id="form-file-upload" className=" w-full flex justify-center ">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(value) => {
                setNewsPhoto(value.currentTarget.value)
              }} />
              <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                <div className="flex m-auto flex-col items-center text-gray-400 font-normal text-xl">
                  <img src={add_Photo} alt="photo"></img>
                  <p>Pulse en la zona para añadir una imagen</p>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className=" md:absolute flex m-auto justify-center left-0 right-0 p-3 bottom-1">
        <button ref={btnRef} name="pharmacyBtnSave" className={"post-btn"} onClick={addNews}>Publicar</button>
        <button name="pharmacyBtnCancel" className={"regular-btn"} onClick={() => navigate("/home")}>Cancelar</button>
      </div>
      </div>
    </div>
  )
}
export default CreateNews