package pe.gob.munisantanita.adminweb.admin.dashboard;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import pe.gob.munisantanita.adminweb.Base.Utils.Constant;
import pe.gob.munisantanita.adminweb.Base.Utils.Cuenta;



@Controller
//@RequestMapping("/admin")
public class DashboardController {

	@GetMapping(value="dashboard")
	public String login(Model model) {	
		

		return "admin/pages/dashboard"; //Helper.Vista("dashboard");
	}
	
	
	
}