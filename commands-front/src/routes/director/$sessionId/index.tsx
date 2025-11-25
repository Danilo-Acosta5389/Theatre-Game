import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/director/$sessionId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/director/$sessionId/"!</div>
}
