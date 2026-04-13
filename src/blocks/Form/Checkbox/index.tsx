import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl } from 'react-hook-form'

import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, defaultValue, errors, label, required, width }) => {
  const { control } = useFormContext()

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || false}
          render={({ field: { value, onChange } }) => (
            <CheckboxUi id={name} checked={!!value} onCheckedChange={onChange} />
          )}
        />
        <Label htmlFor={name}>
          {label}
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
