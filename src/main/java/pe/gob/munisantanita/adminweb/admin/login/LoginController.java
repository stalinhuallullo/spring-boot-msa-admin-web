package pe.gob.munisantanita.adminweb.admin.login;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import pe.gob.munisantanita.adminweb.Base.Utils.Constant;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;

@Controller
//@RequestMapping("/admin")
public class LoginController {


	@GetMapping(value={"", "/", "login"})
	public String login(HttpServletRequest request, Model model) {

		return Helper.Vista("login");
	}
	
	@GetMapping("directorio/dos")
	public String dos(HttpServletRequest request, Model model) {	
		return Helper.Vista("otros");
	}
	
	@GetMapping("directorio/tres")
	public String tres(HttpServletRequest request, Model model) {	
		
		System.out.println("codeee");
		return Helper.Vista("otros");
	}
	@GetMapping("directorio/cuatro")
	public String cuatro(HttpServletRequest request, Model model) {	
		
		System.out.println("cuatro");
		return Helper.Vista("otros");
	}
	
}