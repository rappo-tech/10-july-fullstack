import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authoptions";
import { NextRequest, NextResponse } from "next/server";
import { deleteFromCloudinary } from "../../../../utils/cloudinaryUtilis";

export async function DELETE(req:NextRequest) {
console.log('req came ')
    try{
console.log('1')
const session=await getServerSession(authOptions)
if(!session){
return NextResponse.json('un auth ',{status:403})
}
console.log('2 ')
const body=await req.json()
if(!body){
return NextResponse.json('cant  find the body ',{status:404})
}
console.log('3')
const{boyName,publicId}=body
const findUser=await prisma.allboy.findFirst({
where:{boyName}
})
console.log('4')
if(!findUser){
return NextResponse.json('cant find user ',{status:404})
}
console.log('5')
const findImg =await prisma.allImg.findFirst({
where:{boyId:findUser.id,publicId:publicId}
})
console.log('6')
if(!findImg){
return NextResponse.json('cant find img',{status:404})
}
console.log('7')
await deleteFromCloudinary( publicId)
console.log('8')
await prisma.allImg.delete({
where:{id:findImg.id,boyId:findUser.id,publicId:publicId}
})
console.log('9')
return NextResponse.json('sucessfully delete this img ',{status:201})
    }catch{
    return NextResponse.json('try catch error ',{status:500})
    }
}