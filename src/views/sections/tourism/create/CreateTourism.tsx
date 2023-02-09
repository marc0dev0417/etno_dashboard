import logoEtno from '../../../../assets/logo_etno.png'
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


const CreateTourism = () => {
  const navigate = useNavigate()

  const inputTitle = useRef<HTMLInputElement>(null)
  const inputLong = useRef<HTMLInputElement>(null)
  const inputLat = useRef<HTMLInputElement>(null)
  const txtAreaRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const [tourismType, setTourismType] = useState<string>("")
  const [tourismTitle, setTourismTitle] = useState<string>("")
  const [tourismDescription, setTourismDescription] = useState<string>("")
  const [tourismPhoto, setTourismPhoto] = useState<string>("")
  const [tourismLong, setTourismLong] = useState<string>("")
  const [tourismLat, setTourismLat] = useState<string>("")

  //funcion temporal para comprobar entrada
  function checkState() {
    console.log(tourismType)
    console.log(tourismTitle)
    console.log(tourismDescription)
    console.log(tourismPhoto)
    console.log(tourismLong)
    console.log(tourismLat)
  }

  return (
    <div className="flex flex-col md:m-auto w-full md:w-1/2 border-2" >
      <div className="h-20 w-full flex  bg-indigo-800 rounded-t-md ">
        <div className="w-full flex flex-row p-2 justify-between">
          <img src={logoEtno} alt="logo_Etno"></img>
          <p className='flex  text-white text-3xl p-3'>TURISMO</p>
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1">
          <label className="text-left text-2xl p-1">Tipo</label>
          <input autoFocus placeholder="Tipo" name="tourismType" type="text" className="border-2 rounded-md p-2" onChange={(e) => {
            setTourismType(e.currentTarget.value)
          }} onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (inputTitle.current != null) {
                inputTitle.current.focus()
              }
            }
          }} />
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1">
          <label className="text-left text-2xl p-1">Título</label>
          <input ref={inputTitle} placeholder="Titulo" name="tourismTitle" type="text" className="border-2 rounded-md p-2" onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (txtAreaRef.current != null) {
                txtAreaRef.current.focus()
              }
            }
          }} onChange={(e) => {
            setTourismTitle(e.currentTarget.value)
          }} />
        </div>
      </div >
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1">
          <label className="text-left text-2xl p-1">Descripción</label>
          <textarea ref={txtAreaRef} placeholder="Descripcion" name="tourismDescription" rows={3} className="border-2 rounded-md p-2" onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (inputLong.current != null) {
                inputLong.current.focus()
              }
            }
          }} onChange={(e) => {
            setTourismDescription(e.currentTarget.value)
          }} />
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="text-left p-1">
          <label className=" text-2xl">Fotos</label>
          <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300  ">
            <form id="form-file-upload" className=" w-full flex justify-center">
              <input type="file" id="input-file-upload" className="visibility: hidden" size={10485760} accept=".png, .JPG, .jpg, .gif, .jpeg" onChange={(e) => {
                setTourismPhoto(e.currentTarget.value)
              }} />
              <label id="label-file-upload" htmlFor="input-file-upload" className="  w-full p-5 ">
                <div className="flex m-auto flex-col items-center text-gray-400 text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#BDBDBD"><path d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h20.45v3H9v30h30V18.6h3V39q0 
                  1.25-.875 2.125T39 42Zm26-24.9v-4.05h-4.05v-3H35V6h3v4.05h4.05v3H38v4.05ZM12 33.9h24l-7.2-9.6-6.35 8.35-4.7-6.2ZM9 9v30V9Z"/></svg>
                  <p>Pulse en la zona para añadir una imagen</p>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-1 m-auto justify-center p-3">
        <img className='rounded-md' src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" alt="googlemap"></img>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1">
          <label className="text-left text-2xl p-1">Longitud</label>
          <input ref={inputLong} placeholder="Longitud" type="text" name="tourismLong" className="border-2 rounded-md p-2" onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (inputLat.current != null) {
                inputLat.current.focus()
              }
            }
          }} onChange={(e) => {
            setTourismLong(e.currentTarget.value)
          }} />
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col pl-3">
        <div className="flex flex-col p-1">
          <label className="text-left text-2xl p-1">Latitude</label>
          <input ref={inputLat} placeholder="Latitud" type="text" name="tourismLat" className="border-2 rounded-md p-2" onKeyUp={(e) => {
            if ((e.code === "Enter") || (e.code === "NumpadEnter")) {
              if (btnRef.current != null) {
                btnRef.current.focus()
              }
            }
          }} onChange={(e) => {
            setTourismLat(e.currentTarget.value)
          }} />
        </div>
      </div>
      <div className="flex m-auto justify-center p-3">
        <button ref={btnRef} name="tourismBtnSave" className="inline-flex items-center rounded-md border mr-10 border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={()=>checkState()}>Publicar</button>
        <button name="tourismBtnCancel" className="inline-flex items-center rounded-md border  border-gray-300 bg-indigo-800 px-4 py-3 text-sm font-medium text-gray-300 shadow-sm hover:bg-indigo-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500" onClick={() => navigate("/home")}>Cancelar</button>
      </div>
    </div>
  )
}
export default CreateTourism