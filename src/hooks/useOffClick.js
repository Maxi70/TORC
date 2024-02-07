import { useEffect } from "react";

/**
 * @param {useRef | [useRefs]} ref - a react ref, or an array of refs, that you want to listen to for an offClick. 
   When a list of refs is giving, it will track that the click did not happen inside any of the refs content.
 * @param {function} func - the function you want to run on an off click
 * @param {boolean} [children] - optional boolean param, when true you listen to an off click for the refs children
 * */
function useOffClick(ref, func, children = false) {
  useEffect(() => {
    //checks for clicks outside of the content of the modal
    function handleClickOutside(event) {
      if (Array.isArray(ref)) {
        let shouldFire = true;
        for (let r of ref) {
          const content = children ? r.current.children[0] : r.current;
          if (r.current && content.contains(event.target)) {
            shouldFire = false;
          }
        }

        if (shouldFire) {
          func();
        }
        return;
      }

      const content = children ? ref.current.children[0] : ref.current;
      if (ref.current && !content.contains(event.target)) {
        func();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, func, children]);
}

export default useOffClick;
