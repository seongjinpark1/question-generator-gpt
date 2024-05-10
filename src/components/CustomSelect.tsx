import { ChevronUpIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { MenuListType } from './types/types';
import { MENU_LIST } from './constants/constants';

interface CustomSelectProps {
  selectType: MenuListType;
  setSelectType: Dispatch<SetStateAction<MenuListType>>;
}
const CustomSelect = ({ selectType, setSelectType }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleType = (type: MenuListType) => {
    setSelectType(type);
  };

  const handleMenuOnOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Menu onOpen={handleMenuOnOpen} onClose={handleMenuOnOpen}>
      <MenuButton
        as={Button}
        h="32px"
        borderRadius="16px"
        rightIcon={
          <ChevronUpIcon
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0)'}
            transition="0.3s"
          />
        }
      >
        {selectType.label}
      </MenuButton>
      <MenuList>
        {MENU_LIST.map((list) => {
          return (
            <MenuItem
              key={list.id}
              bg="white"
              _hover={{
                bg: 'gray.100',
              }}
              onClick={() => handleType(list)}
            >
              {list.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default CustomSelect;
