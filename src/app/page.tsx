'use client'
import Link from "next/link"
import {useSession,signIn,signOut} from "next-auth/react"

export  default  function Home() {
const{data:session,status}=useSession()
if(status==='unauthenticated'){
return <button  className="bg-green-300" onClick={()=>signIn('google')}>sign in </button>
}

if(status==='loading'){
return <p className="bg-yellow-200">checking info... </p>
}

  
return (<div>

<p>welcome:{session?.user?.name}</p>
<button  className="bg-red-500 "  onClick={()=>signOut()}>sign out </button>





<Link href={'/create'}>
<button className="bg-yellow-400"> go to create </button>
</Link>



</div>)
}