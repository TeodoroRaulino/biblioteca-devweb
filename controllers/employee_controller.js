class EmployeeController {

  async administrative(req, res){
    res.render('pages/employee/administrative', {title: "Painel do Funcionário"})
  }

}

module.exports = new EmployeeController