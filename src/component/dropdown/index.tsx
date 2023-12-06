import React, { useEffect, useRef, useState } from 'react'
import './dropdown.scss'


// const data = [{id: 0, label: "Istanbul, TR (AHL)"}, {id: 1, label: "Paris, FR (CDG)"}];

const Dropdown = ({data,handleClick}:any) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState<any>(data);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id:any) => {
    if(selectedItem == id) {
      setSelectedItem(null) 
      handleClick(null)
    }
    else{
      setSelectedItem(id);

      handleClick(id)
    } 
    setOpen(!open)
  }
  

	const ref = useRef<any>();

	useEffect(() => {
		const checkIfClickedOutside = (e: any) => {
			if (isOpen && ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutside);
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [isOpen]);

  return (
    <div className='dropdown' ref={ref}>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {selectedItem ? items.find((item:any )=> item == selectedItem) : "Select your destination"}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map((item:any) => (
          <div className="dropdown-item" onClick={(e:any) => handleItemClick(e?.target?.id)} id={item}>
            <span className={`dropdown-item-dot ${item == selectedItem && 'selected'}`}>• </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Dropdown