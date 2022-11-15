class EmployeeController {

  async administrative(req, res){
    res.render('pages/employee/administrative', {
      title: "Painel do Funcionário",
      baseUrl: req.baseUrl
    })
  }

  async reservations(req, res){
    res.render('pages/employee/reservation/index', {
      title: "Painel do Funcionário",
      baseUrl: req.baseUrl
    })
  }

  async reservartionNew(req, res){
    res.render('pages/employee/reservation/new', {
      title: "Painel do Funcionário",
      baseUrl: req.baseUrl
    })
  }

  async reservationCreate(req, res){
    res.render('pages/employee/administrative', {
      title: "Painel do Funcionário",
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new EmployeeController