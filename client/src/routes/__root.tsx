import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import ErrorPageComponent from "@/pages/ErrorPageComponent";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Outlet></Outlet>
      </>
    ),
    errorComponent: ErrorPageComponent,
  }
);
