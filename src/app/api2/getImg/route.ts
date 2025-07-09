import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authoptions";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
console.log('req came ')
try{
const session=await  getServerSession(authOptions)
if(!session){
return NextResponse.json('un auth ',{status:403})
}
console.log('1')
const body=await req.json()
if(!body){
return NextResponse.json('cant find the body ',{status:404})
}
console.log('2')
const{boyName}=body
const findUser=await prisma.allboy.findFirst({
where:{boyName}
})
console.log('3')
if(!findUser){
return NextResponse.json('cant find   user ',{status:404})
}
console.log('4')
const allImgs=await prisma.allImg.findMany({
where:{boyId:findUser.id}
})
console.log(`5.${allImgs}`)
return NextResponse.json(allImgs,{status:201})
}catch{
return NextResponse.json('try catch  error ',{status:500})
}
}