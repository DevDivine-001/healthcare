
'use client'
import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import 'react-phone-number-input/style.css'
import PhoneInput, {E164Number} from 'react-phone-number-input'
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import { Input } from "@/components/ui/input"
import Image from 'next/image'

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disable?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {fieldType, iconSrc, iconAlt, placeholder} = props
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-black'>
          {
            iconSrc && (
              <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={24}
              height={24}
              className='ml-2'
              />
            )}
      <FormControl>
          <Input
          {...field}
          type="text"
          placeholder={placeholder}
          // disabled={props.disable}
          className="bg-transparent outline-none border-0 shad-input"
          />
      </FormControl>
          </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        // <textarea
        //   {...field}
        //   placeholder={props.placeholder}
        //   disabled={props.disable}
        //   className="textarea-field"
        // />
        <FormControl>
          <PhoneInput
          defaultCountry='US'
          placeholder={placeholder}
          international
          withCountryCallingCode
          value={field.value as E164Number | undefined}
          onChange={field.onChange}
          className='input-phone'
          />

        </FormControl>
      )
    // Add more cases for other field types
    default:
      return null
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel><p className='text-[#fff]'>{label}</p></FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
