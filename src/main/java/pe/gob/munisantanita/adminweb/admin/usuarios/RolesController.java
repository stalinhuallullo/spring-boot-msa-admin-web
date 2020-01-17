package pe.gob.munisantanita.adminweb.admin.usuarios;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.Base.Utils.Cuenta;
import pe.gob.munisantanita.adminweb.admin.usuarios.Service.RolesService;

@Controller
@RequestMapping("/usuarios/roles")
public class RolesController {
	@Autowired
	RolesService usuarioService;
	
	@GetMapping("/")
	public String roles(HttpServletRequest request, Model model) {	
		return Helper.Vista("usuarios/roles/filtro");
	}
	
	@GetMapping("/nuevo")
	public String crearRol(HttpServletRequest request, Model model) {
		
		ArrayList<?> avatares= usuarioService.getAvatares();
		model.addAttribute("avatares", avatares);
		
		return Helper.Vista("usuarios/roles/roles_form");
	}
	
	@GetMapping("/editar/{id}")
	public String editarRol(Model model, @PathVariable long id) {
		
		ArrayList<?> avatares= usuarioService.getAvatares();
		Object rol = usuarioService.findRol(id);
		
		model.addAttribute("avatares", avatares);
		model.addAttribute("rol", rol);
		
        try {
   		 ObjectMapper objectMapper = new ObjectMapper();
   		 String mod = objectMapper.writeValueAsString(rol);
   		 model.addAttribute("modulos", mod);

 		
		} catch (ParseException | IOException e) {
			e.printStackTrace();
		}


		//System.out.println("Cuenta.Permisos: " + Cuenta.Permisos());
		
		return Helper.Vista("usuarios/roles/roles_form");
	}
}
