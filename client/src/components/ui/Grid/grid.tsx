import { createContext, createElement, useContext } from 'react'
import { type VariantProps } from 'class-variance-authority'

import type {
  ColsProp,
  ContainerAttributes,
  HTMLContainerTags,
} from '@components/ui/interfaces'
import { DEFAULT_ELEMENT, DEFAULT_GRID_LAYOUT } from '@components/ui/defaults'
import { cn } from '@utils/classname'
import { colsClassname } from './grid.utils'
import { gridVariants } from './grid.variants'

interface GridProps extends ContainerAttributes {
  as?: HTMLContainerTags
  cols?: ColsProp
}

export interface GridContainerAttributes
  extends GridProps,
    VariantProps<typeof gridVariants> {}

const GridContext = createContext({})

export const GridContainer = ({
  as = DEFAULT_ELEMENT.gridContainer,
  children,
  className,
  cols = DEFAULT_GRID_LAYOUT,
  spacing,
  ...props
}: GridContainerAttributes) => {
  return (
    <GridContext.Provider value={{ ...cols }}>
      {createElement(
        as,
        {
          className: cn(gridVariants({ spacing }), className),
          ...props,
        },
        children,
      )}
    </GridContext.Provider>
  )
}

export const GridItem = ({
  as = DEFAULT_ELEMENT.gridItem,
  children,
  className,
  cols,
  ...props
}: GridProps) => {
  const containerCols = useContext(GridContext)
  const selectedCols = cols ?? containerCols
  const colsClasses = colsClassname(selectedCols)

  return createElement(
    as,
    {
      ...props,
      className: cn(colsClasses, className),
    },
    children,
  )
}
