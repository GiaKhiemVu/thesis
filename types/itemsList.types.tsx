import { MouseEventHandler } from "react";

export type DashboardHeaderNavItemChild = {
    title: string;
    actionOnClick: () => void | MouseEventHandler<HTMLElement> |undefined; 
};

export type DashboardHeaderNavItems = {
    title: string;
    icon: any;
    child: DashboardHeaderNavItemChild[] | null;
};
