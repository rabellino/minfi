/* eslint-disable no-console */
import {
    Flex,
    Icon,
    IconButton,
    Image,
    Menu,
    MenuItem,
    Text,
   } from '@chakra-ui/react';
   import { useEffect, useRef, useState } from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { UilEllipsisV as UilContextMenu, UilTimesCircle } from '@iconscout/react-unicons';
   import PropTypes from 'prop-types';
   
   
   import PlaceholderApp from './appComponents/PlaceholderApp';
   import AppIconButton from './nav/AppIconButton';
   
   function AppWindow({ windowId, appComponents }) {
    const dispatch = useDispatch();
    // console.debug('[AppWindow] re-rendering with appComponents:', appComponents);
    // const internalRef = useRef();
   
   
    // redux states
    /**
     * @type {WindowStatesType}
     */
    const { windows } = useSelector((state) => state.windowStates);
    const windowState = windows?.find((it) => it.id === windowId);
    const isActive = windowState?.isActive || false;
    const isSplitLayout = windows.length > 1;
   
   
    // TODO: useMemo, once we're sure we're using it right
    const [appsInWindow, setAppsInWindow] = useState([]);
    const [appIcons, setAppIcons] = useState([]);
   
   
    const handleAppIconClick = (appName) => {
      dispatch(changeAppWindow({ ...windowState, isActive: true, app: appName }));
    };
   
   
    const handleWindowClick = () => {
      dispatch(changeActiveWindow(windowId));
    };
   
   
    const onCloseWindow = () => {
      dispatch(deleteWindow(windowId));
    };
   
   
    useEffect(() => {
      console.debug('[AppWindow] window', windowId, 'saw change in appsInWindow', appsInWindow);
    }, [appsInWindow, windowId]);
   
   
    useEffect(() => {
      // identify what apps are showing on other window, and filter them out of this window
      const appsInOtherWindows = windows.filter(({ id }) => id !== windowId).map(({ app }) => app);
      console.debug('[AppWindow] window', windowId, ': apps in other windows', appsInOtherWindows);
   
   
      // Primary window keeps all the apps rendered except what is shown in other windows. Any other windows: only show the app you need to
      const filteredApps = Object.entries(appComponents).filter(([appName]) =>
        windowState.isPrimary ? !appsInOtherWindows.includes(appName) : appName === windowState.app,
      );
      setAppsInWindow(filteredApps);
   
   
      // hide icons of currently visible apps
      const appIconsInWindow = Object.entries(embeddedApps)
        .map(([key, element]) => ({ id: key, ...element }))
        .filter((app) => !(app.id === 'loading' || appComponents[app.id].props.isVisible || false));
      setAppIcons(appIconsInWindow);
    }, [windows, windowState, windowId, appComponents]);
   
   
    // // when this app becomes active, ensure we have the window focus
    // useEffect(() => {
    //   if (isActive && internalRef?.current && document.activeElement !== internalRef) {
    //     internalRef.current?.focus(); // TODO: delete? this might already be handled in EmbeddedApp
    //   }
    // }, [isActive]);
   
   
    const contextMenuItems = [
      <MenuItem key="close" onClick={onCloseWindow} icon={<Icon boxSize={6} as={UilTimesCircle} />}>
        Close View
      </MenuItem>,
      ...appIcons.map((app) => (
        <MenuItem
          key={app.id}
          onClick={() => handleAppIconClick(app.id)}
          icon={
            <Image
              backgroundColor="white"
              boxSize={12}
              padding="4px"
              borderRadius="8px"
              src={embeddedApps[app.id]?.iconPath}
              alt={app.displayName}
            />
          }
        >
          Open {app.displayName}
        </MenuItem>
      )),
    ];
   
   
    return (
      <Flex
        flexGrow="1"
        flexDirection="column"
        position="relative"
        padding={isSplitLayout ? '6px' : '0'}
        boxSize="100%"
        borderRadius="8px"
        gap="8px"
        backgroundColor="rgba(0,0,0, 0.25)"
        boxShadow={isSplitLayout && isActive ? '0 0 6px 8px #63B3ED' : null} // show an "underglow"
        onClick={handleWindowClick}
      >
        {isSplitLayout && (
          // <Flex w="100%" justifyContent="end" position="relative" bgColor="rgba(0, 200, 100, .75)">
          <Menu isLazy>
            <MenuButton
              variant="ghost"
              position="absolute"
              right="8px"
              top="8px"
              zIndex="10"
              as={IconButton}
              icon={<Icon as={UilContextMenu} boxSize={6} />}
            />
            <MenuList>{contextMenuItems}</MenuList>
          </Menu>
        )}
        {
          // eslint-disable-next-line react/prop-types
          !windows || appsInWindow.length < 1 || !windowState?.app ? (
            <PlaceholderApp name="app-picker" isVisible>
              <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                boxSize="100%"
                padding="1rem"
                gap="1rem"
              >
                <Text fontSize="24px" fontWeight="bold">
                  Select an application to open in this window
                </Text>
                <Flex gap="1.5rem">
                  {appIcons.map((app) => (
                    <AppIconButton
                      key={app.id}
                      icon={app.id}
                      text={app.displayName}
                      boxSize="3.5rem"
                      tooltipPlacement="bottom"
                      onClick={handleAppIconClick}
                    />
                  ))}
                </Flex>
              </Flex>
            </PlaceholderApp>
          ) : (
            appsInWindow.map(([, appComponent]) => appComponent)
          )
        }
      </Flex>
    );
   }
   
   
   AppWindow.propTypes = {
    windowId: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    appComponents: PropTypes.object.isRequired,
   };
   
   
   export default AppWindow;