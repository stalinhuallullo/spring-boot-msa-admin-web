package pe.gob.munisantanita.adminweb.admin.eventos;

import java.io.File;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import pe.gob.munisantanita.adminweb.Base.Utils.Constant;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.admin.eventos.Model.Imagen;
import pe.gob.munisantanita.adminweb.admin.eventos.Model.Mensaje;
import pe.gob.munisantanita.adminweb.admin.eventos.Repository.CategoriasRepository;
import pe.gob.munisantanita.adminweb.admin.eventos.Repository.EventosRepository;



@Controller
@RequestMapping("/eventos")
public class EventosController {

	@Autowired
	CategoriasRepository categoriaRepository;
	
	@Autowired
	EventosRepository eventosRepository;
	
	@GetMapping
	public String index(Model model) {	
		return Helper.Vista("eventos/eventos");
	}

	
	@GetMapping("/nuevo")
	public String noticias(Model model) {
		ArrayList<?> jArray= categoriaRepository.all();
		model.addAttribute("categorias", jArray);
		model.addAttribute("evento", null);
		return Helper.Vista("eventos/articulo");
	}
	
	@GetMapping("/editar/{id}")
	public String noticias(Model model, @PathVariable long id) {
		ArrayList<?> jArray= categoriaRepository.all();
		Object obj= eventosRepository.findEvento(id);

		model.addAttribute("categorias", jArray);
		model.addAttribute("evento", obj);
		
		return Helper.Vista("eventos/articulo");
	}
	
	@GetMapping("/categorias")
	public String categorias(Model model) {	
		return Helper.Vista("eventos/categorias");
	}
	
	@PostMapping(value="subir_imagen")
	@ResponseBody
	public Imagen subirImagen(@RequestParam("file") ArrayList<MultipartFile> files)  {		
		return eventosRepository.enviarImagen(files);

	}
	
	@DeleteMapping(value="eliminar_imagen")
	@ResponseBody
	public Mensaje eliminarImagen(@RequestParam("archivo") String archivo)  {		
		Mensaje msj = new Mensaje();
        msj.setEstado("ERR");
        msj.setMensaje("No se ha podido eliminar el archivo.");
	    try { 
            File file = new File(Constant.DIR_UPLOAD_DATA_EVENTOS_GALERIA + archivo);
            if(file.delete()) { 
               msj.setEstado("OK");
               msj.setMensaje("El archivo fue eliminado satisfactoriamente.");
            } 
         }
         catch(Exception e){
               msj.setMensaje(e.getMessage());
         }
		
		return msj;
	}
	
	
	
	
	@PostMapping(value="duplicar_imagen")
	@ResponseBody
	public Imagen duplicarImagen(@RequestParam("archivo") String archivo)  {		
		return eventosRepository.duplicarImagen(archivo);

	}
	
}
