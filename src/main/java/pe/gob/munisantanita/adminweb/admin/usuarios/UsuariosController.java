package pe.gob.munisantanita.adminweb.admin.usuarios;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.gob.munisantanita.adminweb.Base.Utils.Helper;

@Controller
@RequestMapping("/usuarios")
public class UsuariosController {
	@GetMapping
	public String filtro(HttpServletRequest request, Model model) {	
		return Helper.Vista("usuarios/usuarios/filtro");
	}
}
