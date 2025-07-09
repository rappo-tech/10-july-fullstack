import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authoptions";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
console.log('req came')
try{
const session=await getServerSession(authOptions)
if(!session){
return NextResponse.json('un auth ',{status:403})
}
console.log(`2`,)
const body=await req.json()
if(!body){
return NextResponse.json('cant find body',{status:404})
}
console.log('3')
console.log(`3:${body}`,)
const{boyName}=body
console.log(`${boyName}`)
await prisma.allboy.create({
data:{boyName}
})
console.log('4')
return NextResponse.json('userCreate  done ',{status:201})
}catch{
return NextResponse.json('try catch error',{status:500})
}
}