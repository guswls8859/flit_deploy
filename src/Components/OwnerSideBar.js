import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import Home from '../Pages/Owner/Home'
import OrderList from '../Pages/Owner/Order/List'
import ProductList from '../Pages/Owner/Product/List'
import OrderView from '../Pages/Owner/Order/View'
import ProductAdd from '../Pages/Owner/Product/Add'
import PortfolioList from '../Pages/Owner/Portfolio/List'
import PortfolioAdd from '../Pages/Owner/Portfolio/Add'
import ProductView from '../Pages/Owner/Product/View'
import PortfolioView from '../Pages/Owner/Portfolio/View'
import SalesList from '../Pages/Owner/Sales/TotalList'
import AdvertiseAdd from '../Pages/Owner/Advertise/Add'
// import AdvertiseList from '../Pages/Owner/Advertise/List'
// import AdvertiseBuy from '../Pages/Owner/Advertise/Buy'
import ShopView from '../Pages/Owner/Shop/View'
import ShopPoint from '../Pages/Owner/Shop/Point'
import Customer from '../Pages/Owner/Shop/Customer'
import ChatList from '../Pages/Owner/Shop/Chat'
import Login from '../Pages/Owner/Login'
import Submit from '../Pages/Owner/Submit'
import Footer from './Footer'
import { useState } from 'react'
import NoticeList from '../Pages/Owner/Community/Notice'
import NoticeView from '../Pages/Owner/Community/NotiveView'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import SalesTotal from '../Pages/Owner/Sales/TotalList'
import SalesFlit from '../Pages/Owner/Sales/FlitList'
import SalesAccount from '../Pages/Owner/Sales/AccountList'
import AccountRegister from '../Pages/Owner/Sales/AccountRegister'
import Calculate from '../Pages/Owner/Calculate.js/Calculate'

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowY={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
        }
      }}
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          OWNER
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Stack spacing={0}>
        <NavItem link={'/'}>HOME</NavItem>

        <Accordion borderColor={'white'} defaultIndex={[parseInt(localStorage.getItem('openIndex'))]} onChange={(e) => localStorage.setItem('openIndex', e)}>
          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>주문 관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/order/all'}>전체 주문 관리</NavItem>
              <NavItem link={'/order/pickup'}>픽업 주문 관리</NavItem>
              <NavItem link={'/order/delivery'}>배송 주문 관리</NavItem>
            </AccordionPanel>
          </AccordionItem>

          {/* <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>수발주 관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem>전체 내역 관리</NavItem>
              <NavItem>수주 내역 관리</NavItem>
              <NavItem>발주 내역 관리</NavItem>
            </AccordionPanel>
          </AccordionItem> */}

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>상품 관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/product/1'}>상품 조회</NavItem>
              <NavItem link={'/product/add'}>상품 등록</NavItem>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>포트폴리오<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/portfolio/1'}>포트폴리오 조회</NavItem>
              <NavItem link={'/portfolio/add'}>포트폴리오 등록</NavItem>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>매출관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/sales/all'}>전체 매출</NavItem>
              <NavItem link={'/sales/flit'}>플릿 매출</NavItem>
              <NavItem link={'/sales/account'}>가계부</NavItem>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>정산관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/calculate'}>정산 관리</NavItem>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>광고관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/advertise'}>광고 신청 & 조회</NavItem>
              {/* <NavItem link={'/advertise/1'}>광고 조회</NavItem>
              <NavItem link={'/advertise/buy'}>티켓 구매</NavItem> */}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>상점관리<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/shop/info'}>상점 정보</NavItem>
              <NavItem link={'/shop/point'}>포인트 관리</NavItem>
              <NavItem link={'/shop/customer'}>고객 관리</NavItem>
              <NavItem link={'/shop/chat'}>1:1 문의</NavItem>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton p={0} w={'100%'}>
              <NavTitle>사장님 커뮤니티<AccordionIcon /></NavTitle>
            </AccordionButton>
            <AccordionPanel p={0}>
              <NavItem link={'/notice/1'}>공지</NavItem>
              <NavItem link={'/board'}>게시판</NavItem>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Box>
  )
}

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Box
      as="a"
      href={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        // mx="4"
        // borderRadius="lg"
        role="group"
        cursor="pointer"
        justifyContent={'center'}
        _hover={{
          bgColor: 'gray.300',
          color: 'gray.800'
        }}
        {...rest}>
        {children}
      </Flex>
    </Box>
  )
}

const NavTitle = ({ icon, children, ...rest }) => {
  return (
    <Box
      style={{ textDecoration: 'none', width: "100%" }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        justifyContent={'space-between'}
        // mx="4"
        // borderRadius="lg"
        role="group"
        fontWeight={'bold'}
        bgColor={'gray.500'}
        color={'gray.100'}
        w="100%"
        {...rest}>
        {children}
      </Flex>
    </Box>
  )
}

const NavSubTitle = ({ icon, children, ...rest }) => {
  return (
    <Box
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        justifyContent={'center'}
        // mx="4"
        // borderRadius="lg"
        role="group"
        fontWeight={'bold'}
        bgColor='gray.100'
        color='gray.800'
        {...rest}>
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        OWNER
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <HStack>
            {/* <ColorModeButton/> */}
            <Login onLogin={() => window.location.reload()}/>
            {!localStorage.getItem('ownerToken') && <Submit />}
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box overflowX={'clip'} ml={{ base: 0, md: 60 }} p="4" justifyContent={'space-between'} minHeight={'100vh'}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/order/*' element={<OrderList />} />
            <Route path='/order/view/*' element={<OrderView />} />
            <Route path='/product/*' element={<ProductList />} />
            <Route path='/product/add' element={<ProductAdd />} />
            <Route path='/product/view/*' element={<ProductView />} />
            <Route path='/portfolio/*' element={<PortfolioList />} />
            <Route path='/portfolio/add' element={<PortfolioAdd />} />
            <Route path='/portfolio/view/*' element={<PortfolioView />} />
            <Route path='/sales/all' element={<SalesTotal />} />
            <Route path='/sales/flit' element={<SalesFlit />} />
            <Route path='/sales/account' element={<SalesAccount />} />
            <Route path='/sales/register' element={<AccountRegister />} />
            <Route path='/advertise' element={<AdvertiseAdd />} />
            {/* <Route path='/advertise/1' element={<AdvertiseList />} />
            <Route path='/advertise/buy' element={<AdvertiseBuy />} /> */}
            <Route path='/shop/info' element={<ShopView />} />
            <Route path='/shop/point' element={<ShopPoint />} />
            <Route path='/shop/customer' element={<Customer />} />
            <Route path='/shop/chat' element={<ChatList />} />
            <Route path='/notice/*' element={<NoticeList />} />
            <Route path='/notice/view' element={<NoticeView />} />
            <Route path='/calculate' element={<Calculate />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  )
}

export default SidebarWithHeader