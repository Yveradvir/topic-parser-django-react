import {
    Disclosure,
    DisclosureButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { isAuthenticated } from "@modules/utils/cookies";
import { Link, useLocation } from "react-router-dom";

const navigation = [
    { name: "Index", href: "/" },
    { name: "Home", href: "/home" },
    { name: "Scanner", href: "/scanner" },
];

const accountItems = [
    { url: "/a/signup", text: "Sign Up", auth: false },
    { url: "/a/signin", text: "Sign In", auth: false },
    { url: "/a/password", text: "Change password", auth: true },
    { url: "/a/signout", text: "Sign out", auth: true },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const location = useLocation();

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={
                                            location.pathname === item.href ? "page" : undefined
                                        }
                                        className={classNames(
                                            location.pathname === item.href
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    {isAuthenticated() ? (
                                        <img
                                            alt="profile"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-8 w-8 rounded-full"
                                        />
                                    ) : (
                                        <UserCircleIcon
                                            className="h-8 w-8 rounded-full"
                                            color="rgb(226 232 240)"
                                        />
                                    )}
                                </MenuButton>
                            </div>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {accountItems.map((item) => (
                                    (item.auth && isAuthenticated()) || (!item.auth && !isAuthenticated()) ? (
                                        <MenuItem key={item.url}>
                                            <Link
                                                to={item.url}
                                                aria-current={location.pathname === item.url ? "page" : undefined}
                                                className={classNames(
                                                    location.pathname === item.url
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                )}
                                            >
                                                {item.text}
                                            </Link>
                                        </MenuItem>
                                    ) : null
                                ))}
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}
