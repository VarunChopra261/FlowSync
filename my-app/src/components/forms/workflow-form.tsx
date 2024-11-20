import { WorkflowFormSchema } from '@/src/lib/types'
import { useModal } from '@/src/providers/modal-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    title?: string
    subTitle?: string
}

const Workflowform = ({ subTitle, title }: Props) => {
    const { setClose } = useModal()
    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(WorkflowFormSchema),
      defaultValues: {
        name: '',
        description: '',
      },
    })
    return <div>Workflowform</div>
}
export default Workflowform