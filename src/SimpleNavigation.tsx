import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition, MenuButton, MenuItems, MenuItem} from "@headlessui/react";
import SettingIcon from "./settings.svg";
import PlusIcon from "./plus.svg";
import {SingleStrArgFunction, VoidCallbackFunction} from "./userTypes.ts";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const SimpleNavigation = ({currentModel, onModelSelection, onStartNewConversation}: {currentModel: string, onModelSelection: SingleStrArgFunction, onStartNewConversation: VoidCallbackFunction}) => {
    const [allModels, setAllModels] = useState([]);
    const [runningModel, setRunningModel] = useState("");
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_OLLAMA_HOST}/api/tags`)
            .then(response => response.json())
            .then(data => data['models'].map((modelInfo: { name: string; }) => modelInfo.name))
            .then(data => setAllModels(data.sort()))
            .then(() => setRunningModel(allModels[0]))
            .catch(error => console.log(error))
    }, []);
    const handleModelUpdate = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const button = evt.currentTarget as HTMLButtonElement;
        setRunningModel(button.value);
        onModelSelection(button.value);
    }
    return (
        <nav className="bg-sky-950 text-white flex justify-between items-center py-4 px-6">
            <div className="flex items-center">
                <div className="mx-20">
                    <button className="bg-no-repeat bg-center bg-contain w-8 h-8 bg-amber-400"
                            style={{backgroundImage: `url(${PlusIcon})`}} onClick={onStartNewConversation}>
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <div
                    className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'>{runningModel !== "" ? runningModel : currentModel}</div>

                <Menu as="div" className="relative ml-3">
                    <div>
                        <MenuButton
                            className="relative flex rounded-full bg-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">Open available models</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={SettingIcon}
                                alt=""
                            />
                        </MenuButton>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {allModels.map((modelName) =>
                                <MenuItem>
                                    {({focus}) => (
                                        <button
                                            value={modelName}
                                            onClick={handleModelUpdate}
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            {modelName}
                                        </button>
                                    )}
                                </MenuItem>
                            )}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </nav>
    );
};

export default SimpleNavigation;