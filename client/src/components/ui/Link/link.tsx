import { VariantProps } from 'class-variance-authority'
import { NavLink, Link as RouterLink } from 'react-router-dom'

import type { LinkAttributes, LinkTypeProp } from '@components/ui/interfaces'
import { cn } from '@utils/classname'
import { linkVariants } from './link.variants'

interface CustomLinkProps
  extends LinkAttributes,
    VariantProps<typeof linkVariants> {
  as?: LinkTypeProp
  tw?: string
}

export const Link = ({
  activeVariant,
  as = 'link',
  children,
  to,
  tw,
  variant,
  ...props
}: CustomLinkProps) => {
  const classNames = cn(linkVariants({ variant }), tw)

  switch (as) {
    case 'navlink':
      return (
        <NavLink
          to={to}
          className={({ isActive }) =>
            cn(
              linkVariants({ variant }),
              linkVariants({
                variant: undefined,
                activeVariant: isActive ? activeVariant : undefined,
              }),
              tw,
            )
          }
          {...props}
        >
          {children}
        </NavLink>
      )
    case 'external':
      return (
        <a
          href={to.toString()}
          className={classNames}
          target="_blank"
          {...props}
        >
          {children}
        </a>
      )
    default:
      return (
        <RouterLink
          to={to}
          className={classNames}
          {...props}
        >
          {children}
        </RouterLink>
      )
  }
}
