import { createFileRoute } from '@tanstack/react-router'
import DirectorPage from '../../../pages/director/DirectorPage'

export const Route = createFileRoute('/director/$sessionId/')({
  component: DirectorPage,
})
