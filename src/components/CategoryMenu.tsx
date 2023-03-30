import React, { useState } from 'react';
import Button from './Button';
import { Category } from './RecipeForm';

const categories: Category[] = [
    'alkupalat',
    'pääruoat',
    'keitot',
    'juomat',
    'pizzat',
    'leivonnaiset',
    'lisukkeet',
    'leivät',
    'salaatit',
    'välipalat',
    'kastikkeet',
    'jälkiruoat'
];

const CategoryMenu: React.FC<{ setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>, selectedCategories: Category[] }> = ({ setSelectedCategories, selectedCategories }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCategoryClick = (category: Category) => {
        const index = selectedCategories.indexOf(category);
        if (index !== -1) {
            setSelectedCategories([
                ...selectedCategories.slice(0, index),
                ...selectedCategories.slice(index + 1)
            ]);
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="dropdown-menu">
            <Button text={"Kategoria"} onClick={toggleDropdown} />
            {isOpen && (
                <ul className="bg-slate-200 p-1.5 absolute rounded-md z-10">
                    {categories.map((category) => (
                        <li key={category}>
                            <label className="flex space-x-1 items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryClick(category)}
                                    className="cursor-pointer"
                                />
                                <p>{category}</p>
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryMenu;