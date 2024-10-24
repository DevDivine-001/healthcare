
'use client'
import React from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import { Input } from "@/components/ui/input"

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
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <Input
          {...field}
          type="text"
          placeholder={props.placeholder}
          disabled={props.disable}
          className="input-field"
        />
      )
    case FormFieldType.TEXTAREA:
      return (
        <textarea
          {...field}
          placeholder={props.placeholder}
          disabled={props.disable}
          className="textarea-field"
        />
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
