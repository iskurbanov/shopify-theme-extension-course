import { Router } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const proxyRouter = Router()

proxyRouter.get('/test', async (req, res) => {
  return res.status(200).send({ content: "App Proxy is Working" })
})

proxyRouter.post('/contact-form', async (req, res) => {
  console.log(req.body)
  const { name, email, description } = req.body
  const { shop } = req.query

  try {
    const contact = await prisma.contact.create({
      data: {
        shop: shop,
        name: name,
        email: email,
        description: description
      }
    })
    return res.status(200).send({ success: true, data: contact })

  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false })
  }
})


export default proxyRouter