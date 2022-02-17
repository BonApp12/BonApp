import React, { useState, useContext } from 'react'
import {slide as Menu} from 'react-burger-menu'

// make a new context
export const SlidingContext = React.createContext();

// create the provider
const SlidingProvider = (props) => {
    const [menuOpenState, setMenuOpenState] = useState(false)

    return (
        <SlidingContext.Provider value={{
            isMenuOpen: menuOpenState,
            toggleMenu: () => setMenuOpenState(!menuOpenState),
            stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen)
        }}>
            {props.children}
        </SlidingContext.Provider>
    )
}

export default SlidingProvider;
