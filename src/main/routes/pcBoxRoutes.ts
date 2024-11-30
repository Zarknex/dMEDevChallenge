import { Router } from 'express'

const router = Router()
const pcBox: any[] = [] // Cambia esto por conexión real a DB.

router.get('/pc-box', (req, res) => {
  res.json(pcBox)
})

router.post('/pc-box', (req, res) => {
  pcBox.push(req.body)
  res.status(201).send('Pokemon added to PC Box.')
})

export default router
