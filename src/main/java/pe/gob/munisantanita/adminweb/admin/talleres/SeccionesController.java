package pe.gob.munisantanita.adminweb.admin.talleres;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.gob.munisantanita.adminweb.Base.Utils.Helper;

@Controller
@RequestMapping("/talleres/secciones")
public class SeccionesController {
	
	@GetMapping("/nuevo")
	public String roles(HttpServletRequest request, Model model) {	
		return Helper.Vista("talleres/secciones/form");
	}
	
}
