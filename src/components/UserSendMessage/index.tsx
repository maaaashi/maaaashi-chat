import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'

export const UserSendMessage = () => {
  return (
    <div className='bg-base-200 w-full p-4 relative'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        placeholder='メッセージを入力'
      ></textarea>
      <button className='btn btn-circle btn-primary absolute top-7 right-5'>
        <AiOutlineSend />
      </button>
    </div>
  )
}
