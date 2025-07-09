'use client'

import { useCallback, useState } from "react"
import { UseUser } from "../../../zustandStore/useUser"
export type arr={
imgUrl:string, 
publicId:string
}
import axios from "axios"
import Image from "next/image"



export default function Feed() {
const[arr,setArr]=useState<arr[]>([])
const[status,setStatus]=useState<string>('')
const {user}=UseUser()
const boyName=user?.boyName

const getImg=useCallback(async()=>{
try{
const response=await axios.post('/api2/getImg',{boyName},{headers:{'Content-Type':"application/json"},withCredentials:true})
if(response.status===201){
setArr(response.data)
}
}catch{
setStatus('err while geting img ')
}
},[boyName])

return (<div>

<button  onClick={getImg} className="bg-yellow-400">get img</button>



<div>{
arr.map((elemnt,index)=>{
return <div key={index}>
  <Image
src={elemnt.imgUrl}
 alt={`Image by ${boyName}`}
 width={300}
height={300}
 className="border rounded"
/>
<button className="bg-red-600" >delete :{elemnt.publicId}</button>
</div>
})
    }</div>


<p className="bg-teal-300">status:{status}</p>



</div>)
}