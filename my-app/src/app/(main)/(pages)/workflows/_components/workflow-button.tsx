'use client'
// import { useBilling } from '@/src/providers/billing-provider'
import { useModal } from '@/src/providers/modal-provider'
import { Button } from '@/src/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import CustomModal from '@/src/components/global/custom-modal'
import Workflowform from '@/src/components/forms/workflow-form'

type Props = {}

const WorkflowButton = (props: Props) => {
    const {setOpen, setClose} = useModal()
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
        onClick={handleClick}
      >
        <Plus />
      </Button>
    )
  }
  

export default WorkflowButton