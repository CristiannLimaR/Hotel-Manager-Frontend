import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout