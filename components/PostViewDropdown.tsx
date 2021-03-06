import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { Post } from "@/lib/database/data/post";

export default function PostViewDropdown(props: { post: Post }) {
  let router = useRouter();
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 text-gray-900 dark:text-gray-200 opacity-50"
            aria-hidden="true"
          />
        </Menu.Button>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-200 dark:bg-gray-900 ring-1 ring-gray-900 dark:ring-gray-200 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={async () => {
                    await backendService.deletePost(
                      props.post.id,
                      cookie.bearerToken
                    );
                    router.reload();
                  }}
                  className={"block px-4 py-2 text-sm cursor-pointer umami--click--delete-post-button ".concat(
                    active ? "bg-gray-200 text-gray-900" : "dark:text-gray-200"
                  )}
                >
                  Delete
                </span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
