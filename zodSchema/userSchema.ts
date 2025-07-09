import {z} from 'zod'
export const userScehma=z.object({
boyName:z.string().min(3,' atlest 3 words ') ,
file:z.instanceof(File)
.refine((file)=>file.size<=50*1080*1080)
.refine((file)=>["image/jpeg", "image/png", "image/webp",'video/mp4', 'video/webm'].includes(file.type),{message:'this is invalid  file  type '})
})
export type userInput=z.infer<typeof userScehma>