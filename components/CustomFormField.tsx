'use client'
import React from 'react'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Control } from 'react-hook-form'


interface CustomProps {
  control: Control<any>,
}


const CustomFormField = ({control}: CustomProps) => {
  return (
   <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#fff]"><p className="text-[#fff]">Username</p></FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default CustomFormField