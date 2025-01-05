"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import {
  AlertCircleIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  BarChartBigIcon,
  BookIcon,
  CogIcon,
  CrownIcon,
  FileIcon,
  InboxIcon,
  ListCheckIcon,
  type LucideIcon,
  MailsIcon,
  MessagesSquareIcon,
  PenIcon,
  PersonStandingIcon,
  RatioIcon,
  SendIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TagIcon,
  Users2Icon,
  XIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useComposeModal } from "@/providers/ComposeModalProvider";
import { env } from "@/env";
import { useSmartCategoriesEnabled } from "@/hooks/useFeatureFlags";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon | ((props: any) => React.ReactNode);
  target?: "_blank";
  count?: number;
  hideInMail?: boolean;
};

const NEXT_PUBLIC_DISABLE_TINYBIRD = env.NEXT_PUBLIC_DISABLE_TINYBIRD;

const navigationItems: NavItem[] = [
  {
    name: "AI Personal Assistant",
    href: "/automation",
    icon: SparklesIcon,
  },
  {
    name: "Smart Categories",
    href: "/smart-categories",
    icon: TagIcon,
  },
  ...(NEXT_PUBLIC_DISABLE_TINYBIRD
    ? []
    : [
        {
          name: "Bulk Unsubscribe",
          href: "/bulk-unsubscribe",
          icon: MailsIcon,
        },
      ]),
  {
    name: "Cold Email Blocker",
    href: "/cold-email-blocker",
    icon: ShieldCheckIcon,
  },
  ...(NEXT_PUBLIC_DISABLE_TINYBIRD
    ? []
    : [
        {
          name: "Analytics",
          href: "/stats",
          icon: BarChartBigIcon,
        },
      ]),
];

export const useNavigation = () => {
  const showSmartCategories = useSmartCategoriesEnabled();

  return navigationItems.filter((item) =>
    item.href === "/smart-categories" ? showSmartCategories : true,
  );
};

const bottomLinks: NavItem[] = [
  {
    name: "Onboarding",
    href: "/onboarding",
    icon: ListCheckIcon,
    hideInMail: true,
  },
  {
    name: "User Guide",
    href: "https://docs.mailto.live",
    target: "_blank",
    icon: BookIcon,
  },
  { name: "Premium", href: "/premium", icon: CrownIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

const topMailLinks: NavItem[] = [
  {
    name: "Inbox",
    icon: InboxIcon,
    href: "?type=inbox",
  },
  {
    name: "Drafts",
    icon: FileIcon,
    href: "?type=draft",
  },
  {
    name: "Sent",
    icon: SendIcon,
    href: "?type=sent",
  },
  {
    name: "Archived",
    icon: ArchiveIcon,
    href: "?type=archive",
  },
];

const bottomMailLinks: NavItem[] = [
  {
    name: "Personal",
    icon: PersonStandingIcon,
    href: "?type=CATEGORY_PERSONAL",
  },
  {
    name: "Social",
    icon: Users2Icon,
    href: "?type=CATEGORY_SOCIAL",
  },
  {
    name: "Updates",
    icon: AlertCircleIcon,
    href: "?type=CATEGORY_UPDATES",
  },
  {
    name: "Forums",
    icon: MessagesSquareIcon,
    href: "?type=CATEGORY_FORUMS",
  },
  {
    name: "Promotions",
    icon: RatioIcon,
    href: "?type=CATEGORY_PROMOTIONS",
  },
];

export function SideNav(props: {
  children: React.ReactNode;
  topBar?: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <div className="h-full">
      <Transition show={props.sidebarOpen} as="div">
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={props.setSidebarOpen}
        >
          <TransitionChild
            as="div"
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as="div"
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex h-full w-full max-w-64 flex-1">
                <TransitionChild
                  as="div"
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => props.setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>

                <Sidebar isMobile />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col 2xl:w-64">
        <Sidebar isMobile={false} />
      </div>

      <main className="flex h-full flex-col lg:pl-60 2xl:pl-64">
        {props.topBar}

        {props.children}
      </main>
    </div>
  );
}

function Sidebar(props: { isMobile: boolean }) {
  const path = usePathname();
  const showMailNav = path === "/mail" || path === "/compose";
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  if (showMailNav) {
    // Checking whether we are on the "Mail" tab or not
    params.set("type", params.get("type") || "inbox"); // Default to 'inbox' if 'type' is not already set
  }

  const activePath = `?${params.toString()}`;

  const { onOpen } = useComposeModal();

  const navigation = useNavigation();

  return (
    <div
      className={clsx(
        "flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4",
        {
          "ring-1 ring-white/10": props.isMobile,
        },
      )}
    >
      <Link href="/bulk-unsubscribe">
        <div className="flex h-16 shrink-0 items-center text-white">
          <Logo className="h-4" />
        </div>
      </Link>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col">
          <Transition
            as="div"
            show={showMailNav}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            // leave="transition-opacity duration-300"
            // leaveFrom="opacity-100"
            // leaveTo="opacity-0"
          >
            <Button className="w-full" variant="outline" onClick={onOpen}>
              <PenIcon className="mr-2 h-4 w-4" /> Compose
            </Button>

            <div className="mt-2">
              <Links path={activePath} links={topMailLinks} />
            </div>
            <div className="mt-7">
              <NavSectionHeader title="Labels" />
              <div className="mt-2">
                <Links path={activePath} links={bottomMailLinks} />
              </div>
            </div>
          </Transition>

          <Transition
            as="div"
            show={!showMailNav}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            // leave="transition-opacity duration-300"
            // leaveFrom="opacity-100"
            // leaveTo="opacity-0"
          >
            <Links path={path} links={navigation} />
          </Transition>

          <div className="mt-auto pt-7">
            <Links
              path={path}
              links={
                showMailNav
                  ? [
                      {
                        name: "Back",
                        href: "/automation",
                        icon: ArrowLeftIcon,
                      },
                      ...bottomLinks.filter((l) => !l.hideInMail),
                    ]
                  : bottomLinks
              }
            />
          </div>
        </ul>
      </nav>
    </div>
  );
}

function Links(props: { path: string; links: NavItem[] }) {
  return (
    <li>
      <ul className="-mx-2 space-y-1">
        {props.links.map((item) => (
          <NavLink key={item.name} path={props.path} link={item} />
        ))}
      </ul>
    </li>
  );
}

function NavLink(props: { path: string; link: NavItem }) {
  const { link } = props;

  return (
    <li key={link.name}>
      <Link
        href={link.href}
        className={clsx(
          "group flex h-9 items-center gap-x-3 rounded-md px-3 text-sm font-semibold leading-5 text-white",
          link.href === props.path ? "bg-gray-800" : "hover:bg-gray-800",
        )}
        target={link.target}
        prefetch={link.target !== "_blank"}
      >
        <link.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        {link.name}
        {link.count ? (
          <span
            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
            aria-hidden="true"
          >
            {link.count}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

function NavSectionHeader(props: { title: string }) {
  return (
    <div className="text-xs font-semibold leading-6 text-gray-400">
      {props.title}
    </div>
  );
}
