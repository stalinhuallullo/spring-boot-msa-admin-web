package pe.gob.munisantanita.adminweb.admin.noticias;


import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import pe.gob.munisantanita.adminweb.admin.noticias.Repository.NoticiaRepository;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.admin.noticias.Repository.CategoriaRepository;
import pe.gob.munisantanita.adminweb.admin.noticias.model.Imagen;

@Controller
@RequestMapping("/noticias")
public class NoticiasController {
	
	//@Autowired
	//private PasswordEncoder passwordEncoder;
	
	
	@Autowired
	NoticiaRepository noticiaRepository;
	
	@Autowired
	CategoriaRepository categoriaRepository;
	
	@GetMapping
	public String noticias(HttpServletRequest request, Model model) {	
		
		//ArrayList<?> jArray= categoriaRepository.all();
		
		//model.addAttribute("categorias", jArray);

		//System.out.println("password admin--->:" + passwordEncoder.encode("admin"));
		
		return Helper.Vista("noticias/noticias");
	}
	
	@GetMapping("/categorias")
	public String categoria(HttpServletRequest request, Model model) {	
		
		ArrayList<?> jArray= categoriaRepository.all();
		model.addAttribute("categorias", jArray);

		return Helper.Vista("noticias/categorias");
		
	}
	
	
	@GetMapping("/nuevo")
	public String nuevo(HttpServletRequest request, Model model) {	
		ArrayList<?> jArray= categoriaRepository.all();
		System.out.println("jArray"+jArray);
		model.addAttribute("categorias", jArray);

		return Helper.Vista("noticias/articulo");
	}
	
	@GetMapping("editar/{id}")
	public String editar(@PathVariable(name = "id") long id, Model model) {	
		Object noticia = noticiaRepository.findbyId(id);
		ArrayList<?> jArray= categoriaRepository.all();
		System.out.println("noticia"+noticia);
		model.addAttribute("categorias", jArray);
		model.addAttribute("noticia", noticia);
		return Helper.Vista("noticias/articulo");
	}
	
	
	
	@Bean
	PasswordEncoder getEncoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@PostMapping(value="subir_imagen")
	@ResponseBody
	public Imagen subirImagen(HttpServletRequest request, Model model, @RequestParam("file") ArrayList<MultipartFile> files, @RequestParam("noticia_id") long noticia_id)  {		
		return noticiaRepository.enviarImagen(files, noticia_id);

	}
	
	
	
	
}
