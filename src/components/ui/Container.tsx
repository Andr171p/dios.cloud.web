import type {ComponentProps} from 'react';

type Props = ComponentProps<'div'>;

export function Container({className = '', ...props}: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 ${className}`}
      {...props}
    />
  )
}
