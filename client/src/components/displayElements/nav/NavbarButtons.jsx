import { Button, Flex, Icon, IconButton } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UilColumns, UilWindowMaximize } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

import IconList from '../../../assets/icons/iconList';

function NavbarButtons({ onUserClick, isDeveloperMode }) {
 const dispatch = useDispatch();
 /**
  * @type {WindowStatesType}
  */
 const { windows } = useSelector((state) => state.windowStates);
 const isSplitLayout = useMemo(() => windows.length > 1, [windows.length]);


 const handleSplitLayoutClick = () => {
   // add a new window to, or remove now-unneeded window from, windowState tracker
   if (isSplitLayout) {
     const inactiveWindow = windows.find(({ isActive }) => !isActive);
     dispatch(deleteWindow(inactiveWindow.id));
   } else {
     dispatch(createWindow());
   }
 };


 const handleAddWindowClick = () => {
   dispatch(createWindow());
 };


 const handleRemoveWindowClick = () => {
   if (windows.length === 1) {
     return; // refuse to delete window when there's only 1
   }
   // loop through windows and delete the largest ID, assumedly the most recently created one
   const windowIds = windows.map(({ id }) => (Number.isNaN(id) ? -1 : Number(id)));
   const targetId = Math.max(...windowIds);


   dispatch(deleteWindow(targetId.toString()));
 };


 return (
   <Flex gap="1rem" alignItems="center">
     {isDeveloperMode ? (
       <>
         <Button
           variant="outline"
           bgColor="transparent"
           border="1px solid white"
           _hover={{ bgColor: 'rgba(255, 255, 255, 0.25)' }}
           isDisabled={windows.length < 2}
           rightIcon={<Icon fontSize="xl" as={UilWindowMaximize} />}
           onClick={handleRemoveWindowClick}
         >
           Remove Window
         </Button>
         <Button
           bgColor="teal"
           _hover={{ bgColor: 'rgba(0, 255, 255, 0.25)' }}
           isDisabled={windows.length >= 5} // be reasonable, we don't need 5 or more windows
           rightIcon={<Icon fontSize="xl" as={UilColumns} />}
           onClick={handleAddWindowClick}
         >
           Add Window
         </Button>
       </>
     ) : (
       <Button
         bgColor="teal"
         _hover={{ bgColor: 'rgba(0, 255, 255, 0.25)' }}
         rightIcon={<Icon fontSize="xl" as={isSplitLayout ? UilWindowMaximize : UilColumns} />}
         onClick={handleSplitLayoutClick}
       >
         {isSplitLayout ? 'Single Layout' : 'Split Layout'}
       </Button>
     )}
     <IconButton
       aria-label="alerts"
       icon={<Icon as={IconList.Bell} />}
       variant="unstyled"
       fontSize="3xl"
     />
     <IconButton
       aria-label="user"
       icon={<Icon as={IconList.UserCircleFill} />}
       onClick={(event) => onUserClick(event)}
       variant="unstyled"
       fontSize="3xl"
     />
   </Flex>
 );
}


NavbarButtons.propTypes = {
 onUserClick: PropTypes.func.isRequired,
 isDeveloperMode: PropTypes.bool,
};


NavbarButtons.defaultProps = {
 isDeveloperMode: false,
};


export default NavbarButtons;





