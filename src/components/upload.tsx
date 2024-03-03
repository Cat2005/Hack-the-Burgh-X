'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { uploadToS3 } from './s3-actions'

type Props = {
  children: React.ReactNode
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}
export function DropZone({ children }: Props) {
  const { getRootProps, isDragAccept, isDragReject, acceptedFiles } =
    useDropzone({ accept: { 'application/pdf': [] }, noClick: true })

  async function upload() {
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', file)
    const img = await uploadToS3(formData) // base64
    // append img to div with id img
    const imgElement = document.createElement('img')
    imgElement.src = 'data:image/png;base64,' + img
    imgElement.width = 200
    imgElement.height = 200
    const imgDiv = document.getElementById('img')
    imgDiv.appendChild(imgElement)


    console.log(img)
    acceptedFiles.pop()
  }

  return (
    <div
      className={cn(
        'transition-all h-full rounded-sm outline outline-[#fff0]',
        isDragAccept && 'outline outline-offset-1 outline-4 outline-green-400',
        isDragReject && 'outline outline-offset-1 outline-4 outline-red-500'
      )}
      {...getRootProps()}>
      {isDragAccept}
      {isDragReject}
      {acceptedFiles.length > 0 && (
        <Dialog open={acceptedFiles.length > 0}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File Confirmation</DialogTitle>
              <DialogDescription>
                Would you like to upload {acceptedFiles[0].name}?
              </DialogDescription>
              <Button onClick={upload}>Upload</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {acceptedFiles.length > 0 && (

        <Dialog open={acceptedFiles.length > 0}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File Confirmation</DialogTitle>
              <DialogDescription>
                Would you like to upload {acceptedFiles[0].name}?
              </DialogDescription>
              <Button onClick={upload}>Upload</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      <div id="img">
        test
      </div>
      {children}
    </div>
  )
}
