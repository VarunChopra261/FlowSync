import { WorkflowFormSchema } from '@/src/lib/types'
import { useModal } from '@/src/providers/modal-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { BaseSyntheticEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Loader2 } from 'lucide-react'
import { Input } from '../ui/input' 
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { onCreateWorkflow } from '@/src/app/(main)/(pages)/workflows/_actions/workflow-connections'

type Props = {
    title?: string
    subTitle?: string
}

const Workflowform = ({ subTitle, title }: Props) => {
    const { setClose } = useModal()
    const router = useRouter() // Use the router hook correctly
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(WorkflowFormSchema),
      defaultValues: {
        name: '',
        description: '',
      },
    })
    const handleSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
      setIsLoading(true)
      try {
        const workflow = await onCreateWorkflow(values.name, values.description)
        if (workflow) {
          toast.message(workflow.message)
          router.refresh()
        }
      } catch (error) {
        toast.error('Failed to create workflow')
      } finally {
        setIsLoading(false)
        setClose()
      }
    }
  

    return (
      <Card className="w-full max-w-[650px] border-none">
        {title && subTitle && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subTitle}</CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 text-left"
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-4"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                  </>
                ) : (
                  'Save Settings'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      
    </Card>
    )
}
export default Workflowform
