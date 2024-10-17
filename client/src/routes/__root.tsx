import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import ErrorRootPageComponent from "@/pages/ErrorRootPageComponent";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Outlet></Outlet>
      </>
    ),
    errorComponent: ErrorRootPageComponent,
  }
);
