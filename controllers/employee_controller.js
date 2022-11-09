class EmployeeController {

  async administrative(req, res){
    res.render('pages/employee/administrative', {
      title: "Painel do Funcionário",
      baseUrl: req.baseUrl
    })
  }

}

module.exports = new EmployeeController