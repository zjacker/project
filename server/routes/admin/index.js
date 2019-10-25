module.exports = app => {
  const express = require('express')
  const router = express.Router()

  const inflection = require('inflection')


  router.post('/', async (req,res)=>{
    const model = await req.model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req,res)=>{
    const options = {}
    if(req.model.modelName === 'Category'){
      options.populate =  'parent'
    }
    console.dir(req.model.modelName)
    const items = await req.model.find().setOptions(options)
    res.send(items)
  })

  router.get('/:id', async (req,res)=>{
    const model = await req.model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req,res)=>{
    const model = await req.model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  router.delete('/:id', async (req,res)=>{
    await req.model.findOneAndRemove(req.params.id)
    res.send({
      success: true
    })
  })



  app.use('/admin/api/rest/:resource',async (req,res,next)=>{
    req.model = require(`../../models/${inflection.classify(req.params.resource)}`)
    next()
  }, router)
}