import { Box, Button, Checkbox, CheckboxGroup, HStack, Radio, RadioGroup, Stack, StackDivider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Title_2xl, Title_lg } from "../../../Style/Typograhy";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FilterSelect } from "../../../Components/FilterSelect";
import { SearchInput } from "../../../Components/Form";
import { getDate, getNotice } from "../../../DB/function";
import { BorderTable, TBody, THeader } from "../../../Style/Table";

const NoticeList = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        keyword: '',
        option: '제목',
        user: ['Customer', 'Shop', 'Florist'],
        type: '공지'
    });

    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        search();
    }, []);

    const reset = () => {
        setFilter({
            keyword: '',
            option: '제목',
            user: ['Customer', 'Shop', 'Florist'],
            type: '공지'
        })
    }

    const search = async() => {
        let result = await getNotice(filter)
        setNoticeList(result)
    }

    return (
        <Box>
            <HStack justifyContent={'space-between'} alignItems={'flex-start'}>
                <Text {...Title_2xl}>공지 / 이벤트 관리</Text>
                <Button leftIcon={<AddIcon />} onClick={() => navigate('/admin/notice/add')}>공지 / 이벤트 등록</Button>
            </HStack>

            <FilterSelect onReset={() => reset()} onSearch={() => search()}>

                <Stack direction={'column'} divider={<StackDivider borderColor={"#d9d9d9"} />} spacing={3}>
                    <SearchInput option={['제목']} defaultType={filter.option} defaultValue={filter.keyword} onSetField={(e) => setFilter({ ...filter, option: e.target.value })} onChange={(value) => setFilter({ ...filter, keyword: value })} />
                    <Box>
                        <Text {...Title_lg}>대상</Text>
                        <CheckboxGroup onChange={(value) => setFilter({ ...filter, user: value })} colorScheme='red' defaultValue={filter.user}>
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                <Checkbox value='Customer'>Customer</Checkbox>
                                <Checkbox value='Shop'>Shop</Checkbox>
                                <Checkbox value='Florist'>Florist</Checkbox>
                            </Stack>
                        </CheckboxGroup>
                    </Box>
                    <Box>
                        <Text {...Title_lg}>유형</Text>
                        <RadioGroup onChange={(value) => setFilter({ ...filter, type: value })} colorScheme='red' defaultValue={filter.type}>
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                <Radio value='공지'>공지</Radio>
                                <Radio value='이벤트'>이벤트</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Stack>
            </FilterSelect>

            <TableContainer {...BorderTable} display={{ base: 'none', md: 'flex' }}>
                <Table variant={'simple'}>
                    <Thead>
                        <Tr>
                            <Th><Checkbox /></Th>
                            <Th {...THeader}>제목</Th>
                            <Th {...THeader}>등록일</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {noticeList.map((value, index) => (
                            <Tr _hover={{ bgColor: 'gray.100' }} onClick={()=> navigate('/admin/notice/add', { state : value})}>
                                <Td><Checkbox /></Td>
                                <Td {...TBody}>{value.title}</Td>
                                <Td {...TBody}>{getDate(value.date)}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default NoticeList;