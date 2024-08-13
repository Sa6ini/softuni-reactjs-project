import { useEffect } from "react";

export const useNavbarHover = () => {
  useEffect(() => {
    const toggleNavbarMethod = () => {
      if (window.innerWidth > 992) {
        document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
          dropdown.addEventListener('mouseover', () => {
            dropdown.querySelector('.dropdown-toggle').click();
          });
          dropdown.addEventListener('mouseout', () => {
            dropdown.querySelector('.dropdown-toggle').click();
            dropdown.querySelector('.dropdown-toggle').blur();
          });
        });
      } else {
        document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
          dropdown.removeEventListener('mouseover', () => {});
          dropdown.removeEventListener('mouseout', () => {});
        });
      }
    };
    toggleNavbarMethod();
    window.addEventListener('resize', toggleNavbarMethod);
    return () => {
      window.removeEventListener('resize', toggleNavbarMethod);
    };
  }, []);
};
