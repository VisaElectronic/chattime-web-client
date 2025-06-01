import { LOGIN_ROUTE } from '@/constants/routes';
import { connectStomp, disconnectStomp } from '@/lib/stomp';
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Extend NextPage to include any props P
export function CheckAuth<P extends Record<string, unknown>>(PageComponent: NextPage<P>): NextPage<P> {
  const Authenticated: NextPage<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('access_token')
      if (!token) {
        disconnectStomp();
        router.replace(LOGIN_ROUTE);
        return;
      }
      connectStomp(token);
    }, [router])

    return <PageComponent {...props} />
  }

  // (Optional) Copy getInitialProps or getServerSideProps if the wrapped page has one
  if (PageComponent.getInitialProps) {
    Authenticated.getInitialProps = (ctx: NextPageContext) => {
      return PageComponent.getInitialProps!(ctx)
    }
  }

  return Authenticated
}
