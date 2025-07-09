'use client'

import { FormEvent, useCallback, useState } from "react"
import { UseUser } from "../../../zustandStore/useUser"
import { userScehma } from "../../../zodSchema/userSchema"
import axios    from "axios"
import Link from "next/link"
 
export default  function Create() {
const[boyName,setBoyName]=useState<string>('')
const[file,setFile]=useState<File | null >(null)
const[status,setStatus]=useState<string>('')
const {setUser}=UseUser()


//createUser 
const createUser=useCallback(async(e:FormEvent<HTMLFormElement>)=>{
e.preventDefault()
try{
const response=await axios.post('/api2/createUser',{boyName},{headers:{'Content-Type':"application/json"},withCredentials:true})
if(response.status===201){
setUser({
boyName:boyName
})
setStatus(response.data)
}
}catch{
setStatus('try catch error ')
}
},[boyName,setUser])


//createImg
const createImg=useCallback(async(e:FormEvent<HTMLFormElement>)=>{
e.preventDefault()
try{
if(!boyName || !file){
return setStatus('cant find the boyName')
}
const form= new FormData()
form.append('boyName',boyName)
form.append('file',file)
const isValid= userScehma.safeParse({boyName,file})
if(!isValid.success){
return setStatus('zod   valid error ')
}

const response=await axios.post('/api2/createImg',form,{headers:{"Content-Type":'multipart/form-data'},withCredentials:true})
if(response.status===201){
setFile(null)
setStatus(response.data)
}
}catch{
setStatus('try catch img ')
}
},[boyName,file])

return (<div>

<p className="bg-red-800">after cloneing it </p>

<form onSubmit={createUser}>
<input
type="text"
placeholder='enter boyName '
value={boyName}
onChange={(e)=>setBoyName(e.target.value)}
className="bg-green-600"
/>
<button type="submit" className="bg-amber-800">boy signup </button>
</form>

<form onSubmit={createImg}>
<input
type="file"
accept="image/*,video/*"
onChange={(e)=>setFile(e.target.files?.[0]||null)}
className="bg-teal-500"
/>
<button className="bg-orange-400" type="submit" >sent img </button>
</form>

<p>status: {status}</p>

<Link href={'/feed'}>
<button className="bg-teal-300">see img </button>
</Link>

</div>)

}