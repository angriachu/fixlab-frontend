import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import AppToaster from "@/components/AppToaster";

export default function AppProviders({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {children}
      <AppToaster />
    </QueryClientProvider>
  );
}
