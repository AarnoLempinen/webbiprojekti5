import { useEffect } from 'react';

function useKirjaudu() {
    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const btnPopup = document.querySelector('.btnLogin-popup');
        const iconClose = document.querySelector('.icon-close');

        const handleRegisterClick = () => {
            wrapper.classList.add('active');
        };

        const handleLoginClick = () => {
            wrapper.classList.remove('active');
        };

        const handleBtnPopupClick = () => {
            wrapper.classList.add('active-popup');
        };

        const handleIconCloseClick = () => {
            wrapper.classList.remove('active-popup');
        };

        registerLink.addEventListener('click', handleRegisterClick);

        if (loginLink) {
            loginLink.addEventListener('click', handleLoginClick);
        }

        btnPopup.addEventListener('click', handleBtnPopupClick);
        iconClose.addEventListener('click', handleIconCloseClick);

        // Cleanup function
        return () => {
            registerLink.removeEventListener('click', handleRegisterClick);

            if (loginLink) {
                loginLink.removeEventListener('click', handleLoginClick);
            }

            btnPopup.removeEventListener('click', handleBtnPopupClick);
            iconClose.removeEventListener('click', handleIconCloseClick);
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Rest of the function...
}

export { useKirjaudu };