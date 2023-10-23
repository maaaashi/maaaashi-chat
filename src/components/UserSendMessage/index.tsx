import { selectChannelAtom } from '@/atoms/selectChannel'
import {
  SendMessageMutationVariables,
  useCreateUploadUrlLazyQuery,
  useSendMessageMutation,
} from '@/graphql/generate'
import { ChatValue } from 'DynamoDB-Module'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useRef, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { GrAttachment } from 'react-icons/gr'

export const UserSendMessage = () => {
  const [sendMessage] = useSendMessageMutation()
  const selectChannel = useRecoilValue(selectChannelAtom)!
  const [content, setContent] = useState('')
  const session = useSession()
  const fileRef = useRef<HTMLInputElement>(null)
  const [createUploadUrl] = useCreateUploadUrlLazyQuery()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!session.data?.user?.name || !session.data?.user?.image) {
      return
    }

    const value: ChatValue = {
      content,
      username: session.data?.user?.name,
      imageUrl: session.data?.user?.image,
    }

    const input: SendMessageMutationVariables = {
      input: {
        pk: selectChannel.id,
        sk: 'Chat-' + uuidv4(),
        type: 'chat',
        createdAt: new Date().toISOString(),
        value: JSON.stringify(value),
      },
    }

    sendMessage({
      variables: input,
    })

    setContent('')
  }

  const handleFileChange = async (e: FormEvent) => {
    e.preventDefault()

    if (
      !fileRef.current ||
      !fileRef.current.value ||
      !fileRef.current.files ||
      fileRef.current.files.length === 0
    )
      return

    try {
      const { data } = await createUploadUrl({
        variables: {
          filename: fileRef.current.files[0].name,
        },
      })

      if (!data || !data.createUploadUrl) return

      const { url } = JSON.parse(data.createUploadUrl)

      console.log(url)

      const hoge = await fetch(url, {
        method: 'PUT',
        body: fileRef.current.files[0],
        headers: {
          'Content-Type': fileRef.current.files[0].type,
        },
      })

      console.log(hoge)

      const json = await hoge.json()

      console.log(json)
    } catch (error) {
      alert('comming soon')
      console.error(error)
    }

    fileRef.current.value = ''
  }

  return (
    <form onSubmit={submitHandler} className='bg-slate-300 w-full p-4 relative'>
      <button
        className='border p-2 rounded-lg bg-slate-200 hover hover:bg-slate-300 mb-2'
        type='button'
        onClick={() => fileRef.current?.click()}
      >
        <GrAttachment />
      </button>
      <input
        type='file'
        className='hidden'
        ref={fileRef}
        onChange={handleFileChange}
      />
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        placeholder='Markdown形式で入力'
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      ></textarea>
      <button className='btn btn-circle btn-primary absolute top-20 right-6'>
        <AiOutlineSend />
      </button>
    </form>
  )
}
