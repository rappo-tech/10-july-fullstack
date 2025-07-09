import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authoptions";
import { uploadToCloudinary,generateFileName } from "../../../../utils/cloudinaryUtilis";
import { userScehma } from "../../../../zodSchema/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function  POST(req:NextRequest) {
console.log('req came ')
try{
const session=await getServerSession(authOptions)
if(!session){
return NextResponse.json('un auth ',{status:403})
}
console.log('1')
const body=await req.formData()
const boyName=body.get('boyName') as string
const file=body.get('file') as File
console.log(`2. ${body}`)
 
//validate with zod 
const isValid=userScehma.safeParse({boyName,file})
if(!isValid.success){
return NextResponse.json('cant validate  the file ',{status:404})
}
console.log('3')
//convert  to buffer
const frontendbits=await file.arrayBuffer()
const buffer=Buffer.from(frontendbits)
console.log('4')
//create filenmae=gneratename 
const fileName=await generateFileName(file.name)
console.log('5')
//upload to cloudinary 
const result = await uploadToCloudinary(buffer,fileName)
if(!result){
return NextResponse.json('unable  to  upload to cloudniary ',{status:404})
}
console.log('6')
//upload  to prisma db 
const findBoy=await prisma.allboy.findFirst({
where:{boyName}
})
console.log('7')
if(!findBoy){
return NextResponse.json('cant find the body ', {status:404})
}
console.log('8')
await prisma.allImg.create({
data:{boyId:findBoy.id,imgUrl:result.url,publicId:result.publicId}
})
console.log('9')
return  NextResponse.json('img created sucessfully ',{status:201})
}catch{
return NextResponse.json('try catch err',{status:500})
}
}
