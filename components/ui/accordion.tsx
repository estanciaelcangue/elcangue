'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { MinusIcon, PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex min-w-0">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group focus-visible:border-ring focus-visible:ring-ring/50 flex w-full min-w-0 flex-1 items-start justify-between gap-3 py-4 text-left text-sm font-medium transition-all outline-none active:scale-[0.995] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 sm:gap-4',
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-current/25 transition-colors duration-200 group-hover:border-current/45 sm:mt-0.5 sm:size-8"
        >
          <PlusIcon className="size-4 group-data-[state=open]:hidden" />
          <MinusIcon className="hidden size-4 group-data-[state=open]:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="accordion-content overflow-hidden text-sm motion-reduce:animate-none"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
