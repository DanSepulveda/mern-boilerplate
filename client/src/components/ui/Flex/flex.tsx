import { createElement } from 'react'
import { type VariantProps } from 'class-variance-authority'

import type {
  ContainerAttributes,
  HTMLContainerTags,
} from '@components/ui/interfaces'
import { DEFAULT_ELEMENT } from '@components/ui/defaults'
import { cn } from '@utils/classname'
import { flexVariants } from './flex.variants'

interface FlexProps
  extends ContainerAttributes,
    VariantProps<typeof flexVariants> {
  as?: HTMLContainerTags
  tw?: string
}

export const Flex = ({
  as = DEFAULT_ELEMENT.container,
  children,
  variant,
  tw,
  ...props
}: FlexProps) => {
  return createElement(
    as,
    {
      className: cn(flexVariants({ variant }), tw),
      ...props,
    },
    children,
  )
}