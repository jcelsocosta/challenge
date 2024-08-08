import Notification from '../components/notification/Notification'
import { Outlet } from 'react-router-dom'

export interface ILayoutPrimaryProps extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start'
}

export default function LayoutPrimary({ justify = 'items-center' }: ILayoutPrimaryProps): JSX.Element {
  return (
    <>
      <div className={`min-h-screen flex flex-row ${justify}`}>
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
      <Notification />
    </>
  )
}
