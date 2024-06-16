package pe.gob.munisantanita.adminweb.admin.Resoluciones;


import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Area;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Resoluciones;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Tipo;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Service.ResolucionesService;

@Controller
@RequestMapping("/resoluciones")
public class ResolucionesController {
	
	@Autowired
	ResolucionesService resoluciones;
	
	@GetMapping
	public String resoluciones(HttpServletRequest request, Model model) {	
	
		return Helper.Vista("resoluciones/index");
	}
	
	@GetMapping("/nuevo")
	public String nuevo(HttpServletRequest request, Model model) {	
		ArrayList<?> jArrayTipo = resoluciones.tipo();
		ArrayList<?> jArrayArea = resoluciones.area();
		
		
		model.addAttribute("tipo", jArrayTipo);
		model.addAttribute("area", jArrayArea);

		return Helper.Vista("resoluciones/nuevo");
	}
	
	@GetMapping("editar/{id}")
	public String editar(@PathVariable(name = "id") long id, Model model) {
		ArrayList<?> jArrayTipo = resoluciones.tipo();
		ArrayList<?> jArrayArea = resoluciones.area();
		Object obj = resoluciones.buscarResolucion(id);
		
		model.addAttribute("tipo", jArrayTipo);
		model.addAttribute("area", jArrayArea);
		model.addAttribute("resolucion", obj);
	
		return Helper.Vista("resoluciones/nuevo");
	}
	
}
