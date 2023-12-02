import React, {useState} from 'react';
import SquareBtn from "@/app/(site)/components/SquareBtn";
import Input from "@/app/(site)/components/Input";
import MySelect, {OptionSelect} from "@/app/(site)/components/Select/MySelect";
import Button from "@/app/(site)/components/Button";
import Modal from "@/app/(site)/components/Modal";
import {FaUsersGear} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Divider from "@/app/(site)/components/Divider";

const CreateGroupChat: React.FC<{users: OptionSelect[]}> = ({users}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  })

  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
      .then((res) => {
        toast.success('Chat Created')
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => setIsLoading(false))
  }


  return (
   <div>
     {users?.length && (
       <Modal
         title={'Create a group chat'}
         actionComponent={
           <SquareBtn>
             <FaUsersGear className="text-white"/>
           </SquareBtn>
         }>
         <form onSubmit={handleSubmit(onSubmit)}>
           <div>
             Create a chat with more than 2 people.
           </div>
           <Divider />
           <Input label={'Name'} id={'name'} disabled={isLoading} errors={errors} required register={register} />
           <Divider />
           <MySelect
             label={'Select users'}
             id={'mebmers'}
             options={users}

             onChange={(value) => setValue('members', value, {
               shouldValidate: true
             })}
             value={members}
           />
           <Divider />
           <Button type={'submit'} loading={isLoading}>Create</Button>
         </form>
       </Modal>
     )}
   </div>
  );
};

export default CreateGroupChat;