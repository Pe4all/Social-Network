import type React from 'react'
import { Button as HeroButton } from '@heroui/react';


type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}

const Button: React.FC<Props> = ({ children, className, color, fullWidth, icon, type }) => {
  return (
    <HeroButton startContent={icon} size='lg' color={color} variant='light' className={className} type={type} fullWidth={fullWidth}>
      {children}
    </HeroButton>
  )
}

export default Button
