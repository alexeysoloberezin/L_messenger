'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import neverCheck from "@/app/utils/neverCheck";
import { log } from 'console';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import AuthSocialButton from './AuthSocialButtonGitHub';
import AuthSocialButtonGoogle from './AuthSocialButtonGoogle';
import AuthSocialButtonGitHub from './AuthSocialButtonGitHub';
import { useRouter } from 'next/navigation'

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(session?.status === 'authenticated'){
      router.push('/users')
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if(variant === 'LOGIN'){
      setVariant('REGISTER')
    }else{
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
      email: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    if(variant === "REGISTER"){
      try{
        const res = await axios.post('/api/register', data)

        if(res.status === 200){
          toast.success('Succesful created')
          signIn('credentials', { ...data, redirect: false })
        }

      }catch(err){
        toast.error('Somthing went wrong!')
      }finally{
        setIsLoading(false)
      }
      return
    }

    if(variant === "LOGIN"){
      try{
        const res = await signIn('credentials', {
          ...data,
          redirect: false
        })
  
        if(res?.error){
          toast.error('Invalid credentials')
          return
        }
  
        if(res?.ok){
          toast.success('Logged in!')
          router.push('/users')
          return
        }
      }catch(err){
        toast.error('Error')
      }finally{
        setIsLoading(false)
      }
      return
    }

    neverCheck(variant)
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)
    
    try{
      const res = await signIn(action, { redirect: false })

      if(res?.error){
        toast.error('Invalid credentials')
        return
      }
  
      if(res?.ok){
        toast.success('Logged in!')
        return
      }
    }catch(err){
      toast.success('Error')
    }finally{
      setIsLoading(false)
    }
    // socail sign in
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-12 h-12 mr-2" src="/logo.png" alt="logo" />
            L_messenger
        </a>
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
              { variant === "LOGIN" ? 'Sign in to your account' : 'Sign up to your account' }
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 mb-3">
              { variant === "REGISTER" && (
                  <>
                    <Input
                      label="Name"
                      id="name"
                      required
                      register={register}
                      errors={errors}
                    />
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      required
                      register={register}
                      errors={errors}
                    />
                    <Input
                      label="Password"
                      id="password"
                      type="password"
                      required
                      register={register}
                      errors={errors}
                    />
                  </>
              )}
              { variant === "LOGIN" && (
                  <>
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      required
                      register={register}
                      errors={errors}
                    />
                    <Input
                      label="Password"
                      id="password"
                      type="password"
                      required
                      register={register}
                      errors={errors}
                    />
                  </>
              )}
              <Button loading={isLoading} type={'submit'} className="w-full" >Submit</Button>
              
             </form>

            
              <div onClick={() => socialAction('google')}>
                <AuthSocialButtonGoogle />
              </div>
              <div onClick={() => socialAction('github')}>
                <AuthSocialButtonGitHub  />
              </div>
            
             
             <p onClick={() => setVariant(variant === 'LOGIN' ? 'REGISTER' : "LOGIN")} className="mt-2 text-sm cursor-pointer text-gray-500 dark:text-gray-400 pr-1">
               { variant === "LOGIN" ? "If you dont have account -" : "Already have account -" }
              <span className="font-medium text-blue-600 hover:underline dark:text-blue-500 inline-flex pl-2">
                { variant === "LOGIN" ? "Create an account" : "Login" }
              </span>
             </p>


          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;