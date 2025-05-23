'use client'

import { useModal } from '@/src/providers/modal-provider'
import { Button } from '@/src/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import CustomModal from '@/src/components/global/custom-modal'
import Workflowform from '@/src/components/forms/workflow-form'
import { useBilling } from '@/src/providers/billing-provider'

type Props = {}

const WorkflowButton = (props: Props) => {
    const {setOpen, setClose} = useModal()
    const { credits } = useBilling()

    const handleClick = () => {
      setOpen(
        <CustomModal
          title="Create a Workflow Automation"
          subheading="Workflows are a powerfull that help you automate tasks."
        >
          <Workflowform />
        </CustomModal>
      )
    }
  
    return (
       <Button
      size={'icon'}
      {...(credits !== '0'
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
    >
      <Plus />
    </Button>
    )
  }
  

export default WorkflowButton