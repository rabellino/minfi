import { Button, Image, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';


function AppIconButton({ text, icon, onClick, isSelected, tooltipPlacement, ...props }) {
 const iconSrc = embeddedApps[icon]?.iconPath;


 return (
   <Tooltip aria-label="app name" label={text} placement={tooltipPlacement} openDelay={100}>
     <Button
       aria-label={text}
       boxSize="100%"
       variant="ghost"
       padding="4px"
       backgroundColor="white"
       border="2px solid white"
       // display bright shadow behind button if this app is currently in use
       boxShadow={isSelected ? '0 0 16px 8px rgba(255, 255, 255, 0.75)' : null}
       _hover={{ borderColor: '#abb3c5' }}
       onClick={() => onClick(icon)}
       {...props}
     >
       <Image src={iconSrc} alt={text} minWidth="100%" />
     </Button>
   </Tooltip>
 );
}


AppIconButton.propTypes = {
 text: PropTypes.string.isRequired,
 icon: PropTypes.string.isRequired,
 onClick: PropTypes.func.isRequired,
 isSelected: PropTypes.bool,
 tooltipPlacement: PropTypes.string,
};


AppIconButton.defaultProps = {
 isSelected: false,
 tooltipPlacement: 'right',
};


export default AppIconButton;