'use client'

import React, {useState} from 'react';
import useConversation from "@/app/hooks/useConversation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {FaRegImages} from "react-icons/fa6";
import {IoSend} from "react-icons/io5";
import Input from "@/app/(site)/components/Input";
import { CldUploadButton } from 'next-cloudinary'
import SquareBtn from "@/app/(site)/components/SquareBtn";
import clsx from "clsx";

const Form = () => {
  const {conversationId} = useConversation()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit = (data) => {
    setLoading(true)
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId
    }).finally(() => setLoading(false))
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }


  return (
    <div className={'flex items-center bg-gray-800 p-2'}>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="fzmj6tev"

        className={clsx(
          "bg-gray-700 hover:bg-gray-750 transition p-2 h-[42px] w-[42px] mr-2 rounded flex justify-center items-center",
          loading && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <FaRegImages/>
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex items-center flex-1'}>
        <div className={'flex-1'}>
          <Input label={''} id={'message'} register={register} errors={errors} disabled={loading} />
        </div>
        {/*<button type="submit" className="bg-gray-700 hover:bg-gray-750 transition p-2 h-[42px] w-[42px] mr-2 rounded flex justify-center items-center ml-2">*/}
        {/*  <IoSend/>*/}
        {/*</button>*/}
        <SquareBtn type="submit" loading={loading}>
          <IoSend/>
        </SquareBtn>
      </form>
    </div>
  );
};

export default Form;