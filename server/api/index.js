import { Router } from 'express'

import announcements from './announcements'
import chats from './chats'
import games from './games'
import inbox from './inbox'
import schedules from './schedules'
import search from './search'
import teams from './teams'
import tournaments from './tournaments'
import users from './users'

const router = Router()

// Add USERS Routes
router.use(announcements)
router.use(chats)
router.use(games)
router.use(inbox)
router.use(schedules)
router.use(search)
router.use(teams)
router.use(tournaments)
router.use(users)

export default router
