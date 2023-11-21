'use client';

import React, {useCallback, useState} from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import neverCheck from "@/app/utils/neverCheck";

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if(variant === "REGISTER"){
      // axiso reg
      return
    }

    if(variant === "LOGIN"){
      return
    }

    neverCheck(variant)
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    // socail sign in
  }

  return (
    <div>
      auth form
    </div>
  );
};

export default AuthForm;