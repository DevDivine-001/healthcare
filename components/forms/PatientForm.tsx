"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
// import { Button } from "../ui/button"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
 
export const enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}


 
const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [CreaterUser, setCreaterUser] = useState('tru')
  console.log(setIsLoading);
  console.log(setCreaterUser);
  const router = useRouter()
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
   setIsLoading(true)

   try {
    const userData = { name, email, phone }

    // console.log(CreaterUser);
    const user = await CreaterUser(userData)
    

    if(user){
      return router.push(`/patients/${user.$id}/register`)
    }
    
   } catch (error) {
    console.log(error)
    
   }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="Full Name"
          label="Full Name" 
          placeholder="Name"
          iconSrc="assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email" 
          placeholder="your email"
          iconSrc="assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number" 
          placeholder="Name"
        />

        <SubmitButton 
        isLoading={isLoading}
        >
          Get Started
          </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
