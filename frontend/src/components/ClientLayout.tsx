'use client'

// import Navbar from '@/components/Navbar'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
    </>
  )
}
