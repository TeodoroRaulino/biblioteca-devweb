const ApplicationController = require('./application_controller')
const axios = require('axios').default
const urlApi = 'http://localhost:5000/'

class UserController extends ApplicationController{
  async index(req, res){
    const error = req.query.error
    const current_user = super.define_user(res)
    const session_token = res.locals.session_token

    
    try {
      const response = await axios.get(urlApi+ 'administrative/users',
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })

      const data = response.data

      
      res.render('pages/user/index', {
        title: "Usuário",
        users: data.users,
        current_user: current_user,
        error: error
      })
    } catch(error){
      console.log(error.message)
      res.status(401)
      return super.return_error(res)
    }
  }

  async show(req, res){
    const error = req.query.error
    const session_token = res.locals.session_token
    const id = req.params.id
    const current_user = super.define_user(res)
    
    try {
      const response = await axios.get(urlApi+ 'administrative/user/'+id,
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })

      const data = response.data

      res.render('pages/user/show', {
        title: "Usuário",
        user: data.user,
        current_user: current_user,
        error: error
      })
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }
  }

  async new(req, res) {
    const error = req.query.error
    const session_token = res.locals.session_token
    const current_user = super.define_user(res)

    try {
      const response = await axios.get(urlApi + 'administrative/user/new',
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })

      if(response.status === 200){
        res.render('pages/user/form', {
          title: "User formulário",
  
          user: null,
          current_user: current_user,
          error: error
        })
      }
    }catch(error){
      console.log(error.message)
      res.status(401)
      return super.return_error(res)
    }
  }

  async create(req, res){
    const error = req.query.error
    const session_token = res.locals.session_token
    const current_user = super.define_user(res)

    let params = req.body


    const response = await axios.post(
      urlApi + 'administrative/user',
      {
        params
      },
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      }).catch((error) => {
      console.log(error.message)
    })


    res.render('pages/user/show', {
      title: "Novo usuário",
      user: response.data.user,
      current_user: current_user,
      error: error
    });
  }

  async edit(req, res) {
    const error = req.query.error
    const id = req.params.id
    const session_token = res.locals.session_token
    const current_user = super.define_user(res)

    try {
      const response = await axios.get(urlApi + 'administrative/user/edit/'+id,
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      })

      const data = response.data

      if(response.status === 200){
        res.render('pages/user/form', {
          title: "Edit",
          user: data.user,
          current_user: current_user,
          error: error
        })
      }
    } catch (error) {
      res.status(401)
      return super.return_error(res)
    }
  }

  async update(req, res) {
    const error = req.query.error
    const session_token = res.locals.session_token
    const current_user = super.define_user(res)

    let params = req.body
    
    const response = await axios.post(
      urlApi+ 'administrative/user/edit',
      {
        params
      },
      {
        headers:{
          'Cookie': `session_token=${session_token}`
        }
      }).catch((error) => {
      console.log(error.message)
    })

    const data = response.data

    res.render('pages/user/show',{
      title: "Usuário",
      user: data.user,
      current_user: current_user,
      error: error
    })
  }
}

module.exports = new UserController