import axios from 'axios'
import { useState, useEffect} from 'react'

const App = () => {

const [dataImage, setDataImages] = useState([])

const fetchImages = async () => {
  const response = await axios.get(`https://picsum.photos/v2/list?page=${idx+1}&limit=8` )
   
  setDataImages(response.data)
}
const [idx, setIdx] = useState(0)
useEffect(()=>{
  fetchImages()
},[idx])

let printImageData = <h2 className='text-gray-400 text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>loading...</h2>
if(dataImage.length > 0){
  printImageData = dataImage.map((data,idx)=>{
    return <div key={idx} className='border-2 border-orange-500 rounded-lg p-2 m-3 h-65  bg-white '>
       <a href={data.url} target='_blank'>
        <img src={data.download_url} alt={data.author} className='h-50 w-70 bg-cover'></img>
        <h4 className='text-center font-bold text-orange-500 text-lg m-2 bg-white rounded-2xl'>{data.author}</h4>
       </a>
      
    </div>
  })
}

const handlePrev = () => {
  if(idx > 0){
    setIdx(idx - 1)
    setDataImages([])
  }
}

const handleNext = () => {
    setDataImages([])
  setIdx(idx + 1)

}

  return (
    <div className='bg-black text-white font-[cursive]' >
      <h1 className='text-center text-2xl font-bold pt-4 text-orange-500  '>Company Gallery</h1>
     <div className='pt-6 p-3 h-screen overflow-auto w-full flex flex-wrap gap-2 justify-center'>{printImageData}</div>
     <div className='flex justify-center'>
        <button style={{opacity:idx==0?0.5:1}}
        className='bg-orange-500  px-4 py-2 rounded-lg mr-4 font-bold cursor-pointer active:scale-95 hover:bg-orange-600'onClick={handlePrev}>Prev</button>
        <h4 className='mr-3 my-auto text-orange-500'>Page {idx+1}</h4>
        <button className='bg-orange-500 px-4 py-2 rounded-lg font-bold hover:bg-orange-600 active:scale-95' onClick={handleNext}>Next</button>
       </div>
    </div>
  )
}

export default App
